function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
/* Calculates the list of articles that should be displayed on the current page */

var calcActiveData = function calcActiveData(_ref) {
  var data = _ref.data,
      pageSize = _ref.pageSize,
      currentPage = _ref.currentPage;
  var activeData = [];
  var numArticles = data ? data.length : 0;
  var startingArticle = pageSize * (currentPage - 1);
  var lastArticle = Math.min(startingArticle + pageSize, numArticles);

  for (var i = startingArticle; i < lastArticle; i += 1) {
    activeData.push(data[i]);
  }

  return {
    activeData: activeData,
    startingArticle: startingArticle,
    lastArticle: lastArticle
  };
};

var List =
/*#__PURE__*/
function (_React$Component) {
  _inherits(List, _React$Component);

  function List(props) {
    var _this;

    _classCallCheck(this, List);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(List).call(this, props));
    _this.state = {
      numOfItems: 0,
      startingArticle: 0,
      lastArticle: 0
    };
    return _this;
  }

  _createClass(List, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          onListDidMount = _this$props.onListDidMount,
          onNumOfListChange = _this$props.onNumOfListChange,
          data = _this$props.data;
      onListDidMount(data); // deprecate: use onDisplay instead.

      this.updateStatus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          itemDisplay = _this$props2.itemDisplay,
          data = _this$props2.data,
          pageSize = _this$props2.pageSize,
          currentPage = _this$props2.currentPage,
          container = _this$props2.container;
      /* New article object with data injected into it. */

      var _calcActiveData = calcActiveData(this.props),
          activeData = _calcActiveData.activeData;

      var itemDisplays = activeData.map(function (item, idx) {
        return React.cloneElement(itemDisplay, _extends({}, item, {
          key: idx,
          idx: idx
        }));
      });
      /* Populates the container element passed to this with the items */

      var populatedContainer = React.cloneElement(container, {
        children: itemDisplays
      });
      return populatedContainer;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          onDisplay = _this$props3.onDisplay,
          onNumOfListChange = _this$props3.onNumOfListChange,
          data = _this$props3.data;

      var _calcActiveData2 = calcActiveData(this.props),
          activeData = _calcActiveData2.activeData,
          startingArticle = _calcActiveData2.startingArticle,
          lastArticle = _calcActiveData2.lastArticle;
      /* Only setState and invoke callbacks when the state is changed to avoid infinite loop */


      if (activeData.length !== this.state.numOfItems || startingArticle !== this.state.startingArticle || lastArticle !== this.state.lastArticle || prevProps.data.length !== data.length) {
        this.updateStatus();
      }
    }
  }, {
    key: "updateStatus",
    value: function updateStatus() {
      var _this$props4 = this.props,
          onDisplay = _this$props4.onDisplay,
          onNumOfListChange = _this$props4.onNumOfListChange,
          data = _this$props4.data;

      var _calcActiveData3 = calcActiveData(this.props),
          activeData = _calcActiveData3.activeData,
          startingArticle = _calcActiveData3.startingArticle,
          lastArticle = _calcActiveData3.lastArticle;

      this.setState({
        numOfItems: activeData.length,
        startingArticle: startingArticle,
        lastArticle: lastArticle
      });
      /* Return number of articles. */

      onNumOfListChange(activeData.length); // deprecated: use onDisplay instead.

      /* onDisplay is provided for cases that the client needs to see
       * the range of articles being displayed */

      onDisplay({
        starting: startingArticle,
        last: lastArticle,
        numListed: activeData.length,
        numTotal: data.length,
        rawData: data
      });
    }
  }]);

  return List;
}(React.Component);

List.propTypes = {
  itemDisplay: PropTypes.element.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  container: PropTypes.element,
  onDisplay: PropTypes.func,
  onNumOfListChange: PropTypes.func,
  onListDidMount: PropTypes.func
};
export default List;