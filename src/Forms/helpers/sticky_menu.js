/**
 * Enable sticky menu on survey menu.
 * @returns {Object}
 */
const threshold = 991;
const stickyMenu = () => {
    var menuParams;
    var sidebarHeight;
    return {
        init: ()=> {
            sidebarHeight = $('.survey-side').innerHeight();
            $( window ).scroll((e) => {
                if($(window).width() > threshold){ 
                    if(menuParams){
                        if($(window).scrollTop() > (menuParams - $('.survey-side').innerHeight() )){
                            $('.survey-side').removeClass('affix');
                            $('.survey-side').addClass('affix-bottom');
                        }else{
                            $('.survey-side').removeClass('affix-bottom');
                            $('.survey-side').addClass('affix');
                        }
                    }
                }else{
                    $('.survey-side').removeClass('affix');
                    $('.survey-side').removeClass('affix-bottom');
                }
            });
            $( window ).resize((e)=>{
                if(sidebarHeight > $(window).height()){
                    $('.survey-side').css('height','auto')    
                }else{
                    $('.survey-side').css('height','100vh')
                }
            });
            $(window).trigger('resize');
        },
        update: ()=>{
            
            if(sidebarHeight < $('.survey-main.active').innerHeight() && $(window).height() < $('.survey-main.active').innerHeight() ){
                menuParams = $('.survey-main.active').innerHeight();
            }else{
                menuParams = false;
                $('.survey-side').removeClass('affix');
                $('.survey-side').removeClass('affix-bottom');
                $('.survey-side').css('height','100vh;');
            }
            $(window).trigger('scroll');
            $(window).trigger('resize');
        },
    }
}
export default stickyMenu()