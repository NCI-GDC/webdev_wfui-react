'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterItem = function (_React$Component) {
    _inherits(FilterItem, _React$Component);

    function FilterItem() {
        _classCallCheck(this, FilterItem);

        return _possibleConstructorReturn(this, (FilterItem.__proto__ || Object.getPrototypeOf(FilterItem)).apply(this, arguments));
    }

    _createClass(FilterItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                component = _props.component;

            /*
                Can you make each field look like this?
                 <FormGroup className={classNames(className, 'wfui-filters-item')} >
                    <ControlLabel>{label}</ControlLabel>
                    <FormGroup>
                        things goes inside.
                    </FormGroup>
                </FormGroup>
            */

            return null;
        }
    }]);

    return FilterItem;
}(_react2.default.Component);

FilterItem.propTypes = {
    className: _propTypes2.default.string
};

FilterItem.defaultProps = {
    className: 'wfui-filters-item'
};

exports.default = FilterItem;