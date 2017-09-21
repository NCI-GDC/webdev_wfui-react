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

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */
var FilteredIsotope = function (_React$Component) {
    _inherits(FilteredIsotope, _React$Component);

    function FilteredIsotope(props) {
        _classCallCheck(this, FilteredIsotope);

        var _this = _possibleConstructorReturn(this, (FilteredIsotope.__proto__ || Object.getPrototypeOf(FilteredIsotope)).call(this, props));

        _this.state = {
            isotope: null,
            reload: true
        };
        _this.createIsotope = _this.createIsotope.bind(_this);
        return _this;
    }

    _createClass(FilteredIsotope, [{
        key: 'createIsotope',
        value: function createIsotope() {
            var _props = this.props,
                getSortData = _props.getSortData,
                sortBy = _props.sortBy,
                sortOrder = _props.sortOrder,
                wholeWord = _props.wholeWord,
                searchTerm = _props.searchTerm,
                filterList = _props.filterList;
            var isotope = this.state.isotope;


            var reg = wholeWord ? RegExp('\\b' + searchTerm.toLowerCase().trim() + '\\b', 'i') : RegExp('' + searchTerm.toLowerCase().trim(), 'i');

            if (!isotope) {
                this.setState({ isotope: new _isotopeLayout2.default(_reactDom2.default.findDOMNode(this), {
                        layoutMode: 'fitRows',
                        getSortData: getSortData,
                        sortBy: sortBy || 'original-order',
                        sortAscending: sortOrder ? sortOrder === 'asc' : true,
                        filter: function filter(itemElem) {
                            return (!filterList || filterList.length === 0 || filterList.every(function (filter) {
                                return filter(itemElem);
                            })) && reg.test(itemElem.querySelector('.isotope-search').innerText);
                        }
                    }) });
            } else {
                this.state.isotope.reloadItems();
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.createIsotope();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var reload = JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
            var options = {};

            if (JSON.stringify(this.props.getSortData) !== JSON.stringify(nextProps.getSortData)) {
                this.state.isotope.destroy();
                var reg = nextProps.wholeWord ? RegExp('\\b' + nextProps.searchTerm.toLowerCase().trim() + '\\b', 'i') : RegExp('' + nextProps.searchTerm.toLowerCase().trim(), 'i');
                options.getSortData = nextProps.getSortData;
                options.sortBy = nextProps.sortBy || 'original-order';
                options.sortAscending = nextProps.sortOrder ? nextProps.sortOrder === 'asc' : true;
                options.filter = function (itemElem) {
                    return (!nextProps.filterList || nextProps.filterList.length === 0 || nextProps.filterList.every(function (filter) {
                        return filter(itemElem);
                    })) && reg.test(itemElem.querySelector('.isotope-search').innerText);
                };
                if (reload !== this.state.reload) {
                    this.setState({
                        isotope: new _isotopeLayout2.default(_reactDom2.default.findDOMNode(this), _extends({
                            layoutMode: 'fitRows',
                            getSortData: nextProps.getSortData
                        }, options)),
                        reload: reload
                    });
                } else {
                    this.setState({
                        isotope: new _isotopeLayout2.default(_reactDom2.default.findDOMNode(this), _extends({
                            layoutMode: 'fitRows',
                            getSortData: nextProps.getSortData
                        }, options))
                    });
                }
            } else {
                if (this.props.sortBy !== nextProps.sortBy) options.sortBy = nextProps.sortBy || 'original-order';
                if (this.props.sortOrder !== nextProps.sortOrder) options.sortAscending = nextProps.sortOrder ? nextProps.sortOrder === 'asc' : true;
                if (this.props.searchTerm.toLowerCase().trim() !== nextProps.searchTerm.toLowerCase().trim() || JSON.stringify(this.props.filterList) !== JSON.stringify(nextProps.filterList)) {
                    var _reg = nextProps.wholeWord ? RegExp('\\b' + nextProps.searchTerm.toLowerCase().trim() + '\\b', 'i') : RegExp('' + nextProps.searchTerm.toLowerCase().trim(), 'i');
                    options.filter = function (itemElem) {
                        return (!nextProps.filterList || nextProps.filterList.length === 0 || nextProps.filterList.every(function (filter) {
                            return filter(itemElem);
                        })) && _reg.test(itemElem.querySelector('.isotope-search').innerText);
                    };
                }

                if (reload !== this.state.reload) this.setState({ reload: reload });
                if (options) this.state.isotope.arrange(_extends({}, options));
            }
            /*
                    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
                        this.setState({ reload: true });
                    } else if (this.state.reload) {
                        this.setState({ reload: false });
                    }
            
                    if (JSON.stringify(this.props.getSortData) !== JSON.stringify(nextProps.getSortData)) {
                        this.state.isotope.destroy();
                        this.setState({ isotope: new Isotope(ReactDOM.findDOMNode(this), {
                            layoutMode: 'fitRows',
                            getSortData: nextProps.getSortData,
                        }) });
                    }
            
                    if (this.props.sortBy !== nextProps.sortBy || this.props.sortOrder !== nextProps.sortOrder) {
                        this.state.isotope.arrange({
                            sortBy: nextProps.sortBy || 'original-order',
                            sortAscending: nextProps.sortOrder ? nextProps.sortOrder === 'asc' : true,
                        });
                    }
            
                    if (this.props.searchTerm.toLowerCase().trim() !== nextProps.searchTerm.toLowerCase().trim()) {
                        const reg = nextProps.wholeWord ? RegExp(`\\b${nextProps.searchTerm.toLowerCase().trim()}\\b`, 'i') : RegExp(`${nextProps.searchTerm.toLowerCase().trim()}`, 'i');
                        this.state.isotope.arrange({
                            filter: itemElem => (!nextProps.filterList || nextProps.filterList.length === 0 || nextProps.filterList.every(filter => filter(itemElem))) && reg.test(itemElem.querySelector('.isotope-search').innerText),
                        });
                    }
            */
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
                className = _props2.className,
                data = _props2.data,
                itemDisplay = _props2.itemDisplay,
                itemClassName = _props2.itemClassName;


            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'wfui-isotope-grid') },
                data.map(function (item, idx) {
                    return _react2.default.createElement(_Element2.default, { className: itemClassName, item: item, itemDisplay: itemDisplay, key: idx });
                })
            );
        }
    }]);

    return FilteredIsotope;
}(_react2.default.Component);

FilteredIsotope.propTypes = {
    itemDisplay: _propTypes2.default.element.isRequired,
    data: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    className: _propTypes2.default.string,
    getSortData: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])),
    sortBy: _propTypes2.default.string,
    sortOrder: _propTypes2.default.string,
    searchTerm: _propTypes2.default.string,
    wholeWord: _propTypes2.default.bool,
    filterList: _propTypes2.default.arrayOf(_propTypes2.default.func),
    itemClassName: _propTypes2.default.string
};

FilteredIsotope.defaultProps = {
    getSortData: {},
    sortOrder: 'asc',
    sortBy: '',
    wholeWord: false,
    searchTerm: '',
    filterList: []
};

exports.default = FilteredIsotope;