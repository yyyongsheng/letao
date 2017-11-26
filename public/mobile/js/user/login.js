
$(".loginBtn").on("tap",function () {
  
  
  var user=$('.userTxt').val();
  
  var pwd=$('.pwdTxt').val();
  
  if(!$.trim(user)){
    mui.toast('请输入合法的用户名')
    return false;
  }
  if(!$.trim(pwd)){
    mui.toast('请输入合法密码')
    return false;
  }

  $.ajax({
    url:"/user/login",
    type:'post',
    data:$('.form').serialize(),
    success:function(result){
      if(result.success){

        if($.getURLParams("returnUrl")){
          location.href=$.getURLParams("returnUrl");
        }
        else{
          // 跳回首页
          location.href="/mobile/index.html";
        }


    }else{
      mui.toast(result.message)
    }




  
  }

})
})

  
  
   


    