WFUIJS.RCT = WFUIJS.RCT || {};

/**
 * Javascript utility to render React WFUI compoment.
 * Created by Koji Miyauchi @ Nov, 2015
 */
WFUIJS.RCT.render = function(componentName, ver, target, data) {

    (function($){

        if(typeof target == 'string'){
            var element = document.getElementById(target)
        }else{
            element = target.get(0); // jQuery element
        }

        //Render element with registered component.
        if(WFUIJS.RCT[componentName.charAt(0).toUpperCase() + componentName.slice(1)+'_'+ver]){
          ReactDOM.render(
              React.createElement(WFUIJS.RCT[componentName.charAt(0).toUpperCase() + componentName.slice(1)+'_'+ver], {data: data}),
              element
          )
        }

    })(WFUIJS.$)
};

WFUIJS.RCT._oicr_wfui_gen_uniqid = function(component_name){
    return WFUIJS.RCT._uniqid('wfui_'+component_name+'-');
}

WFUIJS.RCT._uniqid = function(prefix, more_entropy) {
  //  discuss at: http://phpjs.org/functions/uniqid/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  revised by: Kankrelune (http://www.webfaktory.info/)
  //        note: Uses an internal counter (in php_js global) to avoid collision
  //        test: skip
  //   example 1: uniqid();
  //   returns 1: 'a30285b160c14'
  //   example 2: uniqid('foo');
  //   returns 2: 'fooa30285b1cd361'
  //   example 3: uniqid('bar', true);
  //   returns 3: 'bara20285b23dfd1.31879087'

  if (typeof prefix === 'undefined') {
    prefix = '';
  }

  var retId;
  var formatSeed = function(seed, reqWidth) {
    seed = parseInt(seed, 10)
      .toString(16); // to hex str
    if (reqWidth < seed.length) { // so long we split
      return seed.slice(seed.length - reqWidth);
    }
    if (reqWidth > seed.length) { // so short we pad
      return Array(1 + (reqWidth - seed.length))
        .join('0') + seed;
    }
    return seed;
  };

  // BEGIN REDUNDANT
  if (!this.php_js) {
    this.php_js = {};
  }
  // END REDUNDANT
  if (!this.php_js.uniqidSeed) { // init seed with big random int
    this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
  }
  this.php_js.uniqidSeed++;

  retId = prefix; // start with prefix, add current milliseconds hex string
  retId += formatSeed(parseInt(new Date()
    .getTime() / 1000, 10), 8);
  retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
  if (more_entropy) {
    // for more entropy we add a float lower to 10
    retId += (Math.random() * 10)
      .toFixed(8)
      .toString();
  }

  return retId;
}

WFUIJS.RCT._oicr_wfui_extend_wfuijs = function(property, data){
  var key = Object.keys(data)[0];
  WFUIJS[property] = WFUIJS[property] || {};
  WFUIJS[property][key] = data[key];
}

WFUIJS.RCT._oicr_wfui_component_instance = function(component, id, data, remove_attrs){
    
    var _data = {}, _instances = {};
    _instances[id] = data;
    _data[component] = { instances: _instances};
    WFUIJS.RCT._oicr_wfui_extend_wfuijs('components', _data);
}