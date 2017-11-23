'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _LoadingComponent = require('../LoadingComponent/LoadingComponent');

var _LoadingComponent2 = _interopRequireDefault(_LoadingComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var CascadingPaneSubView = function (_React$Component) {
    _inherits(CascadingPaneSubView, _React$Component);

    function CascadingPaneSubView(props) {
        _classCallCheck(this, CascadingPaneSubView);

        var _this = _possibleConstructorReturn(this, (CascadingPaneSubView.__proto__ || Object.getPrototypeOf(CascadingPaneSubView)).call(this, props));

        _this.state = {
            navSelect: props.cascNav || '',
            mainSelect: props.cascSelect || '',
            fetchedSub: props.fetchedSubView,
            fetchedMain: props.fetchedMainView
        };
        return _this;
    }

    _createClass(CascadingPaneSubView, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                cascSelect = _props.cascSelect,
                getCascadingSubView = _props.getCascadingSubView;

            if (cascSelect && getCascadingSubView) getCascadingSubView(cascSelect);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props2 = this.props,
                cascNav = _props2.cascNav,
                cascSelect = _props2.cascSelect,
                fetchedMainView = _props2.fetchedMainView,
                fetchedSubView = _props2.fetchedSubView,
                getCascadingSubView = _props2.getCascadingSubView;

            var newState = {};
            if (fetchedMainView !== nextProps.fetchedMainView) {
                newState.fetchedMain = nextProps.fetchedMainView;
            }
            if (fetchedSubView !== nextProps.fetchedSubView) {
                newState.fetchedSub = nextProps.fetchedSubView;
            }
            if (cascNav) {
                if (!nextProps.cascNav || cascNav !== nextProps.cascNav) {
                    newState.navSelect = nextProps.cascNav || '';
                }
            } else if (nextProps.cascNav) {
                newState.navSelect = nextProps.cascNav;
            }
            if (cascSelect) {
                if (!nextProps.cascSelect || cascSelect !== nextProps.cascSelect) {
                    newState.navSelect = nextProps.cascSelect || '';
                    if (nextProps.cascSelect && getCascadingSubView) {
                        getCascadingSubView(nextProps.cascSelect);
                    }
                }
            } else if (nextProps.cascSelect) {
                newState.navSelect = nextProps.cascSelect;
                if (getCascadingSubView) getCascadingSubView(nextProps.cascSelect);
            }
            if (Object.keys(newState).length > 0) {
                this.setState(_extends({}, newState));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                key = _props3.key,
                className = _props3.className,
                getCascadingSubView = _props3.getCascadingSubView,
                reloadMainView = _props3.reloadMainView,
                subViewFetch = _props3.subViewFetch,
                mainViewFetch = _props3.mainViewFetch,
                groupData = _props3.groupData,
                memberData = _props3.memberData,
                data = _props3.data,
                contentDisplay = _props3.contentDisplay;
            var _state = this.state,
                navSelect = _state.navSelect,
                mainSelect = _state.mainSelect,
                fetchedSub = _state.fetchedSub,
                fetchedMain = _state.fetchedMain;


            if (getCascadingSubView) {
                return _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)(className, 'cascading-pane-subview'), key: key },
                    _react2.default.createElement(
                        _LoadingComponent2.default,
                        mainViewFetch,
                        _react2.default.createElement(
                            _LoadingComponent2.default,
                            subViewFetch,
                            fetchedSub && fetchedMain && _react2.default.cloneElement(contentDisplay, {
                                groupData: groupData,
                                memberData: memberData,
                                data: data,
                                reloadMainView: reloadMainView,
                                reloadSubView: getCascadingSubView,
                                navSelect: navSelect,
                                mainSelect: mainSelect
                            })
                        )
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'cascading-pane-subview'), key: key },
                _react2.default.createElement(
                    _LoadingComponent2.default,
                    mainViewFetch,
                    fetchedMain && _react2.default.cloneElement(contentDisplay, {
                        groupData: groupData,
                        memberData: memberData,
                        data: data,
                        reloadMainView: reloadMainView,
                        navSelect: navSelect,
                        mainSelect: mainSelect
                    })
                )
            );
        }
    }]);

    return CascadingPaneSubView;
}(_react2.default.Component);

CascadingPaneSubView.propTypes = {
    role: _propTypes2.default.string,
    key: _propTypes2.default.number,
    groupData: _propTypes2.default.object,
    memberData: _propTypes2.default.object,
    data: _propTypes2.default.object,
    getCascadingSubView: _propTypes2.default.func,
    subViewFetch: _propTypes2.default.shape({
        status: _propTypes2.default.string,
        isFetching: _propTypes2.default.bool
    }),
    mainViewFetch: _propTypes2.default.shape({
        status: _propTypes2.default.string,
        isFetching: _propTypes2.default.bool
    }),
    fetchedSubView: _propTypes2.default.bool,
    fetchedMainView: _propTypes2.default.bool,
    cascNav: _propTypes2.default.string,
    cascSelect: _propTypes2.default.string,
    reloadMainView: _propTypes2.default.func,

    className: _propTypes2.default.string,
    contentDisplay: _propTypes2.default.element.isRequired,
    tableClassName: _propTypes2.default.string
};

CascadingPaneSubView.defaultProps = {
    role: 'subView',
    key: 2,
    groupData: {},
    memberData: {},
    data: {},
    subViewFetch: {
        status: '',
        isFetching: false
    },
    mainViewFetch: {
        status: '',
        isFetching: false
    },
    fetchedSubView: false,
    fetchedMainView: false,
    cascNav: '',
    cascSelect: '',
    reloadMainView: function reloadMainView(f) {
        return f;
    },

    className: ''
};

exports.default = CascadingPaneSubView;