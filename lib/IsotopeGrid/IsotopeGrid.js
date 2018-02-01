'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isotopeLayout = require('isotope-layout');

var _isotopeLayout2 = _interopRequireDefault(_isotopeLayout);

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _stringifyValues = require('../util/stringifyValues');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var columnProps = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.shape({
    size: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]),
    order: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    offset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
})]);

var IsotopeItem = function IsotopeItem(_ref) {
    var key = _ref.key,
        id = _ref.id,
        width = _ref.width,
        xs = _ref.xs,
        sm = _ref.sm,
        md = _ref.md,
        lg = _ref.lg,
        children = _ref.children,
        item = _ref.item;
    return width ? _react2.default.createElement(
        'div',
        {
            key: key,
            className: (0, _classnames2.default)(id + '-item', 'wfui-isotope-item'),
            style: { width: width + 'px' },
            'data-item': (0, _stringifyValues.stringifyValues)(item)
        },
        children
    ) : _react2.default.createElement(
        _reactBootstrap.Col,
        {
            key: key,
            className: (0, _classnames2.default)(id + '-item', 'wfui-isotope-item'),
            xs: xs,
            sm: sm,
            md: md,
            lg: lg,
            'data-item': (0, _stringifyValues.stringifyValues)(item)
        },
        children
    );
};

IsotopeItem.propTypes = {
    key: _propTypes2.default.number,
    id: _propTypes2.default.string,
    width: _propTypes2.default.number,
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    children: _propTypes2.default.node,
    item: _propTypes2.default.any
};

IsotopeItem.defaultProps = {
    role: 'item'
};

var ITEM_ROLE = IsotopeItem.defaultProps.role;

