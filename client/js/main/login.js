$(document).on('click', '#btnLogin', function () {
    console.log('click');

    $.ajax({
        url: 'apis/api-login.php',
        data: $('#wizard').serialize(),
        method: 'POST',
        dataType: 'JSON'
    }).always(function (jData) {
        console.log("jData ", jData);

    })
})