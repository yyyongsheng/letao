$(function () {
  // 获取url参数
function getURLParams(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}


//全局参数查询对象


  var queryObj = {
    proName:"",
    brandId:"",
    price:"",
    num:"",
    page:1,
    pageSize:6
  };

queryObj.proName=getURLParams('key');

var Count=1;





mui.init({
  pullRefresh : {
    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      height:50,//可选,默认50.触发下拉刷新拖动距离,
      auto: true,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
      callback :function(){
        setTimeout(function () {
          queryObj.page=1;
          queryProduct(function (result) {
            Count=result.count;
            var html=template("prolistTpl",result);
            $('.lt_concent').html(html);
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh(false);

            mui('#refreshContainer').pullRefresh().refresh(true);
          })
         
        },1000);
      } 
    },
    up : {
      height:50,//可选.默认50.触发上拉加载拖动距离
      auto:true,//可选,默认false.自动上拉加载一次
      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      callback :function(){
       
        var totalPage=Math.ceil(Count/queryObj.pageSize);

        setTimeout(function() {
          if(queryObj.page<totalPage){
            queryObj.page++;
            queryProduct(function (result) {
              var html=template("prolistTpl",result);
              $('.lt_concent').append(html);

              mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);


            })



          }else{
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
          }

        }, 1000);




      } 
    }
  }
});


//发送请求
function queryProduct(callback) {
  $.ajax({
    url:"/product/queryProduct",
    data:queryObj,
    success:function (result) {
      callback &&callback(result);
    }
  })
}

// 搜索
$(".lt_searchBtn").on('tap',function () {
  var val=$('.lt_search_inp').val();
 
   if(!$.trim(val)){
    mui.toast("亲，请输入关键字哦！")
   }else{
     queryObj.proName=val;
     mui("#refreshContainer").pullRefresh().pulldownLoading();
   }

})



// 排序


$('.lt_item li a').on("tap",function () {
 
  $(this).css({color:'blue'}).parent().siblings().children('a').css({color:'#555'})
  
  $(this).find(".mui-icon").toggleClass('mui-icon-arrowdown mui-icon-arrowup')

  var sort=-1;

  // 判断 如果 span 上 up 升序    down 降序
  if($(this).find(".mui-icon").hasClass('mui-icon-arrowup')){
    sort=1;

  }else{
    sort=2;
  }
// 获取要排序的关键字
if($(this).data('sortname')=="price"){
  queryObj.price=sort;
  queryObj.num="";
}
if($(this).data("sortname")=="num"){
  queryObj.num=sort;
  queryObj.price="";
}
 // 手动触发下拉 
 mui("#refreshContainer").pullRefresh().pulldownLoading();


})












})