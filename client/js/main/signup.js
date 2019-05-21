$(document).on('click', 'a[href="#finish"]', function () {
    console.log('click');

    $.ajax({
        url: 'apis/api-signup.php',
        data: $('#wizard').serialize(),
        method: 'POST',
        dataType: 'JSON'
    }).always(function (jData) {
        console.log("jData ", jData);

    })
})















/******************************************************
 :: bootstrap
 *****************************************************/
$(function () {
    $("#wizard").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 500,
        labels: {
            finish: "Submit",
            next: "Forward",
            previous: "Backward"
        }
    });
    $('.wizard > .steps li a').click(function () {
        $(this).parent().addClass('checked');
        $(this).parent().prevAll().addClass('checked');
        $(this).parent().nextAll().removeClass('checked');
    });
    // Custome Jquery Step Button
    $('.forward').click(function () {
        $("#wizard").steps('next');
    })
    $('.backward').click(function () {
        $("#wizard").steps('previous');
    })
    // Select Dropdown
    $('html').click(function () {
        $('.select .dropdown').hide();
    });
    $('.select').click(function (event) {
        event.stopPropagation();
    });
    $('.select .select-control').click(function () {
        $(this).parent().next().toggle();
    })
    $('.select .dropdown li').click(function () {
        $(this).parent().toggle();
        var text = $(this).attr('rel');
        $(this).parent().prev().find('div').text(text);
    })
})