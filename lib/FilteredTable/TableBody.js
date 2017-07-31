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

var TableBody = function (_React$Component) {
   _inherits(TableBody, _React$Component);

   function TableBody() {
      _classCallCheck(this, TableBody);

      return _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).apply(this, arguments));
   }

   _createClass(TableBody, [{
      key: 'render',
      value: function render() {
         var _props = this.props,
             itemFormat = _props.itemFormat,
             data = _props.data,
             pageSize = _props.pageSize,
             currentPage = _props.currentPage,
             selectable = _props.selectable,
             onCheck = _props.onCheck,
             checks = _props.checks;

         /* Calculates the Table of articles that should be displayed on the current page */

         var activeData = [];
         var numArticles = data ? data.length : 0;
         var startingArticle = pageSize * (currentPage - 1);

         for (var i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
            activeData.push(data[i]);
         }

         /* Form row using the provided data functions. */
         var itemDisplays = activeData.map(function (item, idx) {
            var rowItems = [];
            if (selectable) {
               rowItems.push(_react2.default.createElement(
                  'td',
                  { key: 'td_' + idx },
                  _react2.default.createElement('input', {
                     type: 'checkbox',
                     checked: item.checked,
                     onChange: function onChange() {
                        return onCheck(item.idx);
                     }
                  })
               ));
            }
            itemFormat.forEach(function (cell, rowIdx) {
               rowItems.push(_react2.default.createElement(
                  'td',
                  { key: 'td_' + idx + '_' + rowIdx, className: cell.className },
                  cell.display(item)
               ));
            });
            return _react2.default.createElement(
               'tr',
               { key: 'td_' + idx, className: (idx + 1) % 2 === 0 ? 'even' : 'odd' },
               rowItems
            );
         });

         return _react2.default.createElement(
            'tbody',
            null,
            itemDisplays
         );
      }
   }]);

   return TableBody;
}(_react2.default.Component);

TableBody.propTypes = {
   data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.any).isRequired,
   pageSize: _react2.default.PropTypes.number.isRequired,
   currentPage: _react2.default.PropTypes.number.isRequired,
   selectable: _react2.default.PropTypes.bool.isRequired,
   itemFormat: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired,
   onCheck: _react2.default.PropTypes.func.isRequired,
   checks: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.bool).isRequired
};

exports.default = TableBody;