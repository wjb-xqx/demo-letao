$(function(){
    // miu阻止a默认跳转 先恢复
    $("body").on("tap","a",function(){
        mui.openWindow({
            url:$(this).attr("href")
        })
    })
})