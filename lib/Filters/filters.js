'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./index'),
    FiltersUtil = _require.FiltersUtil,
    ListFilter = _require.ListFilter,
    KeywordFilter = _require.KeywordFilter,
    AlphabetFilter = _require.AlphabetFilter,
    Pagenate = _require.Pagenate,
    Showing = _require.Showing,
    filter = _require.filter;

var NumberPerPage = 3;

var mapStateToFiltersProps = function mapStateToFiltersProps(state) {

    var filtered = FiltersUtil.applyListFilter(state.dataReducer, state.visibilityFilterReducer.companyFilter, 'company');
    filtered = FiltersUtil.applyKeywordFilter(filtered, state.visibilityFilterReducer.keywordFilter);
    filtered = FiltersUtil.applyAlphabetFilter(filtered, state.visibilityFilterReducer.alphabetFilter, 'fname');

    var pagenated = FiltersUtil.applyPageFilter(filtered, state.visibilityFilterReducer.pageFilter, NumberPerPage);

    return {
        data: state.dataReducer,
        filtered: filtered,
        pagenated: pagenated,
        filters: state.visibilityFilterReducer,
        companyMap: FiltersUtil.genListMap(state.dataReducer, 'company'),
        alphabetMap: FiltersUtil.genAlphabetMap(state.dataReducer, 'fname')
    };
};
var Filters = (_dec = (0, _reactRedux.connect)(mapStateToFiltersProps), _dec(_class = function (_React$Component) {
    _inherits(Filters, _React$Component);

    function Filters() {
        _classCallCheck(this, Filters);

        return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).apply(this, arguments));
    }

    _createClass(Filters, [{
        key: 'onHandleTagChange',
        value: function onHandleTagChange(e) {
            var dispatch = this.props.dispatch;

            e.preventDefault();
            dispatch(filter('companyFilter', e.target.value));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                pagenated = _props.pagenated,
                filtered = _props.filtered,
                data = _props.data,
                filters = _props.filters,
                companyMap = _props.companyMap,
                alphabetMap = _props.alphabetMap;


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
                    _react2.default.createElement(ListFilter, { filterName: 'company', filterMap: companyMap, onHandleChange: function onHandleChange() {
                            console.log('aa');
                        } }),
                    _react2.default.createElement(
                        'label',
                        null,
                        'By Keyword:'
                    ),
                    _react2.default.createElement(KeywordFilter, null),
                    _react2.default.createElement(AlphabetFilter, { alphabetMap: alphabetMap }),
                    _react2.default.createElement(Showing, { numPerPage: NumberPerPage, total: filtered.length })
                ),
                _react2.default.createElement(Pagenate, { items: filtered, numPerPage: NumberPerPage, scroll: true }),
                _react2.default.createElement(
                    'ul',
                    null,
                    pagenated.map(function (item, i) {
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
                                item.fname,
                                ' ',
                                item.lname
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