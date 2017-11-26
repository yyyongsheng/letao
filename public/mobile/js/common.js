// var MASK = mui.createMask();//callback为用户点击蒙版时自动执行的回调；

// function maskShow() {
//   MASK.show();
//   $(".lt_loading").show();
  
// }
// function maskClose() {
//   MASK.close();
//   $(".lt_loading").hide();
// }

(function ($) {
  $('body').on('tap','a',function () {
    location.href=$(this).attr('href');
  });

  // 显示和隐藏都是通过同一个对象才可以
  var Mask = mui.createMask();

  $.extend($,{
    maskShow:function () {
      Mask.show();
      $(".lt_loading").show();
    },
    maskClose:function () {
      Mask.close();
      $(".lt_loading").hide();
    },
    getURLParams:function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;     
    },
    LtAjax:function (option) {
      $.ajax({
        url:option.url,
        type:option.type||"get",
        data:option.data||"",
        success:function (result) {
          if(result.success){
            option.success&&option.success(result)
          }else if(result.error==400){
            location.href="user/login.html?returnUrl="+location.href;
          }
        }
      })
    }





  })








})(Zepto)