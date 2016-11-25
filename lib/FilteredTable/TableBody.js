'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableBody = function (_React$Component) {
    _inherits(TableBody, _React$Component);

    function TableBody(props) {
        _classCallCheck(this, TableBody);

        var _this = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));

        _this.state = {
            sortedIdx: -1,
            sortedOrientation: 'desc'
        };
        return _this;
    }

    _createClass(TableBody, [{
        key: 'toggleSort',
        value: function toggleSort(event, idx) {
            var _state = this.state,
                sortedIdx = _state.sortedIdx,
                sortedOrientation = _state.sortedOrientation;

            event.preventDefault();
            if (sortedIdx === idx) {
                if (sortedOrientation === 'desc') {
                    this.setState({ sortedOrientation: 'asc' });
                } else {
                    /* Disable sorting if you click twice on the same label */
                    this.setState({ sortedIdx: -1 });
                }
            } else {
                this.setState({ sortedOrientation: 'desc' });
                this.setState({ sortedIdx: idx });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                rows = _props.rows,
                data = _props.data,
                pageSize = _props.pageSize,
                currentPage = _props.currentPage,
                selectable = _props.selectable,
                onCheck = _props.onCheck,
                onAllCheck = _props.onAllCheck,
                checks = _props.checks;
            var _state2 = this.state,
                sortedIdx = _state2.sortedIdx,
                sortedOrientation = _state2.sortedOrientation;

            /* Calculates the Table of articles that should be displayed on the current page */

            var activeData = [];
            var numArticles = data ? data.length : 0;
            var startingArticle = pageSize * (currentPage - 1);

            for (var i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
                activeData.push(data[i]);
            }

            var sortedData = activeData;

            /* Handle sorting */
            if (sortedIdx !== -1) {
                sortedData = sortedData.sort(function (a, b) {
                    var getSortingData = rows[sortedIdx].sortingKey;
                    if (sortedOrientation === 'desc') {
                        return getSortingData(a) > getSortingData(b);
                    }
                    return getSortingData(a) < getSortingData(b);
                });
            }

            /* Form row using the provided data functions. */
            var itemDisplays = sortedData.map(function (item, idx) {
                var rowItems = [];
                if (selectable) {
                    rowItems.push(_react2.default.createElement(
                        'td',
                        { key: 'td_' + idx },
                        _react2.default.createElement('input', {
                            type: 'checkbox',
                            checked: checks[idx],
                            onChange: function onChange() {
                                return onCheck(idx);
                            }
                        })
                    ));
                }
                rows.forEach(function (cell, rowIdx) {
                    rowItems.push(_react2.default.createElement(
                        'td',
                        { key: 'td_' + idx + '_' + rowIdx },
                        cell.display(item)
                    ));
                });
                return _react2.default.createElement(
                    'tr',
                    { key: 'td_' + idx },
                    rowItems
                );
            });

            /* Setup the header row and onClick for sorting if applicable */
            var headerRow = rows.map(function (cell, idx) {
                return _react2.default.createElement(
                    'th',
                    { key: cell.name },
                    cell.sortingKey ? _react2.default.createElement(
                        'a',
                        { href: '#', onClick: function onClick(e) {
                                return _this2.toggleSort(e, idx);
                            } },
                        cell.name
                    ) : cell.name
                );
            });

            return _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                    'tr',
                    null,
                    selectable ? _react2.default.createElement(
                        'th',
                        null,
                        _react2.default.createElement('input', {
                            type: 'Checkbox',
                            onChange: onAllCheck,
                            checked: checks.every(function (item) {
                                return item;
                            })
                        })
                    ) : null,
                    headerRow
                ),
                itemDisplays
            );
        }
    }]);

    return TableBody;
}(_react2.default.Component);

TableBody.propTypes = {
    data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.any).isRequired,
    pageSize: _react2.default.PropTypes.number,
    currentPage: _react2.default.PropTypes.number,
    selectable: _react2.default.PropTypes.bool,
    rows: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    onCheck: _react2.default.PropTypes.func,
    onAllCheck: _react2.default.PropTypes.func,
    checks: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.bool)
};

exports.default = TableBody;