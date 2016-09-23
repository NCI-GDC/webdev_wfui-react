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

var _util = require('../../Util/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getPages = function getPages(items, numOfContents) {
    var num = Math.ceil(items.length / numOfContents);
    var pages = [];
    for (var i = 0; i < num; i++) {
        pages.push(i + 1);
    }
    return pages;
};

var mapStateToPagenateProps = function mapStateToPagenateProps(state) {
    return { current: Number(state.visibilityFilterReducer.pageFilter) };
};

var Pagenate = (_dec = (0, _reactRedux.connect)(mapStateToPagenateProps), _dec(_class = function (_React$Component) {
    _inherits(Pagenate, _React$Component);

    function Pagenate() {
        _classCallCheck(this, Pagenate);

        return _possibleConstructorReturn(this, (Pagenate.__proto__ || Object.getPrototypeOf(Pagenate)).apply(this, arguments));
    }

    _createClass(Pagenate, [{
        key: 'onHandleClick',
        value: function onHandleClick(e) {
            e.preventDefault();
            var _props = this.props;
            var dispatch = _props.dispatch;
            var scroll = _props.scroll;

            if (scroll) _util2.default.scrollTop();
            dispatch((0, _action_creators.filter)('pageFilter', e.target.getAttribute("data-page")));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props;
            var items = _props2.items;
            var numPerPage = _props2.numPerPage;
            var current = _props2.current;

            var pages = getPages(items, numPerPage);

            if (pages.length > 1) {
                return _react2.default.createElement(
                    'div',
                    { className: 'paginate' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        current > 1 ? _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#', 'data-page': current - 1, onClick: this.onHandleClick.bind(this) },
                                '« Prev'
                            )
                        ) : "",
                        pages.map(function (page, i) {
                            return _react2.default.createElement(
                                'li',
                                { key: i, className: page == current ? "active" : "" },
                                _react2.default.createElement(
                                    'a',
                                    { href: '#', 'data-page': page, onClick: _this2.onHandleClick.bind(_this2) },
                                    page
                                )
                            );
                        }),
                        current < pages.length ? _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#', 'data-page': current + 1, onClick: this.onHandleClick.bind(this) },
                                'Next »'
                            )
                        ) : ""
                    )
                );
            } else {
                return _react2.default.createElement('noscript', null);
            }
        }
    }]);

    return Pagenate;
}(_react2.default.Component)) || _class);
exports.default = Pagenate;