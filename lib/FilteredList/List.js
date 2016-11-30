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

var List = function (_React$Component) {
    _inherits(List, _React$Component);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                itemDisplay = _props.itemDisplay,
                data = _props.data,
                pageSize = _props.pageSize,
                currentPage = _props.currentPage,
                container = _props.container,
                onDisplay = _props.onDisplay,
                onNumOfListChange = _props.onNumOfListChange;

            /* Calculates the list of articles that should be displayed on the current page */

            var activeData = [];
            var numArticles = data ? data.length : 0;

            var startingArticle = pageSize * (currentPage - 1);
            var lastArticle = Math.min(startingArticle + pageSize, numArticles);

            for (var i = startingArticle; i < lastArticle; i += 1) {
                activeData.push(data[i]);
            }

            /* onDisplay is provided for cases that the client needs to see
            * the range of articles being displayed */
            onDisplay({ starting: startingArticle, last: lastArticle });

            /* New article object with data injected into it. */
            var itemDisplays = activeData.map(function (item, idx) {
                return _react2.default.cloneElement(itemDisplay, Object.assign({}, item, { key: idx, idx: idx }));
            });

            /* Return number of item. Put here because List handles pagination */
            onNumOfListChange(itemDisplays.length);

            /* Populates the container element passed to this with the items */
            var populatedContainer = _react2.default.cloneElement(container, { children: itemDisplays });
            return populatedContainer;
        }
    }]);

    return List;
}(_react2.default.Component);

List.propTypes = {
    itemDisplay: _react2.default.PropTypes.element.isRequired,
    data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.any).isRequired,
    pageSize: _react2.default.PropTypes.number,
    currentPage: _react2.default.PropTypes.number,
    container: _react2.default.PropTypes.element,
    onDisplay: _react2.default.PropTypes.func,
    onNumOfListChange: _react2.default.PropTypes.func
};

exports.default = List;