'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document */


var dateToString = function dateToString(date) {
    var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

    return months[date.getMonth()] + ' ' + date.getDate();
};

var isCurrent = function isCurrent(startDate, endDate) {
    var date = new Date();
    return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
};

var RenderFee = function (_React$Component) {
    _inherits(RenderFee, _React$Component);

    function RenderFee() {
        _classCallCheck(this, RenderFee);

        return _possibleConstructorReturn(this, (RenderFee.__proto__ || Object.getPrototypeOf(RenderFee)).apply(this, arguments));
    }

    _createClass(RenderFee, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                fee = _props.fee,
                currency = _props.currency,
                feeIntlId = _props.feeIntlId;

            return _react2.default.createElement(
                'td',
                {
                    className: (0, _classnames2.default)('event-price', {
                        current: fee && isCurrent(fee.start_date, fee.end_date)
                    })
                },
                fee && fee.price !== undefined && _react2.default.createElement(
                    'b',
                    null,
                    _react2.default.createElement(_reactIntl.FormattedNumber, {
                        style: 'currency',
                        currency: currency,
                        value: fee.price
                    })
                ),
                fee && fee.start_date && _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                    id: feeIntlId,
                    defaultMessage: ' {tax, select, HST { + HST }}<br/>(before {end_date})',
                    values: {
                        tax: fee.taxes,
                        end_date: dateToString(fee.end_date) + ', ' + fee.end_date.getFullYear()
                    }
                })
            );
        }
    }]);

    return RenderFee;
}(_react2.default.Component);

RenderFee.propTypes = {
    fee: _propTypes2.default.object,
    currency: _propTypes2.default.string,
    feeIntlId: _propTypes2.default.string
};

RenderFee.defaultProps = {
    currency: 'CAD',
    feeIntlId: 'admin_form_builder.question_type.fee.fee_text'
};

exports.default = RenderFee;