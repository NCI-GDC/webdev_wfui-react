'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _action_creators = require('../actions/action_creators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToListFilterProps = function mapStateToListFilterProps(state) {
    return { filters: state.visibilityFilterReducer };
};
var ListFilter = (_dec = (0, _reactRedux.connect)(mapStateToListFilterProps), _dec(_class = function (_React$Component) {
    _inherits(ListFilter, _React$Component);

    function ListFilter() {
        _classCallCheck(this, ListFilter);

        return _possibleConstructorReturn(this, (ListFilter.__proto__ || Object.getPrototypeOf(ListFilter)).apply(this, arguments));
    }

    _createClass(ListFilter, [{
        key: 'onHandleTagChange',
        value: function onHandleTagChange(e) {
            var _props = this.props;
            var dispatch = _props.dispatch;
            var filterName = _props.filterName;

            e.preventDefault();
            dispatch((0, _action_creators.filter)(filterName + 'Filter', e.target.value));
            dispatch((0, _action_creators.filter)('pageFilter', 1));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var filterName = _props2.filterName;
            var filters = _props2.filters;
            var filterMap = _props2.filterMap;

            var filterKey = filterName + 'Filter';
            return _react2.default.createElement(
                'select',
                { onChange: this.onHandleTagChange.bind(this), value: filters[filterKey] },
                _react2.default.createElement(
                    'option',
                    { 'default': true, value: '' },
                    'show all'
                ),
                filterMap && Object.keys(filterMap).map(function (key, i) {
                    return _react2.default.createElement(
                        'option',
                        { key: i, 'default': true, value: key },
                        key
                    );
                })
            );
        }
    }]);

    return ListFilter;
}(_react2.default.Component)) || _class);
exports.default = ListFilter;