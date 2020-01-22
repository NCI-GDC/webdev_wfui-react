function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global window, jQuery, extLinkConfig, document */
import React from 'react';
import { IntlProvider, FormattedDate, FormattedTime } from 'react-intl';
import moment from 'moment-timezone';

var sameDay = function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

var FormattedDateRange =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormattedDateRange, _React$Component);

  function FormattedDateRange(props) {
    var _this;

    _classCallCheck(this, FormattedDateRange);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormattedDateRange).call(this));
    var isSameTime = false;
    var isSameDay = false;

    if (props.startDate && props.endDate) {
      var sd = new Date(props.startDate);
      var ed = new Date(props.endDate);
      isSameTime = props.startDate === props.endDate;
      isSameDay = sameDay(sd, ed);
    }

    _this.state = {
      isSameTime: isSameTime,
      isSameDay: isSameDay
    };
    return _this;
  }

  _createClass(FormattedDateRange, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          year = _this$props.year,
          month = _this$props.month,
          day = _this$props.day,
          withTime = _this$props.withTime,
          withTimeFull = _this$props.withTimeFull,
          onlyTime = _this$props.onlyTime,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate,
          toTxt = _this$props.toTxt,
          displayOnlyDate = _this$props.displayOnlyDate,
          displayFullDate = _this$props.displayFullDate,
          displayTimezone = _this$props.displayTimezone;
      var timezone = moment.tz(moment.tz.guess()).format('z');
      var _this$state = this.state,
          isSameDay = _this$state.isSameDay,
          isSameTime = _this$state.isSameTime;

      if (isSameDay && !isSameTime) {
        // Jan 13, 2020 5:00 PM to 6:00 PM (EST)
        return React.createElement(IntlProvider, null, React.createElement("div", {
          style: {
            display: 'inline'
          }
        }, React.createElement(FormattedDate, {
          value: startDate,
          year: year || 'numeric',
          month: month || 'long',
          day: day || 'numeric'
        }), withTime && ' ', (withTime || onlyTime) && React.createElement(FormattedTime, {
          value: startDate
        }), (withTime || onlyTime) && " ".concat(toTxt || 'to', " "), (withTime || onlyTime) && React.createElement(FormattedTime, {
          value: endDate
        }), displayTimezone && " (".concat(timezone, ")")));
      }

      if (startDate && endDate && !isSameTime) {
        // Jan 13, 2020 to Jan 14, 2020
        // Jan 13, 2020 5:00 PM (EST) to Jan 14, 2020 6:00 PM (EST) (Full)
        return React.createElement(IntlProvider, null, React.createElement("div", {
          style: {
            display: 'inline'
          }
        }, React.createElement(FormattedDate, {
          value: startDate,
          year: year || 'numeric',
          month: month || 'long',
          day: day || 'numeric'
        }), withTimeFull && ' ', withTimeFull && React.createElement(FormattedTime, {
          value: startDate
        }), withTimeFull && displayTimezone && " (".concat(timezone, ")"), " ".concat(toTxt || 'to', " "), React.createElement(FormattedDate, {
          value: endDate,
          year: year || 'numeric',
          month: month || 'long',
          day: day || 'numeric'
        }), withTimeFull && ' ', withTimeFull && React.createElement(FormattedTime, {
          value: endDate
        }), withTimeFull && displayTimezone && " (".concat(timezone, ")")));
      }

      if (isSameTime) {
        // Jan 13, 2020
        // Jan 13, 2020 5:00 PM (EST) || withTimeFull
        return React.createElement(IntlProvider, null, React.createElement("div", {
          style: {
            display: 'inline'
          }
        }, !onlyTime && React.createElement(FormattedDate, {
          value: startDate,
          year: year || 'numeric',
          month: month || 'long',
          day: day || 'numeric'
        }), withTimeFull && ' ', (withTimeFull || onlyTime) && React.createElement(FormattedTime, {
          value: startDate
        }), withTimeFull && displayTimezone && " (".concat(timezone, ")")));
      } // Jan 13, 2020
      // Jan 13, 2020 5:00 PM (EST)


      return React.createElement(IntlProvider, null, React.createElement("div", {
        style: {
          display: 'inline'
        }
      }, !onlyTime && React.createElement(FormattedDate, {
        value: startDate,
        year: year || 'numeric',
        month: month || 'long',
        day: day || 'numeric'
      }), withTime && ' ', (withTime || onlyTime) && React.createElement(FormattedTime, {
        value: startDate
      }), displayTimezone && " (".concat(timezone, ")")));
    }
  }]);

  return FormattedDateRange;
}(React.Component);

export default FormattedDateRange;