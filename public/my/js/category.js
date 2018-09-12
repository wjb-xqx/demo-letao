$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        url:"/category/queryTopCategory",
        type:'get',
        success:function(result){
            var html =  template('first-tip',{data:result.rows});
            $("#links").html(html);
        }
    })
    $("#links").on("click","a",function(){
        var id = $(this).attr("data-id");
        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            data:{
                id:id
            },
            success:function(res){
                  var html =  template("two-tip",res);
                    $(".brand").html(html);
            }
        })
    })
})