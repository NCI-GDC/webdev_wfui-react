'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var FilterItems = function (_React$Component) {
    _inherits(FilterItems, _React$Component);

    function FilterItems() {
        _classCallCheck(this, FilterItems);

        var _this = _possibleConstructorReturn(this, (FilterItems.__proto__ || Object.getPrototypeOf(FilterItems)).call(this));

        _this.state = { open: false };
        _this.countNumbers = _this.countNumbers.bind(_this);
        return _this;
    }

    _createClass(FilterItems, [{
        key: 'countNumbers',
        value: function countNumbers(item) {
            var _props = this.props,
                items = _props.items,
                type = _props.type,
                category = _props.category,
                filter = _props.filter;

            var countFilter = Object.assign({}, category, _defineProperty({}, type, [item.key || item._id]));
            var itemCount = filter ? items.filter(filter(countFilter)).length : item.count;
            return itemCount;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                label = _props2.label,
                filterItems = _props2.filterItems,
                items = _props2.items,
                type = _props2.type,
                category = _props2.category,
                onHandleClick = _props2.onHandleClick,
                numCollapse = _props2.numCollapse,
                defaultExpand = _props2.defaultExpand,
                textLess = _props2.textLess,
                textMore = _props2.textMore;
            var open = this.state.open;

            var selectedItems = category && category[type] || [];

            if (filterItems) {
                // Filter out null object
                var _filterItems = filterItems.filter(function (item) {
                    return item._id;
                });

                // If there is not types, then don't display;
                if (_filterItems.length === 0) return null;

                var displayItems = _filterItems.slice(0, numCollapse + 1);
                var collapsedItems = _filterItems.slice(numCollapse + 1);
                var readMore = open ? _react2.default.createElement(
                    'a',
                    { href: '#', id: 'toggleButton', className: 'toggleButton toggleButtonMore', onClick: function onClick(e) {
                            e.preventDefault();_this2.setState({ open: false });
                        } },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement('span', { className: 'showless' }),
                        textLess
                    )
                ) : _react2.default.createElement(
                    'a',
                    { href: '#', id: 'toggleButton', className: 'toggleButton toggleButtonMore', onClick: function onClick(e) {
                            e.preventDefault();_this2.setState({ open: true });
                        } },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement('span', { className: 'showmore' }),
                        textMore
                    )
                );

                return _react2.default.createElement(
                    'fieldset',
                    null,
                    _react2.default.createElement(
                        'legend',
                        null,
                        _react2.default.createElement(
                            'a',
                            { className: defaultExpand + ' ? \'\': \'collapsed\'', role: 'button', 'data-toggle': 'collapse', href: '#search-filters-' + type, 'aria-expanded': defaultExpand, 'aria-controls': 'search-filters-' + type },
                            label
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'collapse ' + (defaultExpand ? 'in' : ''), id: 'search-filters-' + type },
                        _react2.default.createElement(
                            'div',
                            { className: 'checkbox ' + (Object.keys(category).length === 0 ? '' : 'filter-selected') },
                            displayItems.map(function (item, i) {
                                var itemCount = _this2.countNumbers(item);
                                return _react2.default.createElement(
                                    'label',
                                    { key: i, className: !itemCount ? 'no-data' : '' },
                                    _react2.default.createElement('input', { type: 'checkbox', 'data-type': type, value: item.key || item._id, onClick: onHandleClick, checked: selectedItems.includes(item.key || item._id) }),
                                    item._id,
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'filtercount' },
                                        ' ',
                                        itemCount,
                                        ' '
                                    )
                                );
                            }),
                            _react2.default.createElement('div', { id: 'showmore' }),
                            _react2.default.createElement(
                                _reactAddonsCssTransitionGroup2.default,
                                {
                                    transitionName: 'fadein',
                                    transitionEnterTimeout: 500,
                                    transitionLeaveTimeout: 0
                                },
                                open && collapsedItems.length > 0 && collapsedItems.map(function (item, i) {
                                    var itemCount = _this2.countNumbers(item);
                                    return _react2.default.createElement(
                                        'label',
                                        { key: i, className: !itemCount ? 'no-data' : '' },
                                        _react2.default.createElement('input', { type: 'checkbox', 'data-type': type, value: item.key || item._id, onClick: onHandleClick, checked: selectedItems.includes(item.key || item._id) }),
                                        item._id,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'filtercount' },
                                            ' ',
                                            itemCount,
                                            ' '
                                        )
                                    );
                                })
                            ),
                            collapsedItems.length > 0 && readMore
                        )
                    )
                );
            }

            return null;
        }
    }]);

    return FilterItems;
}(_react2.default.Component);

FilterItems.propTypes = {
    items: _propTypes2.default.arrayOf(_propTypes2.default.object),
    label: _propTypes2.default.string,
    type: _propTypes2.default.string,
    filterItems: _propTypes2.default.arrayOf(_propTypes2.default.object),
    category: _propTypes2.default.object,
    onHandleClick: _propTypes2.default.func,
    numCollapse: _propTypes2.default.number,
    defaultExpand: _propTypes2.default.bool,
    textMore: _propTypes2.default.string,
    textLess: _propTypes2.default.string
};
FilterItems.defaultProps = {
    defaultExpand: false,
    numCollapse: 10,
    onHandleClick: function onHandleClick(f) {
        return f;
    },
    textMore: 'More',
    textLess: 'Less'
};

exports.default = FilterItems;