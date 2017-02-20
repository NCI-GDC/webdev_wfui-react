'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DrawerButton = require('../Drawer/DrawerButton');

var _DrawerButton2 = _interopRequireDefault(_DrawerButton);

var _DefaultGroupsItem = require('./DefaultGroupsItem');

var _DefaultGroupsItem2 = _interopRequireDefault(_DefaultGroupsItem);

var _DefaultFooterItem = require('./DefaultFooterItem');

var _DefaultFooterItem2 = _interopRequireDefault(_DefaultFooterItem);

var _Spinner = require('../Spinner/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultSpinner = _react2.default.createElement(
    'div',
    { className: 'groups-drawer', style: { width: '100px', height: '50px' } },
    _react2.default.createElement(_Spinner2.default, { type: 1, fontSize: '10', margin: '40px' })
);

var GroupsDrawer = function (_Component) {
    _inherits(GroupsDrawer, _Component);

    function GroupsDrawer() {
        _classCallCheck(this, GroupsDrawer);

        return _possibleConstructorReturn(this, (GroupsDrawer.__proto__ || Object.getPrototypeOf(GroupsDrawer)).apply(this, arguments));
    }

    _createClass(GroupsDrawer, [{
        key: 'renderGroups',
        value: function renderGroups() {
            var _props = this.props,
                groups = _props.data.groups,
                groupsItemFormat = _props.groupsItemFormat,
                groupsContainer = _props.groupsContainer;

            var groupsComponent = groups.map(function (group, idx) {
                return (0, _react.cloneElement)(groupsItemFormat, _extends({
                    key: idx
                }, group));
            });
            return (0, _react.cloneElement)(groupsContainer, { className: 'groups-drawer-body', children: groupsComponent });
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var _props2 = this.props,
                footer = _props2.data.footer,
                footerItemFormat = _props2.footerItemFormat,
                footerContainer = _props2.footerContainer;

            var footerComponent = footer.map(function (item, idx) {
                return (0, _react.cloneElement)(footerItemFormat, _extends({
                    key: idx
                }, item));
            });

            return _react2.default.createElement(
                'ul',
                { className: 'groups-drawer-footer links-list--primary' },
                (0, _react.cloneElement)(footerContainer, { children: footerComponent })
            );
        }
    }, {
        key: 'renderPopover',
        value: function renderPopover() {
            var _props$data = this.props.data,
                groups = _props$data.groups,
                footer = _props$data.footer;

            return _react2.default.createElement(
                'div',
                { className: 'groups-drawer' },
                groups && groups.length > 0 ? this.renderGroups() : null,
                footer && footer.length > 0 ? this.renderFooter() : null
            );
        }
    }, {
        key: 'renderSpinner',
        value: function renderSpinner() {
            return this.props.spinnerFormat;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                data = _props3.data,
                props = _objectWithoutProperties(_props3, ['data']);

            return _react2.default.createElement(
                _DrawerButton2.default,
                props,
                data && Object.keys(data).length > 0 ? this.renderPopover() : this.renderSpinner()
            );
        }
    }]);

    return GroupsDrawer;
}(_react.Component);

GroupsDrawer.propTypes = _extends({
    popoverTitle: _react.PropTypes.string,
    data: _react.PropTypes.shape({
        groups: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            icon: _react.PropTypes.string.isRequired,
            title: _react.PropTypes.string.isRequired,
            link: _react.PropTypes.string.isRequired
        })),
        footer: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            title: _react.PropTypes.string.isRequired,
            link: _react.PropTypes.string.isRequired
        }))
    }),
    spinnerFormat: _react.PropTypes.element,
    groupsItemFormat: _react.PropTypes.element,
    footerItemFormat: _react.PropTypes.element,
    groupsContainer: _react.PropTypes.element,
    footerContainer: _react.PropTypes.element
}, _DrawerButton2.default.propTypes);

GroupsDrawer.defaultProps = {
    bsStyle: 'link',
    title: '',
    isIcon: true,
    icon: 'th',
    image: null,
    useCaret: false,
    placement: 'bottom',
    popoverTitle: 'MY GROUPS',
    groupsContainer: _react2.default.createElement('div', null),
    footerContainer: _react2.default.createElement('li', { className: 'list-inline' }),
    spinnerFormat: defaultSpinner,
    groupsItemFormat: _react2.default.createElement(_DefaultGroupsItem2.default, null),
    footerItemFormat: _react2.default.createElement(_DefaultFooterItem2.default, null)
};

exports.default = GroupsDrawer;