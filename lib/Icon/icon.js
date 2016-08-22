'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

WFUIJS.RCT = WFUIJS.RCT || {};
WFUIJS.RCT.Icon_2 = _react2.default.createClass({
    displayName: 'Icon_2',

    render: function render() {
        var data;
        var iconClasses = '';

        if (typeof this.props.data == 'string') {
            data = JSON.parse(this.props.data);
        } else {
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

        return _react2.default.createElement('i', { className: iconClasses });
    }

});