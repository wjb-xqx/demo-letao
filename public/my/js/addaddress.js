$(function(){
    var isEdit = Number(getParamsByUrl(location.href, 'isEdit'));
    if (isEdit && localStorage.getItem("editAddress")){
        var address = JSON.parse(localStorage.getItem("editAddress"));
        var html = template("editTpl",address);
        $('#editForm').html(html);
    } else{
        // 添加操作
        var html = template("editTpl",{});
        $('#editForm').html(html);
    }

    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData);
    $("#selectCity").on("click",function(){
        picker.show(function (selectItems) {
            $("#selectCity").val(selectItems[0].text  +selectItems[1].text + selectItems[2].text)
        })
    })

    $("#addAddress-btn").on("click",function(){
        var username = $("[name='username']").val();
        var postCode = $("[name='postCode']").val();
        var city = $("[name='city']").val();
        var detail = $("[name='detail']").val();
        if (username.trim() == ''){
            mui.toast("请输入用户名")
            return;
        }
        if (postCode.trim() == ''){
            mui.toast("请输入邮编")
            return;
        }
        if (city.trim() == ''){
            mui.toast("请输入邮编")
            return;
        }
        var data = {
            address: city,
            addressDetail: detail,
            recipients: username,
            postcode: postCode
        };
        if (isEdit) {
            // 编辑操作
            var url = "/address/updateAddress";
            data.id = address.id;
        }else{
            // 添加操作
            var url = "/address/addAddress";
        }
        $.ajax({
            url:url,
            type:"post",
            data:data,
            success:function(res){
                if (res.success){
                    if (isEdit) {
                        mui.toast("地址修改成功");
                    }
                    mui.toast("添加成功");
                    setTimeout(function(){
                        location.href = "address.html";
                    },2000)
                }
            }
        })
    })



})