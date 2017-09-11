const bodyResizeListener = ($, el, callback) =>{
    let divW = $(el).width();
    let divH = $(el).height();
    let timer = setInterval(_checkResize, 100);
    function _checkResize(){
        let w = $(el).width();
        let h = $(el).height();
        if (w != divW || h != divH) {
            divH = h;
            divW = w;
            if(typeof callback === 'function'){
                setTimeout(()=>{
                    callback($)
                },10);
            }
        }
    }
    return {
        off: ()=>{
            console.log('off');
            clearInterval(timer);
        }
    }
}
export default bodyResizeListener