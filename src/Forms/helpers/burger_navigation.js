const init = () => {

    (function($){

        /*
        var mainHeight = $(".survey-main").height();

        
        var padTop = $(".survey-side").css("padding-top");
        if (padTop) {
            padTop = Number(padTop.substring(0, padTop.length - 2));
        }

        var padBot = $(".survey-side").css("padding-top");
        if (padBot) {
            padBot = Number(padBot.substring(0, padBot.length - 2));
        }

        var pad = padTop + padBot;
        

        $(".survey-side").height(mainHeight - pad);
        */

        $(".dialog-survey").hide();
        $(".wfui-blanket").hide();

        $(".survey-trigger").click(function() {
            $(".dialog-survey").toggle();
            $(".wfui-blanket").toggle();
        });


        $(".faq-question").on('click', function(e){
            e.preventDefault();

            var question_box = $(this).parent();
            var state = $(this).text();

            if (state == "-") {
                question_box.find($(".question-answer")).hide(250);
                $(this).find($("a")).text("+");
                $(this).parent().removeClass("expanded");
            }
            else if (state == "+") {
                question_box.find($(".question-answer")).show(250);
                $(this).find($("a")).text("-");
                $(this).parent().addClass("expanded");
            }
        });


        $(".wfui-selection__input-radio").on('click', function() {
            var box = $(this).parent().parent().parent();
            var grid = box.parent();

            grid.find(".wfui-grid__column").removeClass("active");
            box.addClass("active");
        });

        $(".wfui-selection__input-checkbox").on('click', function() {
            var box = $(this).parent().parent().parent();

            if ($(this).is(":checked")) {
                box.addClass("active");
            }
            else {
                box.removeClass("active");
            }
        });

       
        $(".survey-side-expand").on('click', function() {

            var curPos = $(".survey-side").css("margin-left");
            curPos = Number(curPos.substring(0, curPos.length - 2));

            if (curPos < 0) {
                $(".survey-side").animate({
                    marginLeft: "0"
                }, 500, function(){
                    $(this).addClass('open');
                });
            }
            else {
                $(".survey-side").animate({
                    marginLeft: "-80%"
                }, 500, function(){
                    $(this).removeClass('open');
                });
            }
        });
        $(".survey-side .survey-section").on('click', function(){
            $(".survey-side-expand").trigger('click')
        })

    })(WFUIJS.$)

}

export default { init }