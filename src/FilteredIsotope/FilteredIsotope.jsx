import React from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Isotope from 'isotope-layout';
import Element from './Element';

/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */
class FilteredIsotope extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isotope: null,
            reload: true,
        };
        this.createIsotope = this.createIsotope.bind(this);
    }

    createIsotope() {
        const { getSortData, sortBy, sortOrder, wholeWord, searchTerm, filterList } = this.props;
        const { isotope } = this.state;

        const reg = wholeWord ? RegExp(`\\b${searchTerm.toLowerCase().trim()}\\b`, 'i') : RegExp(`${searchTerm.toLowerCase().trim()}`, 'i');

        if (!isotope) {
            this.setState({ isotope: new Isotope(ReactDOM.findDOMNode(this), {
                layoutMode: 'fitRows',
                getSortData,
                sortBy: sortBy || 'original-order',
                sortAscending: sortOrder ? sortOrder === 'asc' : true,
                filter: itemElem => (!filterList || filterList.length === 0 || filterList.every(filter => filter(itemElem))) && reg.test(itemElem.querySelector('.isotope-search').innerText),
            }) });
        } else {
            this.state.isotope.reloadItems();
        }
    }

    componentWillMount() {}

    componentDidMount() {
        this.createIsotope();
    }

    componentWillReceiveProps(nextProps) {
        const reload = JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
        const options = {};

        if (JSON.stringify(this.props.getSortData) !== JSON.stringify(nextProps.getSortData)) {
            this.state.isotope.destroy();
            const reg = nextProps.wholeWord ? RegExp(`\\b${nextProps.searchTerm.toLowerCase().trim()}\\b`, 'i') : RegExp(`${nextProps.searchTerm.toLowerCase().trim()}`, 'i');
            options.getSortData = nextProps.getSortData;
            options.sortBy = nextProps.sortBy || 'original-order';
            options.sortAscending = nextProps.sortOrder ? nextProps.sortOrder === 'asc' : true;
            options.filter = itemElem => (!nextProps.filterList || nextProps.filterList.length === 0 || nextProps.filterList.every(filter => filter(itemElem))) && reg.test(itemElem.querySelector('.isotope-search').innerText);
            if (reload !== this.state.reload) {
                this.setState({
                    isotope: new Isotope(ReactDOM.findDOMNode(this), {
                        layoutMode: 'fitRows',
                        getSortData: nextProps.getSortData,
                        ...options,
                    }),
                    reload,
                });
            } else {
                this.setState({
                    isotope: new Isotope(ReactDOM.findDOMNode(this), {
                        layoutMode: 'fitRows',
                        getSortData: nextProps.getSortData,
                        ...options,
                    }),
                });
            }
        } else {
            if (this.props.sortBy !== nextProps.sortBy) options.sortBy = nextProps.sortBy || 'original-order';
            if (this.props.sortOrder !== nextProps.sortOrder) options.sortAscending = nextProps.sortOrder ? nextProps.sortOrder === 'asc' : true;
            if (this.props.searchTerm.toLowerCase().trim() !== nextProps.searchTerm.toLowerCase().trim() ||
                JSON.stringify(this.props.filterList) !== JSON.stringify(nextProps.filterList)) {
                const reg = nextProps.wholeWord ? RegExp(`\\b${nextProps.searchTerm.toLowerCase().trim()}\\b`, 'i') : RegExp(`${nextProps.searchTerm.toLowerCase().trim()}`, 'i');
                options.filter = itemElem => (!nextProps.filterList || nextProps.filterList.length === 0 || nextProps.filterList.every(filter => filter(itemElem))) && reg.test(itemElem.querySelector('.isotope-search').innerText);
            }

            if (reload !== this.state.reload) this.setState({ reload });
            if (options) this.state.isotope.arrange({ ...options });
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

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidUpdate() {
        if (this.state.isotope) {
            if (this.state.reload) {
                this.state.isotope.reloadItems();
            }
            this.state.isotope.arrange();
        }
    }

    componentWillUnmount() {
        if (this.state.isotope) {
            this.state.isotope.destroy();
        }
    }

    render() {
        const { className, data, itemDisplay } = this.props;

        return (
            <div className={classNames(className, 'wfui-isotope-grid')}>
                {
                    data.map((item, idx) => (
                        <Element item={item} itemDisplay={itemDisplay} key={idx} />
                    ))
                }
            </div>
        );
    }
}

FilteredIsotope.propTypes = {
    itemDisplay: PropTypes.element.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    className: PropTypes.string,
    getSortData: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ])),
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
    searchTerm: PropTypes.string,
    wholeWord: PropTypes.bool,
    filterList: PropTypes.arrayOf(PropTypes.func),
};

FilteredIsotope.defaultProps = {
    getSortData: {},
    sortOrder: 'asc',
    sortBy: '',
    wholeWord: false,
    searchTerm: '',
    filterList: [],
};

export default FilteredIsotope;
