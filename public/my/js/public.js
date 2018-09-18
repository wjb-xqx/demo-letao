$(function(){
    // miu阻止a默认跳转 先恢复
    $("body").on("tap","a",function(){
        mui.openWindow({
            url:$(this).attr("href")
        })
    })
})
function getParamsByUrl(url,name){
    var word =url.substr(url.indexOf("?")+1);
    var words = word.split("&");
    for (var i = 0;i < words.length; i ++ ){
        var curr = words[i].split("=");
        if (curr[0] == name ){
            return curr[1];
        }
    }
    return null;
}