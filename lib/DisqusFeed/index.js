function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';

var DisqusFeed =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DisqusFeed, _React$Component);

  function DisqusFeed(props) {
    _classCallCheck(this, DisqusFeed);

    /* inserts disqus code into head or body of page */
    var disqusConfig = document.createElement('script');
    disqusConfig.innerText = "var disqus_config = function () { this.page.url = '".concat(props.pageUrl, "'; this.page.identifier = '").concat(props.pageId, "'; };");
    (document.body || document.head).appendChild(disqusConfig);
    var disqusScript = document.createElement('script');
    disqusScript.src = "https://".concat(props.siteName, ".disqus.com/embed.js");
    disqusScript.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(disqusScript);
    return _possibleConstructorReturn(this, _getPrototypeOf(DisqusFeed).call(this, props));
  }

  _createClass(DisqusFeed, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "disqus_thread"
      });
    }
  }]);

  return DisqusFeed;
}(React.Component);

DisqusFeed.propTypes = {
  pageUrl: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired
};
export default DisqusFeed;
/* pageUrl should be the canonical URL for the current page
   siteName is a name registered under your disqus account */