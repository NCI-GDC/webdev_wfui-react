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

var _FilteredTable = require('../FilteredTable/FilteredTable');

var _FilteredTable2 = _interopRequireDefault(_FilteredTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var CascadingPaneMainView = function (_React$Component) {
    _inherits(CascadingPaneMainView, _React$Component);

    function CascadingPaneMainView(props) {
        _classCallCheck(this, CascadingPaneMainView);

        var _this = _possibleConstructorReturn(this, (CascadingPaneMainView.__proto__ || Object.getPrototypeOf(CascadingPaneMainView)).call(this, props));

        _this.state = {
            navSelect: props.cascNav || '',
            curSelect: props.cascSelect || '',
            fetchedNav: props.fetchedNav,
            fetchedMainView: props.fetchedMainView,
            selected: [],
            filtered: [],
            showing: 0,
            dataWithClass: props.mainData ? props.mainData.map(function (item) {
                var newItem = JSON.parse(JSON.stringify(item));
                newItem.className = 'member-item-' + item[props.itemIdField] + ' ' + (item[props.itemIdField] === props.cascSelect ? 'active' : '');
                return newItem;
            }) : []
        };

        _this.onHandleClick = _this.onHandleClick.bind(_this);
        _this.onSelectionChange = _this.onSelectionChange.bind(_this);
        return _this;
    }

    _createClass(CascadingPaneMainView, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                cascNav = _props.cascNav,
                getCascadingMainView = _props.getCascadingMainView;

            if (cascNav) getCascadingMainView(cascNav);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props2 = this.props,
                cascNav = _props2.cascNav,
                cascSelect = _props2.cascSelect,
                fetchedNav = _props2.fetchedNav,
                fetchedMainView = _props2.fetchedMainView,
                getCascadingMainView = _props2.getCascadingMainView,
                mainData = _props2.mainData;

            var newState = {};
            if (fetchedNav !== nextProps.fetchedNav) {
                newState.fetchedNav = nextProps.fetchedNav;
            }
            if (fetchedMainView !== nextProps.fetchedMainView) {
                newState.fetchedMainView = nextProps.fetchedMainView;
            }
            if (cascNav) {
                if (!nextProps.cascNav || cascNav !== nextProps.cascNav) {
                    newState.navSelect = nextProps.cascNav || '';
                    if (nextProps.cascNav) getCascadingMainView(nextProps.cascNav);
                }
            } else if (nextProps.cascNav) {
                newState.navSelect = nextProps.cascNav;
                getCascadingMainView(nextProps.cascNav);
            }

            if (cascSelect) {
                if (!nextProps.cascSelect || cascSelect !== nextProps.cascSelect) {
                    newState.curSelect = nextProps.cascSelect || '';
                    newState.dataWithClass = nextProps.mainData ? nextProps.mainData.map(function (item) {
                        var newItem = JSON.parse(JSON.stringify(item));
                        newItem.className = 'member-item-' + item[nextProps.itemIdField] + ' ' + (item[nextProps.itemIdField] === nextProps.cascSelect ? 'active' : '');
                        return newItem;
                    }) : [];
                }
            } else if (nextProps.cascSelect) {
                newState.curSelect = nextProps.cascSelect;
                newState.dataWithClass = nextProps.mainData ? nextProps.mainData.map(function (item) {
                    var newItem = JSON.parse(JSON.stringify(item));
                    newItem.className = 'member-item-' + item[nextProps.itemIdField] + ' ' + (item[nextProps.itemIdField] === nextProps.cascSelect ? 'active' : '');
                    return newItem;
                }) : [];
            }
            if (JSON.stringify(mainData) !== nextProps.mainData) {
                newState.dataWithClass = nextProps.mainData ? nextProps.mainData.map(function (item) {
                    var newItem = JSON.parse(JSON.stringify(item));
                    newItem.className = 'member-item-' + item[nextProps.itemIdField] + ' ' + (item[nextProps.itemIdField] === nextProps.cascSelect ? 'active' : '');
                    return newItem;
                }) : [];
            }

            if (Object.keys(newState).length > 0) {
                this.setState(_extends({}, newState));
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _props3 = this.props,
                updateMemberSelect = _props3.updateMemberSelect,
                mainData = _props3.mainData,
                itemIdField = _props3.itemIdField;
            var curSelect = this.state.curSelect;


            if (prevProps.mainData.length === 0 && mainData.length > 0 || curSelect !== prevState.curSelect || JSON.stringify(mainData) !== JSON.stringify(prevProps.mainData)) {
                var memberSelected = mainData.filter(function (item) {
                    return item[itemIdField] === curSelect;
                });
                updateMemberSelect(memberSelected[0]);
            }
        }
    }, {
        key: 'onSelectionChange',
        value: function onSelectionChange(selection) {
            var mainData = this.props.mainData;

            var newSelected = selection.map(function (idx) {
                return mainData[idx];
            });
            this.setState({
                selected: newSelected
            });
        }
    }, {
        key: 'onHandleClick',
        value: function onHandleClick(item) {
            var itemIdField = this.props.itemIdField;
            var curSelect = this.state.curSelect;

            if (curSelect !== item[itemIdField]) {
                if (curSelect) {
                    window.location.href = window.location.href.replace('cascSelect=' + curSelect, 'cascSelect=' + item[itemIdField]);
                } else {
                    window.location.href = window.location.href + '&cascSelect=' + item[itemIdField];
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props4 = this.props,
                key = _props4.key,
                className = _props4.className,
                noneSelectedDisplay = _props4.noneSelectedDisplay,
                navFetch = _props4.navFetch,
                mainViewFetch = _props4.mainViewFetch,
                groupData = _props4.groupData,
                mainData = _props4.mainData,
                summaryDisplay = _props4.summaryDisplay,
                reloadNav = _props4.reloadNav,
                itemDisplay = _props4.itemDisplay,
                itemConfig = _props4.itemConfig,
                tableClassName = _props4.tableClassName,
                visibilityFilter = _props4.visibilityFilter,
                filtersDisplay = _props4.filtersDisplay,
                getFilters = _props4.getFilters,
                location = _props4.location,
                getCascadingMainView = _props4.getCascadingMainView;
            var _state = this.state,
                navSelect = _state.navSelect,
                fetchedNav = _state.fetchedNav,
                fetchedMainView = _state.fetchedMainView,
                showing = _state.showing,
                dataWithClass = _state.dataWithClass,
                selected = _state.selected;


            var mainViewItemFormat = [];

            if (itemDisplay) {
                mainViewItemFormat = mainViewItemFormat.concat(itemDisplay);
            }

            if (itemConfig) {
                mainViewItemFormat.push({
                    name: 'actions',
                    className: 'td-actions',
                    display: function display(item) {
                        return _react2.default.cloneElement(itemConfig, Object.assign({}, { item: item, groupData: groupData }, { reloadData: function reloadData() {
                                return getCascadingMainView();
                            } }));
                    },
                    excludeRowClick: true
                });
            }

            if (!navSelect) {
                return _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)(className, 'cascading-pane-mainview'), key: key },
                    noneSelectedDisplay
                );
            }

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'cascading-pane-mainview'), key: key },
                _react2.default.createElement(
                    _LoadingComponent2.default,
                    navFetch,
                    _react2.default.createElement(
                        _LoadingComponent2.default,
                        mainViewFetch,
                        _react2.default.createElement(
                            'div',
                            { className: 'cascading-pane-mainview-summary' },
                            fetchedNav && summaryDisplay && _react2.default.cloneElement(summaryDisplay, {
                                data: mainData,
                                groupData: groupData,
                                updateNav: function updateNav() {
                                    return reloadNav();
                                }
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'cascading-pane-mainview-filters ' },
                            filtersDisplay && _react2.default.cloneElement(filtersDisplay, {
                                visibilityFilter: visibilityFilter,
                                location: location,
                                showing: showing,
                                data: mainData,
                                selected: selected,
                                groupData: groupData
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'cascading-pane-mainview-table' },
                            fetchedMainView && _react2.default.createElement(_FilteredTable2.default, {
                                className: tableClassName,
                                searchTerm: visibilityFilter.category.searchTerm || '',
                                filterList: getFilters(visibilityFilter.category),
                                data: dataWithClass,
                                itemFormat: mainViewItemFormat,
                                onSelectionChange: this.onSelectionChange,
                                onResultsNumUpdate: function onResultsNumUpdate(results) {
                                    return _this2.setState({ showing: results });
                                },
                                rowClickable: true,
                                onRowClick: function onRowClick(item) {
                                    return _this2.onHandleClick(item);
                                },
                                selectable: true,
                                simpleSearch: true,
                                wholeWord: true
                            })
                        )
                    )
                )
            );
        }
    }]);

    return CascadingPaneMainView;
}(_react2.default.Component);

