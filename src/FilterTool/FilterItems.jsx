/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class FilterItems extends React.Component {
    constructor() {
        super();
        this.state = { open: false };
        this.countNumbers = this.countNumbers.bind(this);
    }
    countNumbers(item) {
        const { items, type, category, filter } = this.props;
        const countFilter = Object.assign({}, category, { [type]: [item.key || item._id] });
        const itemCount = filter ? items.filter(filter(countFilter)).length : item.count;
        return itemCount;
    }
    render() {
        const { label, filterItems, items, type, category, onHandleClick, numCollapse, defaultExpand, textLess, textMore } = this.props;
        const { open } = this.state;
        const selectedItems = (category && category[type]) || [];

        if (filterItems) {
            // Filter out null object
            const _filterItems = filterItems.filter(item => (item._id));

            // If there is not types, then don't display;
            if (_filterItems.length === 0) return null;

            const displayItems = _filterItems.slice(0, numCollapse + 1);
            const collapsedItems = _filterItems.slice(numCollapse + 1);
            const readMore = open ? <a href="#" id="toggleButton" className="toggleButton toggleButtonMore" onClick={(e) => { e.preventDefault(); this.setState({ open: false })}}><p><span className="showless"></span>{textLess}</p></a>:
                                    <a href="#" id="toggleButton" className="toggleButton toggleButtonMore" onClick={(e) => { e.preventDefault(); this.setState({ open: true })}}><p><span className="showmore"></span>{textMore}</p></a>;

            return (
                <fieldset>
                    <legend><a className={`${defaultExpand} ? '': 'collapsed'`}role="button" data-toggle="collapse" href={`#search-filters-${type}`} aria-expanded={defaultExpand} aria-controls={`search-filters-${type}`}>{label}</a></legend>
                    <div className={`collapse ${defaultExpand ? 'in':''}`} id={`search-filters-${type}`}>
                        <div className={`checkbox ${Object.keys(category).length === 0 ? '' : 'filter-selected'}`}>
                            {displayItems.map((item, i) => {
                                const itemCount = this.countNumbers(item);
                                return <label key={i} className={!itemCount ? 'no-data' : ''}><input type="checkbox" data-type={type} value={item.key || item._id} onClick={onHandleClick} checked={selectedItems.includes(item.key || item._id)} />{ item._id }<span className="filtercount"> {itemCount} </span></label>;
                            })}
                            <div id="showmore"></div>
                            <ReactCSSTransitionGroup
                                transitionName={'fadein'}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={0}
                            >
                                {open && collapsedItems.length > 0 && collapsedItems.map((item, i) => {
                                    const itemCount = this.countNumbers(item);
                                    return <label key={i} className={!itemCount ? 'no-data' : ''}><input type="checkbox" data-type={type} value={item.key || item._id} onClick={onHandleClick} checked={selectedItems.includes(item.key || item._id)} />{ item._id }<span className="filtercount"> {itemCount} </span></label>
                                })}
                            </ReactCSSTransitionGroup>
                            {collapsedItems.length > 0 && readMore }
                        </div>
                    </div>
                </fieldset>
            )
        }

        return null;
    }
}
FilterItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.string,
    type: PropTypes.string,
    filterItems: PropTypes.arrayOf(PropTypes.object),
    category: PropTypes.object,
    onHandleClick: PropTypes.func,
    numCollapse: PropTypes.number,
    defaultExpand: PropTypes.bool,
    textMore: PropTypes.string,
    textLess: PropTypes.string,
};
FilterItems.defaultProps = {
    defaultExpand: false,
    numCollapse: 10,
    onHandleClick: f => f,
    textMore: 'More',
    textLess: 'Less',
};

export default FilterItems;
