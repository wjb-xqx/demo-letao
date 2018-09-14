$(function () {
    $("#logout").on("click",function(){
        $.ajax({
            url:"/user/logout",
            type:"get",
            success:function(res){
                if (res.success){
                    mui.toast("退出登录成功");
                   setInterval(function(){
                       location.href="index.html";
                   },2000)
                }
            }
        })
    })
})