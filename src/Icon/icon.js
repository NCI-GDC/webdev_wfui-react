var React = require('react');
WFUIJS.RCT = WFUIJS.RCT || {};
WFUIJS.RCT.Icon_2 = React.createClass({
  render: function() {
    var data;
    var iconClasses = '';
 
    if(typeof this.props.data == 'string'){
      data = JSON.parse(this.props.data);
    }else{
      data = this.props.data;
    }

    //mandatory class
    iconClasses += 'wfui-icon fa fa-' + data.name;

    if (data.size) {
        iconClasses += ' fa-' + data.size;
    }
    if (data.is_fixed_width) {
        iconClasses += ' fa-fw';
    }
    if (data.is_li_icon) {
        iconClasses += ' fa-li';
    }
    if (data.has_border) {
        iconClasses += ' fa-border';
    }
    if (data.pull) {
        iconClasses += ' pull-' + data.pull;
    }
    if (data.is_spinning) {
        iconClasses += ' fa-spin';
    }
    if (data.rotate) {
        iconClasses += ' fa-rotate-' + data.rotate;
    }
    if (data.flip) {
        iconClasses += ' fa-flip-' + data.flip;
    }
    if (data.stack) {
        iconClasses += ' fa-stack-' + data.stack;
    }

    return (
      <i className={iconClasses}></i>
    );
  }

});