'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormUserVerify = function (_React$Component) {
    _inherits(FormUserVerify, _React$Component);

    function FormUserVerify() {
        _classCallCheck(this, FormUserVerify);

        return _possibleConstructorReturn(this, (FormUserVerify.__proto__ || Object.getPrototypeOf(FormUserVerify)).apply(this, arguments));
    }

    _createClass(FormUserVerify, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                values = _props.values,
                verifyFormRegister = _props.verifyFormRegister,
                onVerified = _props.onVerified,
                onUnverified = _props.onUnverified,
                getConfig = _props.getConfig;

            verifyFormRegister(values, getConfig).then(function (_ref) {
                var res = _ref.res,
                    data = _ref.data;

                if (res.ok) {
                    onVerified(data);
                    return Promise.resolve(data);
                }
                return Promise.reject();
            }).catch(onUnverified);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);

    return FormUserVerify;
}(_react2.default.Component);

FormUserVerify.propTypes = {
    values: _propTypes2.default.object,
    onVerified: _propTypes2.default.func,
    onUnverified: _propTypes2.default.func,
    verifyFormRegister: _propTypes2.default.func,
    getConfig: _propTypes2.default.func
};
FormUserVerify.defaultProps = {
    onVerified: function onVerified(f) {
        return f;
    },
    onUnverified: function onUnverified(f) {
        return f;
    }
};

exports.default = (0, _reactRedux.connect)(function () {
    return {};
}, actions)(FormUserVerify);