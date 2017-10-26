$(document).ready(function(){

    var price = {
        'battlefield' : 60,
        'pubg' : 29.95
    };

    function calculatePrice(){
        var aantal = 0;
        var battlefield = 0;
        var pubg = 0;

        $('input').each(function(index, elem){
            aantal += parseInt($(this).val());
        });

        $('input').each(function(index, elem){
            var value = $(this).val();
            if (index == 0) {
                battlefield = price.battlefield * value;
            }
            else if(index == 1) {
                pubg = price.pubg * value;
            }
        });

        var totaal = battlefield + pubg;
        
        totaal = (totaal).toFixed(2).replace(".", ",");
        $('span.totaal-prijs').html(totaal);
        $('span.totaal-aantal').html(aantal);
    }

    $('input').change(function(e){
        calculatePrice();
    });
    $('input').keyup(function(e){
        calculatePrice();
    });

    $('.ch-am').click(function(e){
        var inputf = $(this).parent().find('input').val();
        inputf = parseInt(inputf);
        if($(this).hasClass('minus')){
            if(inputf != 0){
                inputf -= 1;
            }
        } else {
            inputf += 1;
        }
        $(this).parent().find('input').val(inputf);
        calculatePrice();
    });
});
