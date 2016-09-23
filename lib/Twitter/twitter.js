'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Twitter = function (_React$Component) {
    _inherits(Twitter, _React$Component);

    function Twitter(props) {
        _classCallCheck(this, Twitter);

        var script = document.createElement('script');
        script.src = 'http://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);

        return _possibleConstructorReturn(this, (Twitter.__proto__ || Object.getPrototypeOf(Twitter)).call(this, props));
    }

    _createClass(Twitter, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var twitterAccount = _props.twitterAccount;
            var limit = _props.limit;

            var urlSafeTwitter = encodeURIComponent(twitterAccount);
            var twitterLink = 'https://twitter.com/' + urlSafeTwitter;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    { className: 'title block-title blog-title twitter' },
                    'Twitter: ',
                    _react2.default.createElement(
                        'a',
                        { href: twitterLink },
                        '@',
                        twitterAccount
                    )
                ),
                _react2.default.createElement('a', {
                    className: 'twitter-timeline',
                    'data-dnt': 'true',
                    'data-chrome': 'noheader nofooter',
                    'data-tweet-limit': limit,
                    href: twitterLink }),
                _react2.default.createElement(
                    'div',
                    { className: 'view-all-link' },
                    _react2.default.createElement(
                        'a',
                        { href: twitterLink },
                        'Follow on Twitter'
                    )
                )
            );
        }
    }]);

    return Twitter;
}(_react2.default.Component);

exports.default = Twitter;