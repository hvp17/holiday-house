// Activate different filters
$(document).on('click', 'button.tag', function(){
    var isActive = $(this).is('.activeFilter');
    $(this).removeClass('activeFilter')
    $(this).toggleClass('activeFilter', !isActive)  
})


// Search functionality
$(document).on('click', '.btnSearch', function(){
    var data = $('.frmSearch').serialize()
    var date = new Date($('#select-date').val())

    if(!(date == 'Invalid Date')){
        $('#select-date').removeClass('invalid')
        console.log('yes valid date')

        // Search ajax here





    }else{
        $('#select-date').addClass('invalid')
    }
})