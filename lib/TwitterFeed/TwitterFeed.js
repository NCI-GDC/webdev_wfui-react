'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TwitterFeed = function (_React$Component) {
    _inherits(TwitterFeed, _React$Component);

    function TwitterFeed(props) {
        _classCallCheck(this, TwitterFeed);

        /* Dynamically insert Twitter widget into head of page */

        /* This page nees access to webpage globals. */
        /* eslint-disable */
        var script = document.createElement('script');
        script.src = '//platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);
        /* eslint-enable */

        return _possibleConstructorReturn(this, (TwitterFeed.__proto__ || Object.getPrototypeOf(TwitterFeed)).call(this, props));
    }

    _createClass(TwitterFeed, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                twitterAccount = _props.twitterAccount,
                limit = _props.limit,
                width = _props.width,
                height = _props.height,
                language = _props.language;

            var urlSafeTwitter = encodeURIComponent(twitterAccount);
            var twitterLink = 'https://twitter.com/' + urlSafeTwitter;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    {
                        width: width,
                        height: height,
                        'data-tweet-limit': limit,
                        lang: language,
                        className: 'twitter-timeline',
                        'data-dnt': 'true',
                        'data-chrome': 'noheader nofooter',
                        href: twitterLink
                    },
                    '\xA0'
                )
            );
        }
    }]);

    return TwitterFeed;
}(_react2.default.Component);

TwitterFeed.propTypes = {
    twitterAccount: _react2.default.PropTypes.string.isRequired,
    limit: _react2.default.PropTypes.number,
    width: _react2.default.PropTypes.number,
    height: _react2.default.PropTypes.number,
    language: _react2.default.PropTypes.string
};

TwitterFeed.defaultProps = {
    limit: 5,
    language: 'en',
    width: 300
};

exports.default = TwitterFeed;