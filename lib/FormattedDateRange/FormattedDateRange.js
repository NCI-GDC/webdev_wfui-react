'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window, jQuery, extLinkConfig, document */


var sameDay = function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

var FormattedDateRange = function (_React$Component) {
    _inherits(FormattedDateRange, _React$Component);

    function FormattedDateRange(props) {
        _classCallCheck(this, FormattedDateRange);

        var _this = _possibleConstructorReturn(this, (FormattedDateRange.__proto__ || Object.getPrototypeOf(FormattedDateRange)).call(this));

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
        key: 'render',
        value: function render() {
            var _props = this.props,
                year = _props.year,
                month = _props.month,
                day = _props.day,
                withTime = _props.withTime,
                withTimeFull = _props.withTimeFull,
                onlyTime = _props.onlyTime,
                startDate = _props.startDate,
                endDate = _props.endDate,
                toTxt = _props.toTxt,
                displayOnlyDate = _props.displayOnlyDate,
                displayFullDate = _props.displayFullDate,
                displayTimezone = _props.displayTimezone;

            var timezone = _momentTimezone2.default.tz(_momentTimezone2.default.tz.guess()).format('z');
            var _state = this.state,
                isSameDay = _state.isSameDay,
                isSameTime = _state.isSameTime;


            if (isSameDay && !isSameTime) {
                // Jan 13, 2020 5:00 PM to 6:00 PM (EST)
                return _react2.default.createElement(
                    _reactIntl.IntlProvider,
                    null,
                    _react2.default.createElement(
                        'div',
                        { style: { display: 'inline' } },
                        _react2.default.createElement(_reactIntl.FormattedDate, {
                            value: startDate,
                            year: year || 'numeric',
                            month: month || 'long',
                            day: day || 'numeric'
                        }),
                        withTime && ' ',
                        (withTime || onlyTime) && _react2.default.createElement(_reactIntl.FormattedTime, { value: startDate }),
                        (withTime || onlyTime) && ' ' + (toTxt || 'to') + ' ',
                        (withTime || onlyTime) && _react2.default.createElement(_reactIntl.FormattedTime, { value: endDate }),
                        displayTimezone && ' (' + timezone + ')'
                    )
                );
            }
            if (startDate && endDate && !isSameTime) {
                // Jan 13, 2020 to Jan 14, 2020
                // Jan 13, 2020 5:00 PM (EST) to Jan 14, 2020 6:00 PM (EST) (Full)
                return _react2.default.createElement(
                    _reactIntl.IntlProvider,
                    null,
                    _react2.default.createElement(
                        'div',
                        { style: { display: 'inline' } },
                        _react2.default.createElement(_reactIntl.FormattedDate, {
                            value: startDate,
                            year: year || 'numeric',
                            month: month || 'long',
                            day: day || 'numeric'
                        }),
                        withTimeFull && ' ',
                        withTimeFull && _react2.default.createElement(_reactIntl.FormattedTime, { value: startDate }),
                        withTimeFull && displayTimezone && ' (' + timezone + ')',
                        ' ' + (toTxt || 'to') + ' ',
                        _react2.default.createElement(_reactIntl.FormattedDate, {
                            value: endDate,
                            year: year || 'numeric',
                            month: month || 'long',
                            day: day || 'numeric'
                        }),
                        withTimeFull && ' ',
                        withTimeFull && _react2.default.createElement(_reactIntl.FormattedTime, { value: endDate }),
                        withTimeFull && displayTimezone && ' (' + timezone + ')'
                    )
                );
            }
            if (isSameTime) {
                // Jan 13, 2020
                // Jan 13, 2020 5:00 PM (EST) || withTimeFull
                return _react2.default.createElement(
                    _reactIntl.IntlProvider,
                    null,
                    _react2.default.createElement(
                        'div',
                        { style: { display: 'inline' } },
                        !onlyTime && _react2.default.createElement(_reactIntl.FormattedDate, {
                            value: startDate,
                            year: year || 'numeric',
                            month: month || 'long',
                            day: day || 'numeric'
                        }),
                        withTimeFull && ' ',
                        (withTimeFull || onlyTime) && _react2.default.createElement(_reactIntl.FormattedTime, { value: startDate }),
                        withTimeFull && displayTimezone && ' (' + timezone + ')'
                    )
                );
            }
            // Jan 13, 2020
            // Jan 13, 2020 5:00 PM (EST)
            return _react2.default.createElement(
                _reactIntl.IntlProvider,
                null,
                _react2.default.createElement(
                    'div',
                    { style: { display: 'inline' } },
                    !onlyTime && _react2.default.createElement(_reactIntl.FormattedDate, {
                        value: startDate,
                        year: year || 'numeric',
                        month: month || 'long',
                        day: day || 'numeric'
                    }),
                    withTime && ' ',
                    (withTime || onlyTime) && _react2.default.createElement(_reactIntl.FormattedTime, { value: startDate }),
                    displayTimezone && ' (' + timezone + ')'
                )
            );
        }
    }]);

    return FormattedDateRange;
}(_react2.default.Component);

exports.default = FormattedDateRange;