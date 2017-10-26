$(document).ready(function(){

    // $(window).scroll(function() {
    //     if ($(this).scrollTop()) {
    //         $('#toTop, #BackToTop').fadeIn();
    //     } else {
    //         $('#toTop, #BackToTop').fadeOut();
    //     }
    // });
    //
    // $("#BackToTop").click(function(e){
    //     e.preventDefault();
    //     $('html, body').animate({scrollTop:0}, 400, 'swing');
    //     return false;
    // });

    //Kees code
    $(".product").mouseenter(
        function(){ $(this).css("background-color", "#DCDCDC")});

    $(".product").mouseleave(
        function(){ $(this).css("background-color", "white")});







    //wouter code
    $("#cart-button").click(function(){
        $("#buy-window").show();
    })

    $("#return-button").click(function(){
        $("#buy-window").hide();
    })
    
    // End wouter code
});









