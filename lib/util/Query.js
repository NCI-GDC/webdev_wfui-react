'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactApollo = require('react-apollo');

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../');

var _selectors = require('./wfuiFetch/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomQuery = function (_React$Component) {
    _inherits(CustomQuery, _React$Component);

    function CustomQuery() {
        _classCallCheck(this, CustomQuery);

        return _possibleConstructorReturn(this, (CustomQuery.__proto__ || Object.getPrototypeOf(CustomQuery)).apply(this, arguments));
    }

    _createClass(CustomQuery, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                query = _props.query,
                fetchStatus = _props.fetchStatus;

            return _react2.default.createElement(
                _reactApollo.Query,
                { query: query },
                function (props) {
                    return _react2.default.createElement(
                        _.LoadingComponent,
                        fetchStatus,
                        children(props)
                    );
                }
            );
        }
    }]);

    return CustomQuery;
}(_react2.default.Component);

CustomQuery.propTypes = {
    query: _propTypes2.default.object,
    fetchStatus: _propTypes2.default.object
};

CustomQuery.defaultProps = {
    query: {
        definitions: []
    }
};

exports.default = (0, _reactRedux.connect)(function (state, props) {
    var opName = '';
    var definitions = props.query.definitions;

    var opDef = definitions.find(function (def) {
        return def && def.kind === 'OperationDefinition';
    });
    if (opDef) {
        opName = opDef.name && opDef.name.value;
    }
    return {
        fetchStatus: (0, _selectors.fetchSelector)(opName)(state) || {}
    };
})(CustomQuery);