$(function(){
    $("#modify-btn").on("click",function(){
        var oldPassword = $("[name='oldPassword']").val();
        var password = $("[name='password']").val();
        var passwordNew = $("[name='passwordNew']").val();
        var vCode = $("[name='vCode']").val();
        if (oldPassword.trim() == '') {
            mui.toast("原密码不能为空");
            return;
        }
        if (password.trim() == '' ||passwordNew.trim() == '' || password !==passwordNew){
            mui.toast("原密码新密码不一致");
            return;
        }
        if (vCode.trim() == '') {
            mui.toast("原密码不能为空");
            return;
        }
            $.ajax({
            url:'/user/updatePassword',
            type:'post',
            data:{
                oldPassword:oldPassword,
                newPassword:password,
                vCode:vCode
            },
            success:function(res){
                console.log(res);
                if (res.success){
                    mui.toast("修改密码成功")
                    setInterval(function(){
                        location.href = "login.html";
                    },2000)
                }
            }
        })

    })
    $('#getCode').on('tap', function(){

        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function(res){
                // 将认证码显示在控制台中
                console.log(res.vCode);
            }
        })

    });
})
