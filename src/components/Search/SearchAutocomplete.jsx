/* global window */
import React from 'react';
import PropTypes from 'prop-types';

const Autocomplete = ({ autocomplete, onClickTerm, textNoResult }) => (
    <div className="navbar-form">
        <div className="form-group">
            <ul id="ui-autocomplete" className="autocomplete-ps ui-menu ui-widget ui-widget-content ui-autocomplete ui-front">
                { (!autocomplete || autocomplete.length === 0) && <li className="ui-menu-item">{textNoResult}</li>}
                { autocomplete && autocomplete.map((item, idx) => (
                        <li key={idx} className="ui-menu-item">
                            <div className="ui-menu-item-wrapper">
                                <a onClick={onClickTerm} data-keyword={item.keyword}>
                                    {`${item.keyword} (${item.count})`}
                                </a>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    </div>
);

Autocomplete.propTypes = {
    autocomplete: PropTypes.arrayOf(PropTypes.shape({
        keyword: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
    })),
    onClickTerm: PropTypes.func,
    textNoResult: PropTypes.string,
};

Autocomplete.defaultProps = {
    onClickTerm: f => f,
    intl: f => f,
    textNoResult: 'No results available',
};

export default Autocomplete;
