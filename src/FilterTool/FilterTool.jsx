/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFilter, changeFilter } from '../util/visibilityFilter/actions';
import FilterItems from './FilterItems';

class FilterTool extends React.Component {

    constructor() {
        super();
        this.onHandleClick = this.onHandleClick.bind(this);
    }
    
    componentWillMount() {
        const { filters, location: { query } } = this.props;
        this.applyFilters(query, filters, this.props);
    }

    componentWillReceiveProps(nextProps) {
        const { location: { query } } = this.props;
        if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
            this.applyFilters(query, nextProps.filters, this.props);
        }
    }

    applyFilters(query, filters, props) {
        if (query[props.type]) {
            const items = query[props.type].split(',');
            this.props.changeFilter([{ key: props.type, value: items.filter(item => (filters[props.type].map(o => (o._id)).includes(decodeURI(item)))) }], 'category');
        }
    }

    onHandleClick(e) {
        const { onHandleClick } = this.props;
        this.props.toggleFilter({ key: e.target.getAttribute('data-type'), value: e.target.value });
        onHandleClick();
    }

    render() {
        const { label, type, filters, search, filterItems, items, category, filter, defaultExpand, numCollapse, textMore, textLess } = this.props;

        // Filter by search
        const filteredItems = search.all ? items : items.filter(job => search.results.includes(job.permalink)) || [];

        return (
            <div className="wfui-filter-group">
                <FilterItems
                    label={label}
                    filterItems={filterItems || filters[type].map(item => ({ _id: item._id, key: item._key || item._id, count: item.count }))}
                    type={type}
                    category={category}
                    onHandleClick={this.onHandleClick}
                    items={filteredItems}
                    defaultExpand={defaultExpand}
                    numCollapse={numCollapse}
                    textMore={textMore}
                    textLess={textLess}
                    filter={filter}
                />
            </div>
        );
    }
}

FilterTool.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    search: PropTypes.object,
    filters: PropTypes.object,
    category: PropTypes.object,
    filterItems: PropTypes.arrayOf(PropTypes.object),
    items: PropTypes.arrayOf(PropTypes.object),
    changeFilter: PropTypes.func,
    toggleFilter: PropTypes.func,
    onHandleClick: PropTypes.func,
    defaultExpand: PropTypes.bool,
    numCollapse: PropTypes.number,
    textMore: PropTypes.string,
    textLess: PropTypes.string,
    filter: PropTypes.func,
};
FilterTool.defaultProps = {
    type_opt_not: PropTypes.number,
    changeFilter: f => f,
    onHandleClick: f => f,
    defaultExpand: false,
    numCollapse: 10,
    location: { query: {} },
};

export default connect(
    state => ({
        filters: state.filters,
        search: state.search || {},
        category: state.visibilityFilter && state.visibilityFilter.category,
    }),
    { toggleFilter, changeFilter },
)(FilterTool);
