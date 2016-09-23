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

var _require = require('./index');

var Util = _require.Util;
var ListFilter = _require.ListFilter;
var KeywordFilter = _require.KeywordFilter;
var AlphabetFilter = _require.AlphabetFilter;
var Pagenate = _require.Pagenate;
var Showing = _require.Showing;
var filter = _require.filter;

var NumberPerPage = 3;

var mapStateToFiltersProps = function mapStateToFiltersProps(state) {

    var filtered = Util.applyListFilter(state.dataReducer, state.visibilityFilterReducer.companyFilter, 'company');
    filtered = Util.applyKeywordFilter(filtered, state.visibilityFilterReducer.keywordFilter);
    filtered = Util.applyAlphabetFilter(filtered, state.visibilityFilterReducer.alphabetFilter, 'fname');

    var pagenated = Util.applyPageFilter(filtered, state.visibilityFilterReducer.pageFilter, NumberPerPage);

    return {
        data: state.dataReducer,
        filtered: filtered,
        pagenated: pagenated,
        filters: state.visibilityFilterReducer,
        companyMap: Util.genListMap(state.dataReducer, 'company'),
        alphabetMap: Util.genAlphabetMap(state.dataReducer, 'fname')
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
            var _props = this.props;
            var pagenated = _props.pagenated;
            var filtered = _props.filtered;
            var data = _props.data;
            var filters = _props.filters;
            var companyMap = _props.companyMap;
            var alphabetMap = _props.alphabetMap;


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
                    _react2.default.createElement(ListFilter, { filterName: 'company', filterMap: companyMap }),
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