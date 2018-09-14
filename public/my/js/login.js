$(function(){
    $("#login-btn").on("click",function(){
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        if (username.trim() == '') {
            mui.toast("请输入用户名")
            return false;
        }
        if (password.trim() == '') {
            mui.toast("请输入密码")
            return false;
        }
        $.ajax({
            url:'/user/login',
            type:"post",
            data:{
                username:username,
                password:password
            },
            beforeSend:function(){
                $("#login-btn").html("正在登录...");
            },
            success:function(res){
                mui.toast("登录成功");
                $("#login-btn").html("登录");
                setInterval(function(){
                    location.href = "user.html";
                },1000)
            }
        })
    })
})