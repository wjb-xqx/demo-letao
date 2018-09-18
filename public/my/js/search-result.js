var proName =  getParamsByUrl(location.href,'word');
var page = 1;
var  html = '';
var priceSort = 1;  //升序
var numSort =1;
$(function(){
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback : getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 价格排序
    $("#priceSort").on("tap",function(){
        priceSort =priceSort ==1 ? 2 :1;
        html = '';
        page =1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    })
    $("#numSort").on("tap",function(){
        numSort =numSort ==1 ? 2 :1;
        html = '';
        page =1;
        priceSort = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
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
function getData(){
    if(!This){   //第一次调用时mui的对象   如果自身调用后面没有This.endPullupToRefresh(true);方法
        // 所以会报错,此时要走一个判断,要让this正确的指向
        This = this;
    }
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
           page: page++,
            pageSize: 3,
            proName:proName,
            price:priceSort,
            num:numSort
       },
        success:function(res){
            // if (res.data.length >0){
            //     html += template("searchTpl",res);
            //     $(".search-box").html(html);
            //     This.endPullupToRefresh(false); // 没有数据,隐藏文字
            // }else {
            //     // 告诉上拉加载组件当前数据加载完毕
            //     This.endPullupToRefresh(true);
            // }
            //  以下为优化
                html += template("searchTpl",res);
                $(".search-box").html(html);
                This.endPullupToRefresh(res.data.length == 0);
        }
    })
}