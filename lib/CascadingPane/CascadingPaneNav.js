'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = require('react-bootstrap');

var _LoadingComponent = require('../LoadingComponent/LoadingComponent');

var _LoadingComponent2 = _interopRequireDefault(_LoadingComponent);

var _FilteredTable = require('../FilteredTable/FilteredTable');

var _FilteredTable2 = _interopRequireDefault(_FilteredTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var CascadingPaneNav = function (_React$Component) {
    _inherits(CascadingPaneNav, _React$Component);

    function CascadingPaneNav(props) {
        _classCallCheck(this, CascadingPaneNav);

        var _this = _possibleConstructorReturn(this, (CascadingPaneNav.__proto__ || Object.getPrototypeOf(CascadingPaneNav)).call(this, props));

        _this.state = {
            selected: props.cascNav || '',
            fetched: props.fetchedNav,
            dataWithClass: props.data ? props.data.map(function (item) {
                var newItem = JSON.parse(JSON.stringify(item));
                newItem.className = 'nav-item-' + item[props.itemIdField] + ' ' + (item[props.itemIdField] === props.cascNav ? 'active' : '');
                return newItem;
            }) : []
        };

        _this.onHandleClick = _this.onHandleClick.bind(_this);
        return _this;
    }

    _createClass(CascadingPaneNav, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props = this.props,
                fetchedNav = _props.fetchedNav,
                cascNav = _props.cascNav,
                data = _props.data;

            if (fetchedNav !== nextProps.fetchedNav) {
                this.setState({
                    fetched: nextProps.fetchedNav
                });
            }
            if (cascNav) {
                if (!nextProps.cascNav) {
                    window.location.href = window.location.href.split('?')[0] + '?cascNav=' + nextProps.data[0][nextProps.itemIdField];
                }
                if (cascNav !== nextProps.cascNav) {
                    this.setState({
                        selected: nextProps.cascNav || '',
                        dataWithClass: nextProps.data ? nextProps.data.map(function (item) {
                            var newItem = JSON.parse(JSON.stringify(item));
                            newItem.className = 'nav-item-' + item[nextProps.itemIdField] + ' ' + (item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : '');
                            return newItem;
                        }) : []
                    });
                }
            } else if (nextProps.cascNav) {
                this.setState({
                    selected: nextProps.cascNav,
                    dataWithClass: nextProps.data ? nextProps.data.map(function (item) {
                        var newItem = JSON.parse(JSON.stringify(item));
                        newItem.className = 'nav-item-' + item[nextProps.itemIdField] + ' ' + (item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : '');
                        return newItem;
                    }) : []
                });
            } else if (nextProps.data && nextProps.data.length > 0) {
                window.location.href = window.location.href.split('?')[0] + '?cascNav=' + nextProps.data[0][nextProps.itemIdField];
            }
            if (JSON.stringify(data) !== JSON.stringify(nextProps.data)) {
                this.setState({
                    dataWithClass: nextProps.data ? nextProps.data.map(function (item) {
                        var newItem = JSON.parse(JSON.stringify(item));
                        newItem.className = 'nav-item-' + item[nextProps.itemIdField] + ' ' + (item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : '');
                        return newItem;
                    }) : []
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _props2 = this.props,
                updateGroupSelect = _props2.updateGroupSelect,
                data = _props2.data,
                itemIdField = _props2.itemIdField;
            var selected = this.state.selected;

            if (prevProps.data.length === 0 && data.length > 0 || selected !== prevState.selected || JSON.stringify(data) !== JSON.stringify(prevProps.data)) {
                var groupSelected = data.filter(function (item) {
                    return item[itemIdField] === selected;
                });
                updateGroupSelect(groupSelected[0]);
            }
        }
    }, {
        key: 'onHandleClick',
        value: function onHandleClick(item) {
            var itemIdField = this.props.itemIdField;
            var selected = this.state.selected;


            if (selected !== item[itemIdField]) {
                window.location.href = window.location.href.split('?')[0] + '?cascNav=' + item[itemIdField];
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props3 = this.props,
                key = _props3.key,
                className = _props3.className,
                headerDisplay = _props3.headerDisplay,
                footerDisplay = _props3.footerDisplay,
                navFetch = _props3.navFetch,
                data = _props3.data,
                itemConfigDisplay = _props3.itemConfigDisplay,
                getCascadingNav = _props3.getCascadingNav,
                config = _props3.config,
                logoField = _props3.logoField,
                titleField = _props3.titleField,
                visibilityField = _props3.visibilityField;
            var _state = this.state,
                fetched = _state.fetched,
                dataWithClass = _state.dataWithClass;


            var navFormat = [];
            if (logoField) {
                navFormat.push({
                    name: 'Logo',
                    className: 'nav-group-logo',
                    display: function display(item) {
                        return _react2.default.createElement('img', {
                            role: 'presentation',
                            src: item[logoField],
                            className: 'cascading-nav-logo'
                        });
                    }
                });
            }
            navFormat.push({
                name: 'Title',
                className: 'nav-group-title',
                display: function display(item) {
                    return item[titleField];
                }
            });
            if (visibilityField) {
                navFormat.push({
                    name: 'Visibility',
                    className: 'nav-group-visibility',
                    display: function display(item) {
                        return item[visibilityField] ? '' : _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'eye-close', title: 'Only visible to CUD administrators' });
                    }
                });
            }
            if (itemConfigDisplay) {
                navFormat.push({
                    name: 'Actions',
                    className: 'nav-group-actions',
                    display: function display(item) {
                        return _react2.default.cloneElement(itemConfigDisplay, Object.assign({}, { item: item }, { updateNav: function updateNav() {
                                return getCascadingNav(config);
                            } }));
                    },
                    excludeRowClick: true
                });
            }

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'cascading-pane-nav'),
                    key: key
                },
                headerDisplay,
                _react2.default.createElement(
                    _LoadingComponent2.default,
                    navFetch,
                    _react2.default.createElement(
                        'div',
                        { className: 'cascading-pane-nav-list' },
                        fetched && !data && _react2.default.createElement(
                            _reactBootstrap.Alert,
                            { bsStyle: 'danger' },
                            'No data available'
                        ),
                        fetched && data && _react2.default.createElement(_FilteredTable2.default, {
                            className: 'table table-striped table-bordered table-condensed table-cascading-nav',
                            data: dataWithClass,
                            itemFormat: navFormat,
                            rowClickable: true,
                            onRowClick: function onRowClick(item) {
                                return _this2.onHandleClick(item);
                            }
                        })
                    )
                ),
                footerDisplay
            );
        }
    }]);

    return CascadingPaneNav;
}(_react2.default.Component);

