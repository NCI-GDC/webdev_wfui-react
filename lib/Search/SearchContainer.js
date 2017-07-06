'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../');

var _actions = require('./actions');

var _actions2 = require('../util/visibilityFilter/actions');

var _SearchBox = require('./SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _SearchAutocomplete = require('./SearchAutocomplete');

var _SearchAutocomplete2 = _interopRequireDefault(_SearchAutocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var SearchContainer = function (_React$Component) {
    _inherits(SearchContainer, _React$Component);

    function SearchContainer(props) {
        _classCallCheck(this, SearchContainer);

        var _this = _possibleConstructorReturn(this, (SearchContainer.__proto__ || Object.getPrototypeOf(SearchContainer)).call(this, props));

        _this.state = {
            fetching: false,
            autoFetched: false,
            secondsElapsed: 0,
            startAutosearch: false,
            term: props.location.query.q ? props.location.query.q : '',
            autoTerm: ''
        };

        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onSearchSubmit = _this.onSearchSubmit.bind(_this);
        _this.onReset = _this.onReset.bind(_this);
        _this.searchSubmit = _this.searchSubmit.bind(_this);
        return _this;
    }

    _createClass(SearchContainer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                config = _props.config,
                location = _props.location,
                typeInclude = _props.typeInclude,
                keywordQuotes = _props.keywordQuotes;

            if (location.query && location.query.q) {
                this.props.getSearchResult(config, { keyword: location.query.q, typeInclude: typeInclude, keywordQuotes: keywordQuotes });
            } else {
                this.props.getSearchResult(config, { keyword: '', typeInclude: typeInclude, keywordQuotes: keywordQuotes });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!this.props.location.query || nextProps.location.query.q && nextProps.location.query.q !== this.props.location.query.q) {
                this.searchSubmit(nextProps.location.query.q);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.interval = setInterval(function () {
                return _this2.tick();
            }, 100);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.interval);
        }
    }, {
        key: 'onSearchSubmit',
        value: function onSearchSubmit(e) {
            e.preventDefault();
            this.searchSubmit(this.state.term);
        }
    }, {
        key: 'onInputChange',
        value: function onInputChange(e) {
            this.setState({
                term: e.target.value,
                secondsElapsed: 0,
                fetching: false,
                startAutosearch: true
            });
        }
    }, {
        key: 'onReset',
        value: function onReset() {
            var _props2 = this.props,
                isHome = _props2.isHome,
                config = _props2.config;

            if (isHome) {
                this.searchSubmit('');
            } else {
                this.state = {
                    secondsElapsed: 0,
                    term: '',
                    autoTerm: '',
                    startAutosearch: false
                };
            }
        }
    }, {
        key: 'searchSubmit',
        value: function searchSubmit(term) {
            var _props3 = this.props,
                onSearchSubmit = _props3.onSearchSubmit,
                config = _props3.config,
                typeInclude = _props3.typeInclude,
                keywordQuotes = _props3.keywordQuotes;

            this.state = {
                fetching: false,
                autoFetched: false,
                secondsElapsed: 0,
                term: term || '',
                autoTerm: term,
                startAutosearch: false
            };
            this.props.getSearchResult(config, { keyword: term.trim(), typeInclude: typeInclude, keywordQuotes: keywordQuotes });
            this.props.changeTerm(term);
            onSearchSubmit();
        }
    }, {
        key: 'tick',
        value: function tick() {
            var _this3 = this;

            var _props4 = this.props,
                isHome = _props4.isHome,
                config = _props4.config,
                typeInclude = _props4.typeInclude;
            var _state = this.state,
                fetching = _state.fetching,
                secondsElapsed = _state.secondsElapsed,
                term = _state.term,
                autoTerm = _state.autoTerm;

            if (!fetching) {
                if (secondsElapsed > 3) {
                    if (term.length > 0 && autoTerm !== term) {
                        this.setState({
                            autoTerm: term,
                            secondsElapsed: 0,
                            fetching: true,
                            autoFetched: false
                        });
                        this.props.getAutocomplete(config, { keyword: term, typeInclude: typeInclude }).then(function () {
                            _this3.setState({
                                fetching: false,
                                autoFetched: true
                            });
                        });
                    } else if (term.length === 0) {
                        if (autoTerm !== term && isHome) {
                            this.searchSubmit('');
                        } else {
                            this.setState({
                                fetching: false,
                                autoFetched: false,
                                term: term || '',
                                autoTerm: term
                            });
                        }
                    }
                } else {
                    this.setState(function (prevState) {
                        return {
                            secondsElapsed: prevState.secondsElapsed + 1
                        };
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props5 = this.props,
                autocomplete = _props5.autocomplete,
                placeholder = _props5.placeholder,
                textSubmit = _props5.textSubmit,
                textNoResult = _props5.textNoResult;
            var _state2 = this.state,
                fetching = _state2.fetching,
                autoFetched = _state2.autoFetched,
                term = _state2.term,
                startAutosearch = _state2.startAutosearch;


            return _react2.default.createElement(
                'div',
                { className: 'wfui-search-container' },
                _react2.default.createElement(_SearchBox2.default, {
                    placeholder: placeholder,
                    textSubmit: textSubmit,
                    onInputChange: this.onInputChange,
                    value: term,
                    onSearchSubmit: this.onSearchSubmit,
                    onReset: this.onReset
                }),
                fetching && _react2.default.createElement(
                    'ul',
                    { id: 'ui-id-1', className: 'ui-menu ui-widget ui-widget-content ui-autocomplete ui-front' },
                    _react2.default.createElement(
                        'li',
                        { className: 'mp ps' },
                        _react2.default.createElement(_.Spinner, { type: 1, color: '#0072c6', fontSize: '5px', margin: '10px auto' })
                    )
                ),
                autoFetched && startAutosearch && _react2.default.createElement(_SearchAutocomplete2.default, { textNoResult: textNoResult, autocomplete: autocomplete, onClickTerm: function onClickTerm(e) {
                        _this4.searchSubmit(e.target.getAttribute('data-keyword'));
                    } })
            );
        }
    }]);

    return SearchContainer;
}(_react2.default.Component);

SearchContainer.propTypes = {
    config: _propTypes2.default.shape({
        API_HOST: _propTypes2.default.string,
        APP_ID: _propTypes2.default.string,
        API_SEARCH: _propTypes2.default.string
    }).isRequired,
    location: _propTypes2.default.shape({
        query: _propTypes2.default.shape({
            q: _propTypes2.default.string
        })
    }),
    typeInclude: _propTypes2.default.arrayOf(_propTypes2.default.string),
    keywordQuotes: _propTypes2.default.bool,
    isHome: _propTypes2.default.bool,
    getSearchResult: _propTypes2.default.func,
    changeTerm: _propTypes2.default.func,
    getAutocomplete: _propTypes2.default.func,
    onSearchSubmit: _propTypes2.default.func,
    autocomplete: _propTypes2.default.arrayOf(_propTypes2.default.object),
    // For SearchBox
    placeholder: _propTypes2.default.string,
    textSubmit: _propTypes2.default.string,
    // For Autocomplete
    textNoResult: _propTypes2.default.string
};

SearchContainer.defaultProps = {
    getSearchResult: function getSearchResult(f) {
        return f;
    },
    changeTerm: function changeTerm(f) {
        return f;
    },
    getAutocomplete: function getAutocomplete(f) {
        return f;
    },
    autocomplete: function autocomplete(f) {
        return f;
    },
    onSearchSubmit: function onSearchSubmit(f) {
        return f;
    },
    isHome: true,
    location: {
        query: {}
    },
    typeInclude: [],
    keywordQuotes: false,
    // For SearchBox
    placeholder: '',
    textSubmit: 'Search',
    // For Autocomplete
    textNoResult: 'No results available'
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return {
        autocomplete: state.autocomplete,
        visibilityFilter: state.visibilityFilter
    };
}, { getAutocomplete: _actions.getAutocomplete, changeTerm: _actions2.changeTerm, getSearchResult: _actions.getSearchResult })(SearchContainer);