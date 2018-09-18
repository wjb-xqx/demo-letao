$(function(){
    // 库存数量
    var kucunNum = 0;
    // 尺码
    var size = null;
    // 产品ID
    var id = getParamsByUrl(location.href, 'id');
    var productId = 0;
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function(res){
            // 库存数量
            kucunNum = res.num;
            var html = template("productTpl", res);
            $('#product-box').html(html);
            //获得slider插件对象  轮播图
            var gallery = mui('.mui-slider');
            gallery.slider();

        }
    });

    $('#product-box').on('tap', '.size span', function(){
        $(this).addClass('active').siblings('span').removeClass('active');
        // 用户选择的尺码
        size = $(this).html();
    });
    $('#increase').on('tap',function(){
        var num = $('#inp').val()
        num++;
        if(num > kucunNum){
            num = kucunNum;
        }
        $('#inp').val(num);

    });
    $('#reduce').on('tap', function(){
        var num = $('#inp').val()
        num--;
        if(num < 1){
            num = 1;
        }
        $('#inp').val(num);
    });
    $('#addCart').on('tap', function(){
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                num: kucunNum,
                size: size
            },
            success: function(res){
                console.log(res);
                if(res.success){
                    mui.confirm("加入购物车成功,跳转到购物车?", function(message){
                        if(message.index){
                            // 跳转到购物车
                            location.href = "cart.html";
                        }

                    })

                }

            }
        });

    });

});

