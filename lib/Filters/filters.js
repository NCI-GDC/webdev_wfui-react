'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _action_creators = require('./actions/action_creators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToFiltersProps = function mapStateToFiltersProps(state) {
    var genCompanyMap = function genCompanyMap(state) {
        var map = {};
        state.forEach(function (person, i) {
            if (!map[person.company]) {
                map[person.company] = true;
            }
        });
        return map;
    };
    var applyCompanyFilter = function applyCompanyFilter(state, company) {
        return state.filter(function (person, i) {
            if (!company) {
                return true;
            }
            return person.company == company;
        });
    };

    var applyKeywordFilter = function applyKeywordFilter(state, keywords) {
        return state.filter(function (state, i) {
            if (!keywords) return true;
            var keys = keywords.split(" ");
            var result = false;
            keys.forEach(function (key, j) {
                key = key.toLowerCase();
                if (!key) return false;
                if (state.name.fname.toLowerCase().includes(key) || state.name.lname.toLowerCase().includes(key) || state.company.toLowerCase().includes(key)) {
                    result = true;
                }
            });
            return result;
        });
    };

    var filtered = applyCompanyFilter(state.dataReducer, state.visibilityFilterReducer.companyFilter);
    filtered = applyKeywordFilter(filtered, state.visibilityFilterReducer.keywordFilter);

    return {
        data: state.dataReducer,
        filtered: filtered,
        filters: state.visibilityFilterReducer,
        companyMap: genCompanyMap(state.dataReducer)
    };
};
var Filters = (_dec = (0, _reactRedux.connect)(mapStateToFiltersProps), _dec(_class = function (_React$Component) {
    _inherits(Filters, _React$Component);

    function Filters() {
        _classCallCheck(this, Filters);

        return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).apply(this, arguments));
    }

    _createClass(Filters, [{
        key: 'onHandleChange',
        value: function onHandleChange(e) {
            var dispatch = this.props.dispatch;

            e.preventDefault();
            dispatch((0, _action_creators.filterByKeyword)(e.target.value));
        }
    }, {
        key: 'onHandleTagChange',
        value: function onHandleTagChange(e) {
            var dispatch = this.props.dispatch;

            e.preventDefault();
            dispatch((0, _action_creators.filterByCompany)(e.target.value));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var filtered = _props.filtered;
            var data = _props.data;
            var filters = _props.filters;
            var companyMap = _props.companyMap;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'By Tag:'
                    ),
                    _react2.default.createElement(
                        'select',
                        { onChange: this.onHandleTagChange.bind(this), value: filters.companyFilter },
                        _react2.default.createElement(
                            'option',
                            { 'default': true, value: '' },
                            'show all'
                        ),
                        Object.keys(companyMap).map(function (key, i) {
                            return _react2.default.createElement(
                                'option',
                                { key: i, 'default': true, value: key },
                                key
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'label',
                        null,
                        'By Keyword:'
                    ),
                    _react2.default.createElement('input', { onChange: this.onHandleChange.bind(this), type: 'text', defaultValue: filtered.keywordFilter, placeholder: 'Enter Keywords' })
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    filtered.map(function (item, i) {
                        return _react2.default.createElement(
                            'li',
                            { key: i },
                            _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    'Name: '
                                ),
                                item.name.fname,
                                ' ',
                                item.name.lname
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    'Age: '
                                ),
                                item.age
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    'Company: '
                                ),
                                item.company
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Filters;
}(_react2.default.Component)) || _class);
exports.default = Filters;