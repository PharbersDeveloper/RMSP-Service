(function($,w){
    $(".btn-1").click(function () {
        $(this).hide();
        $(".second-item").fadeIn("slow");
    });
    $(".btn-2").click(function () {
        $(this).hide();
        $(".third-item").fadeIn("slow");
    });
    $(".btn-3").click(function () {
        $(this).hide();
        $(".btn-go").fadeIn("slow");
    });
    $('.btn-go').click(function(){
        w.location.href = "/home/" + $('input[name="uuid"]').val() + "/2"
    });
})(jQuery, window);
