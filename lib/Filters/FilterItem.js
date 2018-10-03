'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../util/visibilityFilter/actions');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var FilterItem = function (_React$Component) {
    _inherits(FilterItem, _React$Component);

    function FilterItem() {
        _classCallCheck(this, FilterItem);

        var _this = _possibleConstructorReturn(this, (FilterItem.__proto__ || Object.getPrototypeOf(FilterItem)).call(this));

        _this.onHandleChange = _this.onHandleChange.bind(_this);
        _this.applyFilters = _this.applyFilters.bind(_this);
        return _this;
    }

    _createClass(FilterItem, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                name = _props.name,
                query = _props.location.query;

            if (query[name]) {
                this.applyFilters(name, decodeURI(query[name]));
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props2 = this.props,
                query = _props2.location.query,
                name = _props2.name;

            if (query[name] && !nextProps.location.query[name]) {
                this.applyFilters(name, '');
            } else if (nextProps.location.query[name] !== query[name]) {
                this.applyFilters(name, decodeURI(nextProps.location.query[name]));
            }
        }
    }, {
        key: 'onHandleChange',
        value: function onHandleChange(e) {
            var _props3 = this.props,
                onHandleChange = _props3.onHandleChange,
                name = _props3.name;

            this.applyFilters(name, e.target.value);
            onHandleChange();
        }
    }, {
        key: 'applyFilters',
        value: function applyFilters(key, value) {
            var _props4 = this.props,
                filterType = _props4.filterType,
                changeFilter = _props4.changeFilter,
                toggleFilter = _props4.toggleFilter;


            switch (filterType) {
                case 'change':
                    changeFilter([{ key: key, value: value }]);
                    break;
                case 'toggle':
                    toggleFilter([{ key: key, value: value }]);
                    break;
                default:
                    changeFilter([{ key: key, value: value }]);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props5 = this.props,
                label = _props5.label,
                className = _props5.className,
                component = _props5.component;


            return _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { className: (0, _classnames2.default)(className, 'wfui-filters-item') },
                label ? _react2.default.createElement(
                    _reactBootstrap.ControlLabel,
                    null,
                    label
                ) : null,
                _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    null,
                    _react2.default.createElement(component, _extends({}, this.props, {
                        onHandleChange: this.onHandleChange
                    }))
                )
            );
        }
    }]);

    return FilterItem;
}(_react2.default.Component);

FilterItem.propTypes = {
    label: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,
    category: _propTypes2.default.object,
    className: _propTypes2.default.string,
    items: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])),
    filterType: _propTypes2.default.string,
    changeFilter: _propTypes2.default.func,
    toggleFilter: _propTypes2.default.func,
    onHandleChange: _propTypes2.default.func,
    location: _propTypes2.default.shape({
        query: _propTypes2.default.object
    }),
    capitalize: _propTypes2.default.bool
};

FilterItem.defaultProps = {
    changeFilter: function changeFilter(f) {
        return f;
    },
    onHandleChange: function onHandleChange(f) {
        return f;
    },
    location: { query: {} },
    className: 'wfui-filters-item',
    filterType: 'change',
    items: []
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return {
        category: state.visibilityFilter && state.visibilityFilter.category
    };
}, Actions)(FilterItem);