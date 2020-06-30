function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingComponent } from '..';
import { fetchSelector } from './wfuiFetch/selectors';

var CustomQuery =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomQuery, _React$Component);

  function CustomQuery() {
    _classCallCheck(this, CustomQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomQuery).apply(this, arguments));
  }

  _createClass(CustomQuery, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          fetchStatus = _this$props.fetchStatus,
          onError = _this$props.onError;

      if (fetchStatus.status !== nextProps.fetchStatus.status && nextProps.fetchStatus.status === 'fail') {
        onError(nextProps.fetchStatus);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          fetchStatus = _this$props2.fetchStatus;
      return React.createElement(Query, this.props, function (props) {
        return React.createElement(LoadingComponent, fetchStatus, children(_extends({}, props, {
          fetchStatus: fetchStatus
        })));
      });
    }
  }]);

  return CustomQuery;
}(React.Component);

CustomQuery.propTypes = {
  query: PropTypes.object,
  fetchStatus: PropTypes.object,
  children: PropTypes.func,
  onError: PropTypes.func
};
CustomQuery.defaultProps = {
  query: {
    definitions: []
  },
  onError: function onError(f) {
    return f;
  }
};
export default connect(function (state, props) {
  var opName = '';
  var definitions = props.query.definitions;
  var opDef = definitions.find(function (def) {
    return def && def.kind === 'OperationDefinition';
  });

  if (opDef) {
    opName = opDef.name && opDef.name.value;
  }

  return {
    fetchStatus: fetchSelector(opName)(state) || {}
  };
})(CustomQuery);