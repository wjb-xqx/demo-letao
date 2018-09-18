$(function(){
    var address = null;
    $.ajax({
        url: '/address/queryAddress',
        type:"get",
        success:function(res){
            address =res;
            var html = template("addressTpl",{result:res});
            $('#address-box').html(html);
        }
    })
    $("#address-box").on("click",".delete-btn",function(){
        var id = $(this).data("id");
        var li = this.parentNode.parentNode;
        mui.confirm("确认要删除吗?",function(message){
           if (message.index == 1){
               $.ajax({
                   url:" /address/deleteAddress",
                   type:"post",
                   data:{id:id},
                   success:function(res){
                       if (res.success){
                           // 重新加载当前页面
                           location.reload();
                       }
                   }
               })
           } else{
               // 取消删除
               // 关闭列表滑出效果
               mui.swipeoutClose(li);
           }
        })
    })
    $("#address-box").on("click",".edit-btn",function(){
        var id = $(this).data('id');
        console.log(address);
        for (var i = 0; i < address.length; i++) {
            if (address[i].id == id){
                localStorage.setItem("editAddress",JSON.stringify(address[i]));
                break;
            }
        }
        location.href = "addAddress.html?isEdit=1";
    })
})