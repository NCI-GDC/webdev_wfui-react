'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResponsiveTableBody = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fixedDataTable = require('fixed-data-table-2');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document, window */


var TableBody = function (_React$Component) {
    _inherits(TableBody, _React$Component);

    function TableBody(props) {
        _classCallCheck(this, TableBody);

        var _this = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));

        _this.state = { rowSelected: undefined, columnWidths: {} };

        _this.onHandleScroll = _this.onHandleScroll.bind(_this);
        _this._onColumnResizeEndCallback = _this._onColumnResizeEndCallback.bind(_this);
        _this._rowHeightGetter = _this._rowHeightGetter.bind(_this);
        return _this;
    }

    _createClass(TableBody, [{
        key: 'onHandleScroll',
        value: function onHandleScroll() {
            var event = document.createEvent('Event');
            event.initEvent('fixedTableScrollStart', true, true);
            window.dispatchEvent(event);
        }
    }, {
        key: '_onColumnResizeEndCallback',
        value: function _onColumnResizeEndCallback(newColumnWidth, columnKey) {
            var columnWidths = this.state.columnWidths;
            var onColumnResizeEndCallback = this.props.onColumnResizeEndCallback;


            var newColumnWidths = _extends({}, columnWidths, _defineProperty({}, columnKey, newColumnWidth));

            this.setState({
                columnWidths: newColumnWidths
            });

            if (onColumnResizeEndCallback) onColumnResizeEndCallback(newColumnWidth, columnKey);
        }
    }, {
        key: '_rowHeightGetter',
        value: function _rowHeightGetter(idx) {
            var _props = this.props,
                rowResizeDisabled = _props.rowResizeDisabled,
                rowHeight = _props.rowHeight,
                rowHeightGetter = _props.rowHeightGetter,
                id = _props.id;


            if (rowResizeDisabled) return rowHeight;

            if (rowHeightGetter) return rowHeightGetter(idx, this.props);

            var table = document.getElementById(id);
            if (table) {
                var rows = table.getElementsByClassName('public_fixedDataTable_bodyRow');
                if (rows && rows[idx]) {
                    var contents = [].concat(_toConsumableArray(rows[idx].getElementsByClassName('public_fixedDataTableCell_cellContent')));

                    if (contents && contents.length) {
                        var maxHeight = rowHeight;
                        contents.forEach(function (content, i) {
                            if (content.offsetHeight > maxHeight) {
                                maxHeight = content.offsetHeight;
                            }
                        });

                        return maxHeight;
                    }
                }
            }

            return rowHeight;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var id = this.props.id;
            var columnWidths = this.state.columnWidths;

            var table = document.getElementById(id);
            var row = table.querySelector('.public_fixedDataTable_bodyRow:first-child .public_fixedDataTableCell_cellContent:first-child');

            if (JSON.stringify(columnWidths) !== JSON.stringify(prevState.columnWidths) && row && row.click) {
                row.click();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                itemFormat = _props2.itemFormat,
                data = _props2.data,
                pageSize = _props2.pageSize,
                currentPage = _props2.currentPage,
                selectable = _props2.selectable,
                onCheck = _props2.onCheck,
                _onRowClick = _props2.onRowClick,
                allCheckbox = _props2.allCheckbox,
                toggleSort = _props2.toggleSort,
                sortedOrientation = _props2.sortedOrientation,
                sortedIdx = _props2.sortedIdx,
                contentWidth = _props2.contentWidth,
                contentHeight = _props2.contentHeight,
                containerHeight = _props2.containerHeight,
                containerWidth = _props2.containerWidth,
                noTableHeader = _props2.noTableHeader,
                rowHeight = _props2.rowHeight,
                headerHeight = _props2.headerHeight,
                columnResizeDisabled = _props2.columnResizeDisabled,
                isResponsive = _props2.isResponsive,
                _rowClassNameGetter = _props2.rowClassNameGetter;
            var _state = this.state,
                rowSelected = _state.rowSelected,
                columnWidths = _state.columnWidths;


            var indexOffset = (currentPage - 1) * pageSize;

            /* Calculates the Table of articles that should be displayed on the current page */
            var activeData = [];
            var numArticles = data ? data.length : 0;
            var startingArticle = pageSize * (currentPage - 1);

            for (var i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
                activeData.push(_extends({}, data[i], { columnWidths: columnWidths }));
            }

            return _react2.default.createElement(
                _fixedDataTable.Table,
                {
                    rowHeight: rowHeight,
                    headerHeight: noTableHeader ? 0 : headerHeight,
                    rowsCount: activeData.length,
                    width: isResponsive ? containerWidth : contentWidth,
                    height: isResponsive ? containerHeight : contentHeight,
                    onRowClick: function onRowClick(event, rowIndex) {
                        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON' && !event.target.querySelector('.row-selector')) {
                            // e.stopPropagation on cell doesn't work. This will be invoked first.
                            if (_onRowClick) {
                                _onRowClick(activeData[rowIndex], event);
                            }
                            _this2.setState({ rowSelected: rowIndex });
                        }
                    },
                    rowClassNameGetter: function rowClassNameGetter(idx) {
                        return (0, _classnames2.default)(Object.assign({
                            even: (idx + 1) % 2 === 0,
                            add: (idx + 1) % 2 !== 0,
                            checked: activeData[idx].checked,
                            selected: rowSelected === idx
                        }, _rowClassNameGetter ? _rowClassNameGetter(activeData[idx], idx) : {}), activeData[idx].className || '', '' + (_onRowClick ? 'row-clickable' : ''));
                    },
                    onScrollStart: this.onHandleScroll,
                    onColumnResizeEndCallback: this._onColumnResizeEndCallback,
                    isColumnResizing: false,
                    rowHeightGetter: this._rowHeightGetter,
                    touchScrollEnabled: true,
                    keyboardScrollEnabled: true,
                    data: activeData
                },
                selectable && _react2.default.createElement(_fixedDataTable.Column, {
                    columnKey: 'select',
                    header: noTableHeader ? undefined : _react2.default.createElement(
                        _fixedDataTable.Cell,
                        null,
                        allCheckbox
                    ),
                    cell: function cell(props) {
                        return _react2.default.createElement(
                            _fixedDataTable.Cell,
                            props,
                            _react2.default.createElement('input', {
                                className: 'row-selector',
                                type: 'checkbox',
                                checked: activeData[props.rowIndex].checked,
                                onChange: function onChange(e) {
                                    e.stopPropagation();
                                    onCheck(activeData[props.rowIndex].idx);
                                }
                            })
                        );
                    },
                    width: 30
                }),
                itemFormat.map(function (item, i) {
                    var flexGrow = null;
                    if (columnResizeDisabled) {
                        flexGrow = 1;
                    } else if (item.flexGrow) {
                        flexGrow = item.flexGrow;
                    }

                    return _react2.default.createElement(_fixedDataTable.Column, _extends({
                        key: i
                    }, item, {
                        columnKey: item.columnKey || item.name,
                        header: noTableHeader ? undefined : _react2.default.createElement(
                            _fixedDataTable.Cell,
                            {
                                className: (0, _classnames2.default)({
                                    sortActive: sortedIdx === i,
                                    sortDesc: sortedIdx === i && sortedOrientation === 'desc',
                                    sortAsc: sortedIdx === i && sortedOrientation === 'asc'
                                })
                            },
                            item.sortingKey ? _react2.default.createElement(
                                'a',
                                {
                                    href: '#',
                                    onClick: function onClick(e) {
                                        toggleSort(e, i);
                                    }
                                },
                                item.name
                            ) : item.name
                        ),
                        cell: function cell(props) {
                            return _react2.default.createElement(
                                _fixedDataTable.Cell,
                                _extends({}, props, { className: item.className }),
                                item.display(activeData[props.rowIndex])
                            );
                        },
                        isResizable: !columnResizeDisabled && !flexGrow,
                        flexGrow: flexGrow,
                        width: columnWidths[item.columnKey || item.name] || item.width || 20
                    }));
                })
            );
        }
    }]);

    return TableBody;
}(_react2.default.Component);

