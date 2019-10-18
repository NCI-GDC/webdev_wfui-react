function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { FormattedHTMLMessage, FormattedNumber } from 'react-intl';

var dateToString = function dateToString(date) {
  var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  return "".concat(months[date.getMonth()], " ").concat(date.getDate());
};

var isCurrent = function isCurrent(startDate, endDate) {
  var date = new Date();
  return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
};

var RenderFee =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RenderFee, _React$Component);

  function RenderFee() {
    _classCallCheck(this, RenderFee);

    return _possibleConstructorReturn(this, _getPrototypeOf(RenderFee).apply(this, arguments));
  }

  _createClass(RenderFee, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fee = _this$props.fee,
          currency = _this$props.currency,
          feeIntlId = _this$props.feeIntlId;
      return React.createElement("td", {
        className: classNames('event-price', {
          current: fee && isCurrent(fee.start_date, fee.end_date)
        }),
        "data-tip": true,
        "data-for": fee && fee.description ? 'tool-description' : ''
      }, fee && fee.description && React.createElement(ReactTooltip, {
        id: "tool-description",
        className: "event-fee-tooltip",
        type: "dark",
        effect: "solid",
        delayHide: 100
      }, React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: fee.description
        }
      })), fee && fee.price !== undefined && React.createElement("b", null, React.createElement(FormattedNumber, {
        style: "currency",
        currency: currency,
        value: fee.price >= 0 ? fee.price : 0
      })), fee && fee.start_date && React.createElement(FormattedHTMLMessage, {
        id: feeIntlId,
        defaultMessage: " {tax, select, HST { + HST }}<br/>(before {end_date})",
        values: {
          tax: fee.taxes,
          end_date: "".concat(dateToString(fee.end_date), ", ").concat(fee.end_date.getFullYear())
        }
      }));
    }
  }]);

  return RenderFee;
}(React.Component);

RenderFee.propTypes = {
  fee: PropTypes.object,
  currency: PropTypes.string,
  feeIntlId: PropTypes.string
};
RenderFee.defaultProps = {
  currency: 'CAD',
  feeIntlId: 'admin_form_builder.question_type.fee.fee_text'
};
export default RenderFee;