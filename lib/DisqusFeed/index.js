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

var DisqusFeed = function (_React$Component) {
    _inherits(DisqusFeed, _React$Component);

    function DisqusFeed(props) {
        _classCallCheck(this, DisqusFeed);

        /* inserts disqus code into head or body of page */

        var disqusConfig = document.createElement('script');
        disqusConfig.innerText = 'var disqus_config = function () { this.page.url = \'' + props.pageUrl + '\'; this.page.identifier = \'' + props.pageId + '\'; };';
        (document.body || document.head).appendChild(disqusConfig);

        var disqusScript = document.createElement('script');
        disqusScript.src = 'https://' + props.siteName + '.disqus.com/embed.js';
        disqusScript.setAttribute('data-timestamp', +new Date());
        document.body.appendChild(disqusScript);

        return _possibleConstructorReturn(this, (DisqusFeed.__proto__ || Object.getPrototypeOf(DisqusFeed)).call(this, props));
    }

    _createClass(DisqusFeed, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { id: 'disqus_thread' });
        }
    }]);

    return DisqusFeed;
}(_react2.default.Component);

DisqusFeed.propTypes = {
    pageUrl: _react2.default.PropTypes.string.isRequired,
    pageId: _react2.default.PropTypes.string.isRequired,
    siteName: _react2.default.PropTypes.string.isRequired
};

exports.default = DisqusFeed;

/* pageUrl should be the canonical URL for the current page
   siteName is a name registered under your disqus account */