CascadingPaneMainView.propTypes = {
    role: _propTypes2.default.string,
    key: _propTypes2.default.number,
    groupData: _propTypes2.default.object,
    mainData: _propTypes2.default.array,
    getCascadingMainView: _propTypes2.default.func,
    navFetch: _propTypes2.default.shape({
        status: _propTypes2.default.string,
        isFetching: _propTypes2.default.bool
    }),
    mainViewFetch: _propTypes2.default.shape({
        status: _propTypes2.default.string,
        isFetching: _propTypes2.default.bool
    }),
    fetchedNav: _propTypes2.default.bool,
    fetchedMainView: _propTypes2.default.bool,
    location: _propTypes2.default.object,
    cascNav: _propTypes2.default.string,
    cascSelect: _propTypes2.default.string,
    reloadNav: _propTypes2.default.func,
    updateMemberSelect: _propTypes2.default.func,
    visibilityFilter: _propTypes2.default.object,

    className: _propTypes2.default.string,
    tableClassName: _propTypes2.default.string,
    noneSelectedDisplay: _propTypes2.default.element,
    summaryDisplay: _propTypes2.default.element,
    itemDisplay: _propTypes2.default.array,
    itemConfig: _propTypes2.default.element,
    itemIdField: _propTypes2.default.string,
    getFilters: _propTypes2.default.func,
    filtersDisplay: _propTypes2.default.element
};

CascadingPaneMainView.defaultProps = {
    role: 'mainView',
    key: 1,
    groupData: {},
    mainData: [],
    getCascadingMainView: function getCascadingMainView(f) {
        return f;
    },
    navFetch: {
        status: '',
        isFetching: false
    },
    mainViewFetch: {
        status: '',
        isFetching: false
    },
    fetchedNav: false,
    fetchedMainView: false,
    cascNav: '',
    cascSelect: '',
    reloadNav: function reloadNav(f) {
        return f;
    },
    updateMemberSelect: function updateMemberSelect(f) {
        return f;
    },

    className: '',
    tableClassName: '',
    noneSelectedDisplay: _react2.default.createElement(
        'p',
        null,
        'Please select a group'
    ),
    itemIdField: 'id'
};

exports.default = CascadingPaneMainView;