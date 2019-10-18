function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint react/prop-types : 0 */

/* global document */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { FormGroup, ControlLabel, HelpBlock } from '../index';
import RenderFee from './RenderFee';

var renderEventSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderEventSelect, _React$Component);

  function renderEventSelect() {
    var _this;

    _classCallCheck(this, renderEventSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderEventSelect).call(this));
    _this.state = {
      checked: true
    };
    _this.onHandleClick = _this.onHandleClick.bind(_assertThisInitialized(_this));
    _this.isChecked = _this.isChecked.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(renderEventSelect, [{
    key: "isChecked",
    value: function isChecked(event) {
      var _this2 = this;

      var checked = event.fees.reduce(function (result, fee) {
        if (result) return result;

        var feeProps = _.get(_this2.props, fee.name);

        if (feeProps && feeProps.input && feeProps.input.value) {
          return true;
        }

        return false;
      }, false);
      return checked;
    }
  }, {
    key: "onHandleClick",
    value: function onHandleClick(e, event) {
      var disabled = this.props.disabled;
      e.stopPropagation();

      if (!disabled && event.eventStatus !== 'close') {
        var _this$props = this.props,
            name = _this$props.name,
            changeFieldValue = _this$props.changeFieldValue;
        this.isChecked(event);

        if (!this.isChecked(event)) {
          event.fees.forEach(function (fee) {
            changeFieldValue("".concat(fee.name), true);
          });
        } else {
          event.fees.forEach(function (fee) {
            changeFieldValue("".concat(fee.name), false);
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          disabled = _this$props2.disabled,
          preview = _this$props2.preview,
          events = _this$props2.events,
          label = _this$props2.label,
          required = _this$props2.required,
          help = _this$props2.help,
          globalError = _this$props2.globalError,
          input = _this$props2.input,
          name = _this$props2.name,
          names = _this$props2.names,
          feeCategories = _this$props2.feeCategories,
          eventFullLabel = _this$props2.eventFullLabel;
      var anyTouched = false;
      var allPristine = true;

      if (names && names.length) {
        names.forEach(function (name) {
          var props = _.get(_this3.props, name);

          anyTouched = anyTouched || props.meta.touched;
          allPristine = allPristine && props.meta.pristine;
        });
      }

      if (!events || events.length === 0) return null;
      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': globalError
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        })
      }, React.createElement(FormGroup, {
        className: "wfui-form-field wfui-table-event",
        validationState: (!allPristine || anyTouched) && globalError ? 'error' : null
      }, React.createElement("div", {
        className: "wfui-table"
      }, React.createElement("div", null, events.map(function (event, i) {
        var needToolTip = event.eventStatusText && event.eventStatusText[event.eventStatus];

        if (needToolTip) {
          return React.createElement(ReactTooltip, {
            key: i,
            id: "tool-".concat(event.eventStatus),
            className: "event-group-tooltip",
            type: "dark",
            effect: "solid",
            delayHide: 100
          }, React.createElement("div", {
            dangerouslySetInnerHTML: {
              __html: event.eventStatusText[event.eventStatus]
            }
          }));
        }
      }), React.createElement("table", {
        className: "table table-striped"
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
        colSpan: disabled ? '1' : '2'
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, ' ', "*"))), feeCategories.map(function (feeCat, i) {
        return React.createElement("th", {
          key: i,
          className: classNames('event-price', "category-".concat(feeCat.category))
        }, feeCat.title);
      }))), React.createElement("tbody", null, events.map(function (event, i) {
        var isClosed = event.eventStatus === 'close';
        if (preview && !_this3.isChecked(event)) return null;
        var needToolTip = event.eventStatusText && event.eventStatusText[event.eventStatus];
        return React.createElement("tr", {
          onClick: function onClick(e) {
            return _this3.onHandleClick(e, event);
          },
          key: i,
          className: "".concat(classNames({
            acitve: _this3.isChecked(event),
            disabled: disabled,
            preview: preview
          })).concat(event.eventStatus ? " event-".concat(event.eventStatus) : '')
        }, !disabled && React.createElement("td", {
          className: "event-checkbox"
        }, React.createElement("div", {
          className: "wfui-selection checkbox"
        }, React.createElement("input", {
          type: "checkbox",
          className: "wfui-selection__input-checkbox",
          checked: _this3.isChecked(event),
          onChange: function onChange(e) {
            return _this3.onHandleClick(e, event);
          },
          disabled: isClosed
        }))), React.createElement("td", {
          className: "event-details",
          "data-tip": true,
          "data-for": needToolTip ? "tool-".concat(event.eventStatus) : ''
        }, React.createElement("b", {
          className: "event-title"
        }, event.title), React.createElement("div", {
          className: "event-description",
          dangerouslySetInnerHTML: {
            __html: event.description
          }
        }), event.eventStatus === 'full' && React.createElement("span", {
          className: "event-full-label"
        }, eventFullLabel)), feeCategories.map(function (feeCat, i) {
          var fee = event.fees.find(function (fee) {
            return fee.variable.lastIndexOf(feeCat.category, 0) === 0;
          });
          return React.createElement(RenderFee, {
            key: i,
            fee: fee,
            currency: 'CAD',
            feeIntlId: "admin_form_builder.question_type.fee.fee_text"
          });
        }));
      }))))), (!allPristine || anyTouched) && React.createElement(HelpBlock, null, ' ', globalError && React.createElement("span", null, globalError), ' '), help && !preview && React.createElement("div", {
        className: "wfui-form-help",
        dangerouslySetInnerHTML: {
          __html: help
        }
      })));
    }
  }]);

  return renderEventSelect;
}(React.Component);

renderEventSelect.propTypes = {
  eventFullLabel: PropTypes.string
};
renderEventSelect.defaultProps = {
  eventFullLabel: '(Full)'
};
export default renderEventSelect;