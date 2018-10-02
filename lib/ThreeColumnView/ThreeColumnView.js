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

var _reactSplitPane = require('react-split-pane');

var _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COLUMN_ROLE = _Column2.default.role;

var ThreeColumnView = function (_React$Component) {
    _inherits(ThreeColumnView, _React$Component);

    function ThreeColumnView() {
        _classCallCheck(this, ThreeColumnView);

        return _possibleConstructorReturn(this, (ThreeColumnView.__proto__ || Object.getPrototypeOf(ThreeColumnView)).apply(this, arguments));
    }

    _createClass(ThreeColumnView, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                splitClassName = _props.splitClassName,
                children = _props.children,
                enableResize = _props.enableResize,
                defaultSize = _props.defaultSize,
                minSize = _props.minSize,
                colTwoVisible = _props.colTwoVisible,
                colThreeVisible = _props.colThreeVisible;

            var visibleColCount = 1;
            if (colTwoVisible) {
                visibleColCount = 2;
                if (colThreeVisible) {
                    visibleColCount = 3;
                }
            }

            if (enableResize) {
                return _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)('three-column-view three-column-resize-view', className, visibleColCount + '-column-visible')
                    },
                    _react2.default.cloneElement(children[0], { key: 1 }),
                    colTwoVisible && !colThreeVisible ? _react2.default.cloneElement(children[1], { key: 2 }) : null,
                    colThreeVisible && colTwoVisible ? _react2.default.createElement(
                        _reactSplitPane2.default,
                        {
                            className: (0, _classnames2.default)('split-pane', splitClassName),
                            split: 'vertical',
                            minSize: minSize || 50,
                            defaultSize: defaultSize || 150
                        },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.cloneElement(children[1], { key: 2 })
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.cloneElement(children[2], { key: 3 })
                        )
                    ) : null
                );
            }

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)('three-column-view three-column-noresize-view', className, visibleColCount + '-column-visible')
                },
                _react2.default.cloneElement(children[0], { key: 1 }),
                colTwoVisible ? _react2.default.cloneElement(children[1], { key: 2 }) : null,
                colTwoVisible && colThreeVisible ? _react2.default.cloneElement(children[2], { key: 3 }) : null
            );
        }
    }]);

    return ThreeColumnView;
}(_react2.default.Component);

ThreeColumnView.Col = _Column2.default;

ThreeColumnView.propTypes = {
    className: _propTypes2.default.string,
    splitClassName: _propTypes2.default.string,
    colTwoVisible: _propTypes2.default.bool,
    colThreeVisible: _propTypes2.default.bool,
    enableResize: _propTypes2.default.bool,
    defaultSize: _propTypes2.default.number,
    minSize: _propTypes2.default.number,
    children: _propTypes2.default.arrayOf(function (propValue) {
        if (propValue.length !== 3 || propValue.every(function (child) {
            return child.props.role === COLUMN_ROLE;
        })) {
            return new Error('ThreeColumnView requires exactly three Column components as child');
        }
        return true;
    }).isRequired
};

ThreeColumnView.defaultProps = {
    className: '',
    visibleColCount: 1,
    enableResize: false,
    colTwoVisible: false,
    colThreeVisible: false,
    defaultSize: 150,
    minSize: 50
};

exports.default = ThreeColumnView;