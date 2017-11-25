$(function () {
  
  quertyTopCate();

  function quertyTopCate() {
    maskShow();
    $.ajax({
      url:"/category/queryTopCategory",
      success:function (result) {
        var rows=result.rows;
        if(!rows){
          return;
        }else{
          var strArr=[];
          strArr.push('<li data-id='+rows[0].id+' class="list"><a href="javascript:;">'+rows[0].categoryName+'</a></li>')
          for(var i=1;i<rows.length;i++){
            strArr.push('<li data-id='+rows[i].id+'><a href="javascript:;">'+rows[i].categoryName+'</a></li>')
          }
  
          $('.lt_sidebar ul').html(strArr.join(''));
          
          querySecondCategory(rows[0].id)
          setTimeout(function() {
            maskClose()
           }, 1000);
        }
       

      }
    })
  }


  // 二级分类

    function querySecondCategory(id) {
      maskShow()
      $.ajax({
        url:"/category/querySecondCategory?id="+id,
        success:function (result) {
          var rows=result.rows;
          if(!rows.length>0){
            $('.lt_content ul').html('');
            mui.toast("亲,没有更多数据了哦!")
            setTimeout(function() {
               maskClose()
            },300);
           
            
            return false;
          }
            var strArr=[];
            for(var i=0;i<rows.length;i++){
              strArr.push(' <li><a href="javascript:;"><img src="'+rows[i].brandLogo+'" alt=""><p>'+rows[i].brandName+'</p></a></li>');

            }
            $('.lt_content ul').html(strArr.join(''));
           setTimeout(function() {
            maskClose()
           }, 1000);

        }


      })
    }




    // 点击加载

    $('.lt_sidebar ul').on("tap",'li',function () {
      $(this).addClass('list').siblings().removeClass('list')
      var id=$(this).data('id');
      querySecondCategory(id);
    })


















})