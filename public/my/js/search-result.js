$(function () {

    getParamsByUrl(location.href,'keyword');
    getData();

})
//获取搜索页传来的搜索数据,找对应的数据显示 封装成函数
function getParamsByUrl(url,name) {
    var params = url.substr(url.indexOf('?')+1);
    var param = params.split("&");
    for (var i =0; i<param.length; i++){
       var current = param[i].split("=");
       if (current[0] == name){
           return  current[1];
       }
    }
    return null;
}
function getData() {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page: 1,
            pageSize: 6,
        },
        success:function(response){
            console.log(response);
            var html =template('searchTpl', response);
            $(".search-box").html(html);
        }
    })
}