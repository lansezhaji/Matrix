$(function(){
    
    $("#indexMain").attr("href", "/");
    getSession2Redirect();
    console.log('login');
    $('#loginButton').click(function(){
        var me = this;
        var email = $("#userInput").val();
        var pwd = $("#userInput").val();
        // var remember = $("#inlineCheckbox2").is(':checked') ? 1 : 0;

        // 验证
        if (email.length <= 0 || !pwd) {
            $("#loginError").show();
            return;
        }

        $.ajax({
            type: "POST",
            url: "/api/account/signin",
            data: {
                "name": email,
                "password": pwd,
                "remember": 1
            }
        }).done(function (data) {
            if (data.success === "true") {
                window.VISITOR = data.result.visitor;
                $("#loginError").hide();
                headShowInit();
                window.location.href = "/main.html";
            } else {
                layer.alert('用户名或者密码错误');
                Util.input.whiteError($("#loginError"), data);
                $("#loginError").show();
            }
        });
    })  
})