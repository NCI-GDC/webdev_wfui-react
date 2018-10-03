/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import * as Actions from '../util/visibilityFilter/actions';

class FilterItem extends React.Component {
    constructor() {
        super();
        this.onHandleChange = this.onHandleChange.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    }

    componentWillMount() {
        const {
            name,
            location: { query },
        } = this.props;
        if (query[name]) {
            this.applyFilters(name, decodeURI(query[name]));
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            location: { query },
            name,
        } = this.props;
        if (query[name] && !nextProps.location.query[name]) {
            this.applyFilters(name, '');
        } else if (nextProps.location.query[name] !== query[name]) {
            this.applyFilters(name, decodeURI(nextProps.location.query[name]));
        }
    }

    onHandleChange(e) {
        const { onHandleChange, name } = this.props;
        this.applyFilters(name, e.target.value);
        onHandleChange();
    }

    applyFilters(key, value) {
        const { filterType, changeFilter, toggleFilter } = this.props;

        switch (filterType) {
            case 'change':
                changeFilter([{ key, value }]);
                break;
            case 'toggle':
                toggleFilter([{ key, value }]);
                break;
            default:
                changeFilter([{ key, value }]);
        }
    }

    render() {
        const { label, className, component } = this.props;

        return (
            <FormGroup className={classNames(className, 'wfui-filters-item')}>
                {label ? <ControlLabel>{label}</ControlLabel> : null}
                <FormGroup>
                    {React.createElement(component, {
                        ...this.props,
                        onHandleChange: this.onHandleChange,
                    })}
                </FormGroup>
            </FormGroup>
        );
    }
}

FilterItem.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    category: PropTypes.object,
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
    filterType: PropTypes.string,
    changeFilter: PropTypes.func,
    toggleFilter: PropTypes.func,
    onHandleChange: PropTypes.func,
    location: PropTypes.shape({
        query: PropTypes.object,
    }),
    capitalize: PropTypes.bool,
};

FilterItem.defaultProps = {
    changeFilter: f => f,
    onHandleChange: f => f,
    location: { query: {} },
    className: 'wfui-filters-item',
    filterType: 'change',
    items: [],
};

export default connect(
    state => ({
        category: state.visibilityFilter && state.visibilityFilter.category,
    }),
    Actions,
)(FilterItem);
