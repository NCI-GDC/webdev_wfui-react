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

var _stringifyValues = require('../util/stringifyValues');

var _removeHTMLTags = require('../util/removeHTMLTags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var columnProps = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.shape({
    size: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]),
    order: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    offset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
})]);

var IsotopeItem = function (_React$Component) {
    _inherits(IsotopeItem, _React$Component);

    function IsotopeItem() {
        _classCallCheck(this, IsotopeItem);

        return _possibleConstructorReturn(this, (IsotopeItem.__proto__ || Object.getPrototypeOf(IsotopeItem)).apply(this, arguments));
    }

    _createClass(IsotopeItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                index = _props.index,
                id = _props.id,
                width = _props.width,
                xs = _props.xs,
                sm = _props.sm,
                md = _props.md,
                lg = _props.lg,
                children = _props.children,
                item = _props.item,
                className = _props.className,
                specifySizer = _props.specifySizer,
                itemDisplay = _props.itemDisplay,
                stringifyField = _props.stringifyField,
                disableItemStringify = _props.disableItemStringify;

            var elems = [];

            if (!itemDisplay) return null;

            if (Array.isArray(children)) {
                children.forEach(function (elem) {
                    if (Array.isArray(elem)) {
                        elem.forEach(function (i) {
                            return elems.push(i);
                        });
                    } else {
                        elems.push(elem);
                    }
                });
            } else {
                elems.push(children);
            }

            if (width) {
                return _react2.default.createElement(
                    'div',
                    {
                        key: index,
                        id: id + '-item-' + index,
                        className: (0, _classnames2.default)(className, id + '-item ' + (index === 0 && !specifySizer ? 'wfui-isotope-grid-sizer' : ''), 'wfui-isotope-item'),
                        style: { width: width + 'px' },
                        'data-item': !disableItemStringify && (stringifyField ? item[stringifyField] : (0, _removeHTMLTags.removeHTMLTags)((0, _stringifyValues.stringifyValues)(item)))
                    },
                    itemDisplay ? (0, _react.cloneElement)(itemDisplay, Object.assign({}, this.props, { id: undefined })) : elems.map(function (child, ind) {
                        return (0, _react.cloneElement)(child, Object.assign({}, _this2.props, { id: undefined, key: ind }));
                    })
                );
            }

            return _react2.default.createElement(
                _reactBootstrap.Col,
                {
                    key: index,
                    id: id + '-item-' + index,
                    className: (0, _classnames2.default)(className, id + '-item ' + index + ' ' + (index === 0 && !specifySizer ? 'wfui-isotope-grid-sizer' : ''), 'wfui-isotope-item'),
                    xs: xs,
                    sm: sm,
                    md: md,
                    lg: lg,
                    'data-item': !disableItemStringify && (stringifyField ? item[stringifyField] : (0, _removeHTMLTags.removeHTMLTags)((0, _stringifyValues.stringifyValues)(item)))
                },
                itemDisplay ? (0, _react.cloneElement)(itemDisplay, Object.assign({}, this.props, { id: undefined, className: undefined })) : elems.map(function (child, ind) {
                    return (0, _react.cloneElement)(child, Object.assign({}, _this2.props, {
                        id: undefined,
                        className: undefined,
                        key: ind
                    }));
                })
            );
        }
    }]);

    return IsotopeItem;
}(_react2.default.Component);

IsotopeItem.propTypes = {
    stringifyField: _propTypes2.default.string,
    index: _propTypes2.default.number,
    id: _propTypes2.default.string,
    width: _propTypes2.default.number,
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    children: _propTypes2.default.node,
    item: _propTypes2.default.any,
    className: _propTypes2.default.string,
    specifySizer: _propTypes2.default.bool,
    itemDisplay: _propTypes2.default.element,
    disableItemStringify: _propTypes2.default.bool
};

IsotopeItem.defaultProps = {
    role: 'item'
};

exports.default = IsotopeItem;