/* global window */
import React from 'react';
import PropTypes from 'prop-types';

class FilterItems extends React.Component {
    constructor() {
        super();
        this.countNumbers = this.countNumbers.bind(this);
    }
    countNumbers(item) {
        const { items, type, category, filter } = this.props;
        const countFilter = Object.assign({}, category, { [type]: [item.key || item._id] });
        const itemCount = filter ? items.filter(filter(countFilter)).length : item.count;
        return itemCount;
    }
    render() {
        const { filterItems, key, type, category, onHandleClick } = this.props;
        const selectedItems = (category && category[type]) || [];

        const displayItems = (filterItems && filterItems.filter(item => (item._id))) || [];

        if (!displayItems || displayItems.length === 0) return null;

        return (
            <div className={`filter-collapse ${key}-filter collapse panel-collapse`} id={`filter-${key}`}>
                <div className="well">
                    {
                        displayItems.Items.map((item, idx) => {
                            const itemCount = this.countNumbers(item);
                            return (
                                <label
                                    key={idx}
                                    className={`label label-filter ${selectedItems.includes(item.key || item._id) ? 'active' : ''}`}
                                    onClick={onHandleClick}
                                    data-type={type}
                                    value={item.key || item._id}
                                >
                                    {item._id} ({itemCount})
                                </label>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
FilterItems.propTypes = {
    type: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    filterItems: PropTypes.arrayOf(PropTypes.object),
    category: PropTypes.object,
    onHandleClick: PropTypes.func,
    filter: PropTypes.func,
};
FilterItems.defaultProps = {
    onHandleClick: f => f,
    items: [],
};

export default FilterItems;
