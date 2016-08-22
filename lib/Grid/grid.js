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

/**
 * Grid
 */
var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var expandColumn = _props.expandColumn;
      var label = _props.label;
      var description = _props.description;
      var children = _props.children;
      var columnNumber = _props.columnNumber;
      var errors = _props.errors;

      var last = children.length - children.length % columnNumber;

      //check error flag for default
      var errorClassName = "";
      if (errors) {
        errorClassName = 'wfui-grid__main--error';
      }

      //Render rows and columns ( except last row if number of columns is different from columnNumber)
      //==========
      var grid,
          grid_rows = [[]],
          index = 0;
      children.map(function (child, i) {
        if (expandColumn && i >= last) return;
        if (i != 0 && i % columnNumber == 0) {
          grid_rows[++index] = [];
        }
        grid_rows[index].push(child);
      });
      grid = _react2.default.createElement(
        'div',
        { className: "wfui-grid__container" },
        grid_rows.map(function (row, i) {
          return _react2.default.createElement(
            'div',
            { className: 'wfui-grid__row', key: i },
            row.map(function (child, j) {
              var className = "wfui-grid__column wfui-grid--col-" + columnNumber;
              return _react2.default.createElement(
                'div',
                { className: className, key: j },
                child
              );
            })
          );
        })
      ); //==========

      if (expandColumn) {
        //Render last row (in case last row has different number of columns)
        var grid_last,
            grid_rows_last = [];
        children.map(function (child, i) {
          if (i >= last) {
            grid_rows_last.push(child);
          }
        });
        grid_last = _react2.default.createElement(
          'div',
          { className: "wfui-grid__container wfui-grid__container--last" },
          _react2.default.createElement(
            'div',
            { className: 'wfui-grid__row' },
            grid_rows_last.map(function (child, i) {
              var className = "wfui-grid__column wfui-grid--col-" + grid_rows_last.length;
              return _react2.default.createElement(
                'div',
                { className: className, key: i },
                child
              );
            })
          )
        );
      } //==========

      return _react2.default.createElement(
        'div',
        { className: 'wfui-grid' },
        _react2.default.createElement('label', { className: 'wfui-grid__label', dangerouslySetInnerHTML: { __html: label.replace(/\n/g, "<br/>") } }),
        _react2.default.createElement(
          'div',
          { className: 'wfui-grid__description' },
          description
        ),
        _react2.default.createElement(
          'div',
          { className: "wfui-grid__main " + errorClassName },
          grid,
          grid_last
        )
      );
    }
  }]);

  return Grid;
}(_react.Component);

/**
 * Property types
 */


Grid.propTypes = {
  label: _react2.default.PropTypes.string,
  description: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  columnNumber: _react2.default.PropTypes.number,
  errors: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool])
};
Grid.defaultProps = {
  label: '',
  description: '',
  columnNumber: 1,
  errors: '',
  expandColumn: false
};

exports.default = Grid;