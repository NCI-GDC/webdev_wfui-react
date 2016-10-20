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

var mapStateToAlphabetFilterProps = function mapStateToAlphabetFilterProps(state) {
    return { AlphabetFilter: state.visibilityFilterReducer["keywordFilter"] };
};
var AlphabetFilter = (_dec = (0, _reactRedux.connect)(mapStateToAlphabetFilterProps), _dec(_class = function (_React$Component) {
    _inherits(AlphabetFilter, _React$Component);

    function AlphabetFilter() {
        _classCallCheck(this, AlphabetFilter);

        return _possibleConstructorReturn(this, (AlphabetFilter.__proto__ || Object.getPrototypeOf(AlphabetFilter)).apply(this, arguments));
    }

    _createClass(AlphabetFilter, [{
        key: 'onHandleAlphabet',
        value: function onHandleAlphabet(e) {
            e.preventDefault();
            var _props = this.props;
            var dispatch = _props.dispatch;
            var onHandleClick = _props.onHandleClick;

            dispatch((0, _action_creators.filter)('alphabetFilter', e.target.dataset.key));
            dispatch((0, _action_creators.filter)('pageFilter', 1));

            if (onHandleClick && typeof onHandleClick == 'function') {
                onHandleClick(e);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props;
            var alphabetMap = _props2.alphabetMap;
            var alphabetFilter = _props2.alphabetFilter;
            var showing = _props2.showing;

            return _react2.default.createElement(
                'div',
                { className: 'alphabet-paginate' },
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'nav',
                        { className: 'alphabet-nav' },
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#', 'data-key': '', onClick: this.onHandleAlphabet.bind(this) },
                                '#'
                            )
                        ),
                        Object.keys(alphabetMap).map(function (key, i) {
                            var activeClass = alphabetFilter == key ? "active" : "";
                            if (alphabetMap[key]) {
                                return _react2.default.createElement(
                                    'span',
                                    { key: i, className: activeClass },
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#', 'data-key': key, onClick: _this2.onHandleAlphabet.bind(_this2) },
                                        key.toUpperCase()
                                    )
                                );
                            } else {
                                return _react2.default.createElement(
                                    'span',
                                    { key: i },
                                    key.toUpperCase()
                                );
                            }
                        }),
                        _react2.default.createElement(
                            'span',
                            null,
                            'showing ',
                            showing
                        )
                    )
                )
            );
        }
    }]);

    return AlphabetFilter;
}(_react2.default.Component)) || _class);
exports.default = AlphabetFilter;