$(document).on('click', '#btnLogin', function () {
    $.ajax({
        url: "http://localhost:3000/user/login",
        data: $('#wizard').serialize(),
        method: 'POST',
        dataType: 'JSON'
    }).always(function (jData) {
        console.log("jData ", jData);
        if(jData.status===1){
            window.location.href = "/";
        }else{
            console.log('error login')
        }
    })
})