CascadingPaneNav.propTypes = {
    role: _propTypes2.default.string,
    key: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    config: _propTypes2.default.shape({
        APP_ID: _propTypes2.default.string
    }),
    data: _propTypes2.default.array,
    getCascadingNav: _propTypes2.default.func,
    navFetch: _propTypes2.default.shape({
        status: _propTypes2.default.string,
        isFetching: _propTypes2.default.bool
    }),
    fetchedNav: _propTypes2.default.bool,
    cascNav: _propTypes2.default.string,
    updateGroupSelect: _propTypes2.default.func,

    className: _propTypes2.default.string,
    itemIdField: _propTypes2.default.string,
    logoField: _propTypes2.default.string,
    titleField: _propTypes2.default.string,
    visibilityField: _propTypes2.default.string,

    headerDisplay: _propTypes2.default.element,
    footerDisplay: _propTypes2.default.element,
    itemConfigDisplay: _propTypes2.default.element
};

CascadingPaneNav.defaultProps = {
    role: 'nav',
    key: 0,
    data: [],
    getCascadingNav: function getCascadingNav(f) {
        return f;
    },
    navFetch: {
        status: '',
        isFetching: false
    },
    fetchedNav: false,
    cascNav: '',
    updateGroupSelect: function updateGroupSelect(f) {
        return f;
    },

    className: '',
    itemIdField: 'id',
    logoField: '',
    titleField: 'name',
    visibilityField: ''
};

exports.default = CascadingPaneNav;