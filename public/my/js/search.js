$(function(){
    $(".search-box").on("click",function(){
        var kayword =$(this).siblings("input").val();
        if (kayword){
            keyArr.unshift(kayword); // 存入数组
            localStorage.setItem("keyArr",JSON.stringify(keyArr));   // 将数字转字符串 存放本地
            location.href = "search-result.html?kayword="+kayword;
        } else{
            alert("请输入搜索名称");
        }
    })
    var keyArr = [];
    if (localStorage.getItem("keyArr")) {
        keyArr = JSON.parse(localStorage.getItem("keyArr"));
        var html = template("history-tpl",{result:keyArr});
        $(".history-box").html(html);
    }
    $('.history-box').on("click","li",function(){
        var kayword =$(this).text();
        keyArr.unshift(kayword); // 存入数组
        location.href = "search-result.html?kayword="+kayword;
    })
    $(".clear").on("click",function(){
        $('.history-box').text("");
        localStorage.removeItem("keyArr");
    })
})