TableBody.propTypes = {
    id: _propTypes2.default.string.isRequired,
    data: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    pageSize: _propTypes2.default.number.isRequired,
    currentPage: _propTypes2.default.number.isRequired,
    selectable: _propTypes2.default.bool.isRequired,
    itemFormat: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    onCheck: _propTypes2.default.func.isRequired,
    onRowClick: _propTypes2.default.func,
    allCheckbox: _propTypes2.default.element,
    toggleSort: _propTypes2.default.func,
    sortedOrientation: _propTypes2.default.string,
    sortedIdx: _propTypes2.default.number,
    contentWidth: _propTypes2.default.number,
    contentHeight: _propTypes2.default.number,
    containerWidth: _propTypes2.default.number,
    containerHeight: _propTypes2.default.number,
    rowHeight: _propTypes2.default.number,
    rowHeightGetter: _propTypes2.default.func,
    headerHeight: _propTypes2.default.number,
    rowClassNameGetter: _propTypes2.default.func,
    onColumnResizeEndCallback: _propTypes2.default.func,

    rowResizeDisabled: _propTypes2.default.bool,
    columnResizeDisabled: _propTypes2.default.bool,
    noTableHeader: _propTypes2.default.bool,

    isResponsive: _propTypes2.default.bool
};

TableBody.defaultProps = {
    toggleSort: function toggleSort(f) {
        return f;
    },
    contentWidth: 100,
    contentHeight: 300
};

var ResponsiveTableBody = (0, _reactDimensions2.default)({ elementResize: true })(function (props) {
    return _react2.default.createElement(TableBody, _extends({}, props, { isResponsive: true }));
});

var TableBodyWrapper = function TableBodyWrapper(props) {
    return _react2.default.createElement(TableBody, _extends({}, props, { isResponsive: false }));
};

exports.default = TableBody;
exports.ResponsiveTableBody = ResponsiveTableBody;