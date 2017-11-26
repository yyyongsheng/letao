//获得slider插件对象



mui.init({
  pullRefresh : {
    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      height:50,//可选,默认50.触发下拉刷新拖动距离,
      auto: true,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
      callback :function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
       setTimeout(function() {

        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        // 先刷新
        // 加载数据
        queryProductDetail(function () {
          // 开启轮播
          mui('.mui-slider').slider({
            interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
          });
          // 因为数字输入框是动态生成的需要激活
          mui(".mui-numbox").numbox();
        })
       
       }, 1000);
      } 
    }
  }
});


function queryProductDetail(callback) {
  // 获取url上的ID
  var id=$.getURLParams("productId");
  // console.log(id);
  $.ajax({
    url:"/product/queryProductDetail?id=" + id,
    success:function (result) {
      // 先将返回数据中的尺寸数据拆分为最小和最大 再遍历 存到 数组中 方便模板的使用
      var start=result.size.split('-')[0];
      var end=result.size.split('-')[1];
      var arr=[];
      for(var i=start;i<end;i++){
        arr.push(i);
      }
      result.sizeArr=arr;

      var html=template("mainTpl",result);

      $('.lt_view ul').html(html);

      callback&&callback(result);
    }
  })
}

$('.lt_view ul').on('tap',".pro_size span",function () {
  $(this).addClass("active").siblings().removeClass('active');
})


// 添加购物车

// console.log($('.add_cart'))

 $('.add_cart').on('tap',function () {
   
  var size=$(".pro_size>span.active").html();

  var num=$('.mui-numbox-input').val();

  // console.log(size+num)

  // 判断是否选择了尺寸是数量
  if(!size){
    mui.toast('亲，请选择尺码哦')
    return false;
  }

if(num<1){
  mui.toast('亲，还没选择数量哦')
  return false;
}

var option={
  url:"/cart/addCart",
  type:"post",
  data:{
    productId:$.getURLParams("productId"),
    num:num,
    size:size
  },
  success:function (result) {
    alert(123)
    mui.confirm("是否要跳转到购物车页面","成功添加",['跳转',"不跳"],function (e) {
      if(e.index==0){
        location.href="购物车页面";
      }else if(e.index==1){

      }

   

    })
  }
}

$.LtAjax(option);



 })



 