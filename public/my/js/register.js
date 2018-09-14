$(function(){
    $("#register-btn").on("click",function(){
        var username = $("[name='username']").val();
        var mobile = $("[name='mobile']").val();
        var password = $("[name='password']").val();
        var againPass = $("[name='againPass']").val();
        var vCode = $("[name='vCode']").val();
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (username.trim() == ''){
            mui.toast("请输入用户名")
            return false;
        }
        if (!reg.test(mobile)) {
            mui.toast("请输入合法的手机号")
            return false;
        }
        if (password != againPass || password.trim() == '' || againPass.trim() == '') {
            mui.toast("两次输入密码不一样")
            return false;
        }
        if (vCode.trim() == ''){
            mui.toast("请输入验证码")
            return false;
        }
        $.ajax({
            url:"/user/register",
            type:"post",
            data:{
                username:username,
                mobile:mobile,
                password:password,
                againPass:againPass,
                vCode:vCode
            },
            success:function(res){
                mui.toast("注册成功");
                setInterval(function(){
                    location.href = "login.html";
                },1000)
            }
        })
    })
    // 获取认证码 点击事情 获取认证码
    $("#getCode").on("click",function(){
       $.ajax({
           url:"/user/vCode",
           type:"get",
           success:function(res){
                console.log(res.vCode)
           }
       })
    })
})