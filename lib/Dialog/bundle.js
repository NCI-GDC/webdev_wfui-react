'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.React = require('react');
window.ReactDOM = require('react-dom');

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');

//Dependencies
require('../../legacy/wfui-widget.0.js');
require('../../legacy/wfui-browser.0.js');
require('../../legacy/wfui-blanket.0');
require('../../legacy/wfui-layer.0.js');

require('../../src/Icon/icon');
require('../../src/Button/button');
require('../../src/Dialog/dialog');
var css = require('../../dist/wfui.bundle.css');

var DialogTest = function (_React$Component) {
    _inherits(DialogTest, _React$Component);

    function DialogTest() {
        _classCallCheck(this, DialogTest);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DialogTest).apply(this, arguments));
    }

    _createClass(DialogTest, [{
        key: '_close',
        value: function _close() {
            this.hide();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var config = {
                title: 'Are you sure you want to delete this participant?',
                size: "large",
                has_searchbox: true,
                has_close: true,
                content: "Are you sure you want to delete: <br>This action cannot be undone and all of the participant's personal and survey data will be permanently deleted from the system.",
                buttons: [{ title: "Export", is_primary: true, onClick: function onClick() {} }, { title: "Cancel", onClick: this._close }]
            };
            return React.createElement(
                'div',
                null,
                React.createElement(WFUIJS.RCT.Button_1, { data: { title: "Open Dialog", is_primary: true, onClick: function onClick() {
                            _this2.refs.dialog.show();
                        } } }),
                React.createElement(WFUIJS.RCT.Dialog2_1, { ref: 'dialog', data: config })
            );
        }
    }]);

    return DialogTest;
}(React.Component);

ReactDOM.render(React.createElement(DialogTest, null), document.getElementById('dialog'));