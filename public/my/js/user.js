var userInfo = null;  // 保存用户信息
// 获取用户信息 并且要处理用户登录的问题
$.ajax({
    url:"/user/queryUserMessage",
    type:"get",
    async:false,   // 异步改为同步  先到此ajax 再搭配下一个ajax
    success:function(res){
        console.log(res);
        userInfo = res;
        if(res.error && res.error == 400){
            location.href = "login.html";
        }
    }
})
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

    var html = template("userTpl",userInfo)
    $(".userInfo").html(html);
})