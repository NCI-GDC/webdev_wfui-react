function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global window */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '..';
import { getAutocomplete, getSearchResult } from './actions';
import { changeTerm } from '../util/visibilityFilter/actions';
import SearchBox from './SearchBox';
import SearchAutocomplete from './SearchAutocomplete';

var SearchContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SearchContainer, _React$Component);

  function SearchContainer(props) {
    var _this;

    _classCallCheck(this, SearchContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchContainer).call(this, props));
    _this.state = {
      fetching: false,
      autoFetched: false,
      secondsElapsed: 0,
      startAutosearch: false,
      term: props.location.query.q ? props.location.query.q : '',
      autoTerm: ''
    };
    _this.onInputChange = _this.onInputChange.bind(_assertThisInitialized(_this));
    _this.onSearchSubmit = _this.onSearchSubmit.bind(_assertThisInitialized(_this));
    _this.onReset = _this.onReset.bind(_assertThisInitialized(_this));
    _this.searchSubmit = _this.searchSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SearchContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          config = _this$props.config,
          location = _this$props.location,
          typeInclude = _this$props.typeInclude,
          keywordQuotes = _this$props.keywordQuotes;

      if (location.query && location.query.q) {
        this.props.getSearchResult(config, {
          keyword: location.query.q,
          typeInclude: typeInclude,
          keywordQuotes: keywordQuotes
        });
      } else {
        this.props.getSearchResult(config, {
          keyword: '',
          typeInclude: typeInclude,
          keywordQuotes: keywordQuotes
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.location.query || nextProps.location.query.q && nextProps.location.query.q !== this.props.location.query.q) {
        this.searchSubmit(nextProps.location.query.q);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        return _this2.tick();
      }, 100);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "onSearchSubmit",
    value: function onSearchSubmit(e) {
      e.preventDefault();
      this.searchSubmit(this.state.term);
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(e) {
      this.setState({
        term: e.target.value,
        secondsElapsed: 0,
        fetching: false,
        startAutosearch: true
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$props2 = this.props,
          isHome = _this$props2.isHome,
          config = _this$props2.config;

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
    key: "searchSubmit",
    value: function searchSubmit(term) {
      var _this$props3 = this.props,
          onSearchSubmit = _this$props3.onSearchSubmit,
          config = _this$props3.config,
          typeInclude = _this$props3.typeInclude,
          keywordQuotes = _this$props3.keywordQuotes;
      this.state = {
        fetching: false,
        autoFetched: false,
        secondsElapsed: 0,
        term: term || '',
        autoTerm: term,
        startAutosearch: false
      };
      this.props.getSearchResult(config, {
        keyword: term.trim(),
        typeInclude: typeInclude,
        keywordQuotes: keywordQuotes
      });
      this.props.changeTerm(term);
      onSearchSubmit();
    }
  }, {
    key: "tick",
    value: function tick() {
      var _this3 = this;

      var _this$props4 = this.props,
          isHome = _this$props4.isHome,
          config = _this$props4.config,
          typeInclude = _this$props4.typeInclude;
      var _this$state = this.state,
          fetching = _this$state.fetching,
          secondsElapsed = _this$state.secondsElapsed,
          term = _this$state.term,
          autoTerm = _this$state.autoTerm;

      if (!fetching) {
        if (secondsElapsed > 3) {
          if (term.length > 0 && autoTerm !== term) {
            this.setState({
              autoTerm: term,
              secondsElapsed: 0,
              fetching: true,
              autoFetched: false
            });
            this.props.getAutocomplete(config, {
              keyword: term,
              typeInclude: typeInclude
            }).then(function () {
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
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props5 = this.props,
          autocomplete = _this$props5.autocomplete,
          placeholder = _this$props5.placeholder,
          textSubmit = _this$props5.textSubmit,
          textNoResult = _this$props5.textNoResult;
      var _this$state2 = this.state,
          fetching = _this$state2.fetching,
          autoFetched = _this$state2.autoFetched,
          term = _this$state2.term,
          startAutosearch = _this$state2.startAutosearch;
      return React.createElement("div", {
        className: "wfui-search-container"
      }, React.createElement(SearchBox, {
        placeholder: placeholder,
        textSubmit: textSubmit,
        onInputChange: this.onInputChange,
        value: term,
        onSearchSubmit: this.onSearchSubmit,
        onReset: this.onReset
      }), fetching && React.createElement("ul", {
        id: "ui-id-1",
        className: "ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
      }, React.createElement("li", {
        className: "mp ps"
      }, React.createElement(Spinner, {
        type: 1,
        color: "#0072c6",
        fontSize: "5px",
        margin: "10px auto"
      }))), autoFetched && startAutosearch && React.createElement(SearchAutocomplete, {
        textNoResult: textNoResult,
        autocomplete: autocomplete,
        onClickTerm: function onClickTerm(e) {
          _this4.searchSubmit(e.target.getAttribute('data-keyword'));
        }
      }));
    }
  }]);

  return SearchContainer;
}(React.Component);

SearchContainer.propTypes = {
  config: PropTypes.shape({
    API_HOST: PropTypes.string,
    APP_ID: PropTypes.string,
    API_SEARCH: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      q: PropTypes.string
    })
  }),
  typeInclude: PropTypes.arrayOf(PropTypes.string),
  keywordQuotes: PropTypes.bool,
  isHome: PropTypes.bool,
  getSearchResult: PropTypes.func,
  changeTerm: PropTypes.func,
  getAutocomplete: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  autocomplete: PropTypes.arrayOf(PropTypes.object),
  // For SearchBox
  placeholder: PropTypes.string,
  textSubmit: PropTypes.string,
  // For Autocomplete
  textNoResult: PropTypes.string
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
export default connect(function (state) {
  return {
    autocomplete: state.autocomplete,
    visibilityFilter: state.visibilityFilter
  };
}, {
  getAutocomplete: getAutocomplete,
  changeTerm: changeTerm,
  getSearchResult: getSearchResult
})(SearchContainer);