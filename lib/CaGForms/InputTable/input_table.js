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
 * Input table
 */
var InputTable = function (_Component) {
  _inherits(InputTable, _Component);

  function InputTable() {
    _classCallCheck(this, InputTable);

    var _this = _possibleConstructorReturn(this, (InputTable.__proto__ || Object.getPrototypeOf(InputTable)).call(this));

    _this.state = {
      refs: ''
    };
    _this.onHandleClick = _this.onHandleClick.bind(_this);
    return _this;
  }

  _createClass(InputTable, [{
    key: 'onHandleClick',
    value: function onHandleClick(e) {
      var stopPropagation = this.props.stopPropagation;

      if (stopPropagation) e.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          fieldLabel = _props.fieldLabel,
          fieldType = _props.fieldType,
          description = _props.description,
          children = _props.children,
          className = _props.className;

      //Get the number of inputs

      this.numOfInputs = children.length;

      //Render input fields
      //==========
      var fields;
      if (children) {
        fields = _react2.default.createElement(
          'div',
          { className: 'wfui-input-table__form' },
          _react2.default.createElement('p', { className: 'wfui-input-table__label', dangerouslySetInnerHTML: { __html: fieldLabel.replace(/\n/g, "<br/>") } }),
          _react2.default.createElement(
            'ul',
            { className: 'wfui-input-table__ul', ref: 'allInputs' },
            children.map(function (field, i) {
              if (children.length - 1 > i) {
                var condition = _react2.default.createElement(
                  'span',
                  { className: 'wfui-input-table__condition' },
                  fieldType.toUpperCase()
                );
              }
              return _react2.default.createElement(
                'li',
                { key: i, className: 'wfui-input-table__li', ref: 'hello' },
                field,
                condition
              );
              this.numOfInputs = children.length;
            })
          )
        );
      } //==========

      return _react2.default.createElement(
        'div',
        { className: "wfui-input-table " + className ? className : "", onClick: this.onHandleClick },
        _react2.default.createElement('label', { dangerouslySetInnerHTML: { __html: label.replace(/\n/g, "<br/>") } }),
        description,
        fields
      );
    }
  }]);

  return InputTable;
}(_react.Component);

/**
 * Property types
 */


InputTable.propTypes = {
  label: _react2.default.PropTypes.string,
  fieldLabel: _react2.default.PropTypes.string,
  fieldType: _react2.default.PropTypes.oneOf(['and', 'or']),
  description: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  stopPropagation: _react2.default.PropTypes.bool
};
InputTable.defaultProps = {
  label: '',
  fieldLabel: '',
  fieldType: 'and',
  description: '',
  stopPropagation: false
};

exports.default = InputTable;