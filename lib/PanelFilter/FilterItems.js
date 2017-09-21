'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
                filterItems = _props2.filterItems,
                key = _props2.key,
                type = _props2.type,
                category = _props2.category,
                onHandleClick = _props2.onHandleClick;

            var selectedItems = category && category[type] || [];

            var displayItems = filterItems && filterItems.filter(function (item) {
                return item._id;
            }) || [];

            if (!displayItems || displayItems.length === 0) return null;

            return _react2.default.createElement(
                'div',
                { className: 'filter-collapse ' + key + '-filter collapse panel-collapse', id: 'filter-' + key },
                _react2.default.createElement(
                    'div',
                    { className: 'well' },
                    displayItems.Items.map(function (item, idx) {
                        var itemCount = _this2.countNumbers(item);
                        return _react2.default.createElement(
                            'label',
                            {
                                key: idx,
                                className: 'label label-filter ' + (selectedItems.includes(item.key || item._id) ? 'active' : ''),
                                onClick: onHandleClick,
                                'data-type': type,
                                value: item.key || item._id
                            },
                            item._id,
                            ' (',
                            itemCount,
                            ')'
                        );
                    })
                )
            );
        }
    }]);

    return FilterItems;
}(_react2.default.Component);

FilterItems.propTypes = {
    type: _propTypes2.default.string.isRequired,
    key: _propTypes2.default.string.isRequired,
    items: _propTypes2.default.arrayOf(_propTypes2.default.object),
    filterItems: _propTypes2.default.arrayOf(_propTypes2.default.object),
    category: _propTypes2.default.object,
    onHandleClick: _propTypes2.default.func,
    filter: _propTypes2.default.func
};
FilterItems.defaultProps = {
    onHandleClick: function onHandleClick(f) {
        return f;
    },
    items: []
};

exports.default = FilterItems;