var IsotopeGrid = function (_React$Component) {
    _inherits(IsotopeGrid, _React$Component);

    function IsotopeGrid(props) {
        _classCallCheck(this, IsotopeGrid);

        var _this = _possibleConstructorReturn(this, (IsotopeGrid.__proto__ || Object.getPrototypeOf(IsotopeGrid)).call(this, props));

        _this.state = {
            isotope: null,
            reload: true
        };
        _this.createIsotope = _this.createIsotope.bind(_this);
        return _this;
    }

    _createClass(IsotopeGrid, [{
        key: 'createIsotope',
        value: function createIsotope() {
            var _props = this.props,
                id = _props.id,
                wholeWord = _props.wholeWord,
                searchTerm = _props.searchTerm,
                filterList = _props.filterList,
                sortBy = _props.sortBy,
                sortAscending = _props.sortAscending,
                getSortData = _props.getSortData;
            var isotope = this.state.isotope;


            var reg = wholeWord ? RegExp('\\b' + searchTerm.toLowerCase().trim() + '\\b', 'i') : RegExp('' + searchTerm.toLowerCase().trim(), 'i');

            if (!isotope) {
                this.setState({
                    isotope: new _isotopeLayout2.default(_reactDom2.default.findDOMNode(this), {
                        itemSelector: '.' + id + '-item',
                        layoutMode: 'fitRows',
                        sortBy: sortBy,
                        sortAscending: sortAscending,
                        getSortData: getSortData,
                        filter: function filter(itemElem) {
                            var _this2 = this;

                            var isoSearch = itemElem ? itemElem.dataset.item : this.dataset.item;
                            return (!filterList || filterList.length === 0 || filterList.every(function (filter) {
                                return filter(itemElem || _this2);
                            })) && reg.test(isoSearch || '');
                        }
                    })
                });
            } else {
                this.state.isotope.reloadItems();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.createIsotope();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var oldElems = [];

            this.props.children.forEach(function (item) {
                if (Array.isArray(item)) {
                    item.forEach(function (i) {
                        return oldElems.push(i);
                    });
                } else {
                    oldElems.push(item);
                }
            });

            var newElems = [];

            nextProps.children.forEach(function (item) {
                if (Array.isArray(item)) {
                    item.forEach(function (i) {
                        return newElems.push(i);
                    });
                } else {
                    newElems.push(item);
                }
            });
            var reload = oldElems.length !== newElems.length;
            var options = {};
            if (this.props.searchTerm.toLowerCase().trim() !== nextProps.searchTerm.toLowerCase().trim() || JSON.stringify(this.props.filterList) !== JSON.stringify(nextProps.filterList) || JSON.stringify(this.props.category) !== JSON.stringify(nextProps.category)) {
                var reg = nextProps.wholeWord ? RegExp('\\b' + nextProps.searchTerm.toLowerCase().trim() + '\\b', 'i') : RegExp('' + nextProps.searchTerm.toLowerCase().trim(), 'i');
                options.filter = function (itemElem) {
                    var _this3 = this;

                    var isoSearch = itemElem ? itemElem.dataset.item : this.dataset.item;
                    return (!nextProps.filterList || nextProps.filterList.length === 0 || nextProps.filterList.every(function (filter) {
                        return filter(itemElem || _this3);
                    })) && reg.test(isoSearch || '');
                };
            }
            if (this.props.sortBy !== nextProps.sortBy) {
                options.sortBy = nextProps.sortBy;
            }
            if (this.props.sortAscending !== nextProps.sortAscending) {
                options.sortAscending = nextProps.sortAscending;
            }
            if (JSON.stringify(this.props.getSortData) !== JSON.stringify(nextProps.getSortData)) {
                options.getSortData = nextProps.getSortData;
            }

            if (reload !== this.state.reload) this.setState({ reload: reload });
            if (Object.keys(options).length && this.state.isotope) {
                this.state.isotope.arrange(_extends({}, options));
            } else if (!Object.keys(options).length) {
                this.createIsotope();
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.state.isotope) {
                if (this.state.reload) {
                    this.state.isotope.reloadItems();
                }
                this.state.isotope.arrange();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.state.isotope) {
                this.state.isotope.destroy();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                id = _props2.id,
                width = _props2.width,
                xs = _props2.xs,
                sm = _props2.sm,
                md = _props2.md,
                lg = _props2.lg,
                children = _props2.children,
                className = _props2.className;


            var elems = [];

            children.forEach(function (item) {
                if (Array.isArray(item)) {
                    item.forEach(function (i) {
                        return elems.push(i);
                    });
                } else {
                    elems.push(item);
                }
            });

            if (width) {
                return _react2.default.createElement(
                    'div',
                    {
                        id: id,
                        className: (0, _classnames2.default)(className, id + '-grid', 'wfui-isotope-grid'),
                        style: { width: '100%' }
                    },
                    elems && elems.map(function (child, key) {
                        if (!child) return null;
                        switch (child.props.role) {
                            case ITEM_ROLE:
                                return (0, _react.cloneElement)(child, {
                                    key: key,
                                    id: id,
                                    width: width,
                                    xs: xs,
                                    sm: sm,
                                    md: md,
                                    lg: lg
                                });
                            default:
                                return null;
                        }
                    })
                );
            }

            return _react2.default.createElement(
                _reactBootstrap.Row,
                { id: id, className: (0, _classnames2.default)(id + '-grid', 'wfui-isotope-grid') },
                elems && elems.map(function (child, key) {
                    if (!child || child.length === 0 || !child.props.role) return null;
                    switch (child.props.role) {
                        case ITEM_ROLE:
                            return (0, _react.cloneElement)(child, {
                                key: key,
                                id: id,
                                width: width,
                                xs: xs,
                                sm: sm,
                                md: md,
                                lg: lg
                            });
                        default:
                            return null;
                    }
                })
            );
        }
    }]);

    return IsotopeGrid;
}(_react2.default.Component);

IsotopeGrid.propTypes = {
    id: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    width: _propTypes2.default.number,
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    children: _propTypes2.default.node,
    sortBy: _propTypes2.default.oneOf(_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)),
    sortAscending: _propTypes2.default.bool,
    getSortData: _propTypes2.default.object,
    searchTerm: _propTypes2.default.string,
    wholeWord: _propTypes2.default.bool,
    filterList: _propTypes2.default.arrayOf(_propTypes2.default.func)
};

IsotopeGrid.defaultProps = {
    searchTerm: '',
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    sortBy: 'original-order',
    sortAscending: true
};

IsotopeGrid.Item = IsotopeItem;

exports.default = (0, _reactRedux.connect)(function (state) {
    return {
        category: state.visibilityFilter && state.visibilityFilter.category
    };
})(IsotopeGrid);