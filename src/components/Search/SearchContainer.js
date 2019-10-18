/* global window */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '..';
import { getAutocomplete, getSearchResult } from './actions';
import { changeTerm } from '../util/visibilityFilter/actions';
import SearchBox from './SearchBox';
import SearchAutocomplete from './SearchAutocomplete';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            autoFetched: false,
            secondsElapsed: 0,
            startAutosearch: false,
            term: props.location.query.q ? props.location.query.q : '',
            autoTerm: '',
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
    }

    componentWillMount() {
        const { config, location, typeInclude, keywordQuotes } = this.props;
        if (location.query && location.query.q) {
            this.props.getSearchResult(config, {
                keyword: location.query.q,
                typeInclude,
                keywordQuotes,
            });
        } else {
            this.props.getSearchResult(config, {
                keyword: '',
                typeInclude,
                keywordQuotes,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            !this.props.location.query ||
            (nextProps.location.query.q &&
                nextProps.location.query.q !== this.props.location.query.q)
        ) {
            this.searchSubmit(nextProps.location.query.q);
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onSearchSubmit(e) {
        e.preventDefault();
        this.searchSubmit(this.state.term);
    }

    onInputChange(e) {
        this.setState({
            term: e.target.value,
            secondsElapsed: 0,
            fetching: false,
            startAutosearch: true,
        });
    }

    onReset() {
        const { isHome, config } = this.props;
        if (isHome) {
            this.searchSubmit('');
        } else {
            this.state = {
                secondsElapsed: 0,
                term: '',
                autoTerm: '',
                startAutosearch: false,
            };
        }
    }

    searchSubmit(term) {
        const {
            onSearchSubmit,
            config,
            typeInclude,
            keywordQuotes,
        } = this.props;
        this.state = {
            fetching: false,
            autoFetched: false,
            secondsElapsed: 0,
            term: term || '',
            autoTerm: term,
            startAutosearch: false,
        };
        this.props.getSearchResult(config, {
            keyword: term.trim(),
            typeInclude,
            keywordQuotes,
        });
        this.props.changeTerm(term);
        onSearchSubmit();
    }

    tick() {
        const { isHome, config, typeInclude } = this.props;
        const { fetching, secondsElapsed, term, autoTerm } = this.state;
        if (!fetching) {
            if (secondsElapsed > 3) {
                if (term.length > 0 && autoTerm !== term) {
                    this.setState({
                        autoTerm: term,
                        secondsElapsed: 0,
                        fetching: true,
                        autoFetched: false,
                    });
                    this.props
                        .getAutocomplete(config, { keyword: term, typeInclude })
                        .then(() => {
                            this.setState({
                                fetching: false,
                                autoFetched: true,
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
                            autoTerm: term,
                        });
                    }
                }
            } else {
                this.setState(prevState => ({
                    secondsElapsed: prevState.secondsElapsed + 1,
                }));
            }
        }
    }

    render() {
        const {
            autocomplete,
            placeholder,
            textSubmit,
            textNoResult,
        } = this.props;
        const { fetching, autoFetched, term, startAutosearch } = this.state;

        return (
            <div className="wfui-search-container">
                <SearchBox
                    placeholder={placeholder}
                    textSubmit={textSubmit}
                    onInputChange={this.onInputChange}
                    value={term}
                    onSearchSubmit={this.onSearchSubmit}
                    onReset={this.onReset}
                />
                {fetching && (
                    <ul
                        id="ui-id-1"
                        className="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
                    >
                        <li className="mp ps">
                            <Spinner
                                type={1}
                                color="#0072c6"
                                fontSize="5px"
                                margin="10px auto"
                            />
                        </li>
                    </ul>
                )}
                {autoFetched && startAutosearch && (
                    <SearchAutocomplete
                        textNoResult={textNoResult}
                        autocomplete={autocomplete}
                        onClickTerm={e => {
                            this.searchSubmit(
                                e.target.getAttribute('data-keyword')
                            );
                        }}
                    />
                )}
            </div>
        );
    }
}

SearchContainer.propTypes = {
    config: PropTypes.shape({
        API_HOST: PropTypes.string,
        APP_ID: PropTypes.string,
        API_SEARCH: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
        query: PropTypes.shape({
            q: PropTypes.string,
        }),
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
    textNoResult: PropTypes.string,
};

SearchContainer.defaultProps = {
    getSearchResult: f => f,
    changeTerm: f => f,
    getAutocomplete: f => f,
    autocomplete: f => f,
    onSearchSubmit: f => f,
    isHome: true,
    location: {
        query: {},
    },
    typeInclude: [],
    keywordQuotes: false,
    // For SearchBox
    placeholder: '',
    textSubmit: 'Search',
    // For Autocomplete
    textNoResult: 'No results available',
};

export default connect(
    state => ({
        autocomplete: state.autocomplete,
        visibilityFilter: state.visibilityFilter,
    }),
    { getAutocomplete, changeTerm, getSearchResult }
)(SearchContainer);
