$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        url:"/category/queryTopCategory",
        type:'get',
        success:function(res){
            var html =  template('first-tip',{result:res.rows});
            $("#links").html(html);
            if (res.rows.length){
                var id = res.rows[0].id;
                $("#links").find("a").eq(0).addClass("active");
                getSecondCategory(id);
            }
        }
    })
    // 点击有自己分类跳转二级分类
    $("#links").on("click","a",function(){
        var id = $(this).attr("data-id");
        $(this).addClass("active").siblings().removeClass("active");
        getSecondCategory(id);
    })
})
function getSecondCategory(id){
    $.ajax({
        url:"/category/querySecondCategory",
        type:"get",
        data:{id:id},
        success:function(result){
            var html =  template('two-tip',result);
            $(".brand").html(html);
        }
    })
}