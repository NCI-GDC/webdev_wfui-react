import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ value, onInputChange, onSearchSubmit, onReset, textSubmit, placeholder }) => (
    <form id="cbw-search-jobs" className="form-inline webform-search">
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="search-jobs-keyword"
                placeholder={placeholder}
                value={value}
                onChange={onInputChange}
                autoComplete="off"
            />

        </div>
        {value && <a className="search-reset" onClick={onReset}><span className="sr-only">Reset</span></a>} {/* invisible */}
        <button type="submit" className="btn btn-primary" onClick={onSearchSubmit}>
            {textSubmit}
        </button>
    </form>
);

SearchBox.propTypes = {
    value: PropTypes.string,
    onInputChange: PropTypes.func,
    onSearchSubmit: PropTypes.func,
    onReset: PropTypes.func,
    textSubmit: PropTypes.string,
    placeholder: PropTypes.string,
};

SearchBox.defaultProps = {
    value: '',
    onInputChange: f => f,
    onSearchSubmit: f => f,
    OnReset: f => f,
    intl: f => f,
    textSubmit: 'Search',
    placeholder: '',
};

export default SearchBox;
