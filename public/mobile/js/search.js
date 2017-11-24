$(function () {
  
  loadHistory();



  function loadHistory() {
    var ls=localStorage;
 // 有数据就获取数据 无 就获取空数组 !! 
    var arr=(ls.getItem("LT_his")&& JSON.parse(ls.getItem('LT_his')))|| [];
     // 判断 有没有数据 
    if(arr.length<1){
      $('.lt_list').html('');
      return;
    }

    var strArr=[];
    for(var i=0;i<arr.length;i++){
      strArr.push(' <div class="lt_his_list"><div class="mui-claerfix hl_item"> <span class="mui-pull-left item_font">'+arr[i]+'</span><span class="mui-pull-right item_close mui-icon mui-icon-closeempty"></span></div>  </div>')
    }
// 渲染列表数据 
    $('.lt_list').html(strArr.join(''))

  }

  $('.lt_searchBtn').on('tap',function () {
    var val=$('.lt_search_inp').val();
 // 去掉空格
    if(!$.trim(val)){
      mui.toast("亲，请输入关键字哦！")
      return false;
    }

    var ls=localStorage;
    var arr=(ls.getItem('LT_his') && JSON.parse(ls.getItem('LT_his')))||[];
 // 要做去重的处理
    for(var j=0;j<arr.length;j++){
      if(arr[j]==val){
        // 删除旧的 添加新的到最开头
        // (要删除的值的索引,要删除几个)
        arr.splice(j,1);
      }
    }
    arr.unshift(val);
    ls.setItem('LT_his',JSON.stringify(arr))

    location.href="searchList.html?key="+val;


  })

  $('.clear_hs').on('tap',function () {
    localStorage.setItem('LT_his',JSON.stringify([]));
    loadHistory();

  })

  $('body').on("tap",'.item_close',function () {
    
    
    var index=$(this).parent().index()

    var ls=localStorage;
    var arr=(ls.getItem('LT_his') && JSON.parse(ls.getItem('LT_his')))||[];
    arr.splice(index,1);

    ls.setItem('LT_his',JSON.stringify(arr));

    loadHistory()
  })





})