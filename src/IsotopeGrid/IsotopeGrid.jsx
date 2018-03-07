import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Isotope from 'isotope-layout';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { stringifyValues } from '../util/stringifyValues';

const columnProps = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
        size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
        order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
]);

class IsotopeItem extends React.Component {
    render() {
        const { index, id, width, xs, sm, md, lg, children, item, itemDisplay } = this.props;

        if (width) {
            return (
                <div
                    key={index}
                    className={classNames(
                        `${id}-item ${index === 0 ? 'wfui-isotope-grid-sizer' : ''}`,
                        'wfui-isotope-item',
                    )}
                    style={{ width: `${width}px` }}
                    data-item={stringifyValues(item)}
                >
                    {itemDisplay
                        ? cloneElement(itemDisplay, { ...this.props })
                        : cloneElement(children, { ...this.props })}
                </div>
            );
        }

        return (
            <Col
                key={index}
                className={classNames(
                    `${id}-item ${index} ${index === 0 ? 'wfui-isotope-grid-sizer' : ''}`,
                    'wfui-isotope-item',
                )}
                xs={xs}
                sm={sm}
                md={md}
                lg={lg}
                data-item={stringifyValues(item)}
            >
                {itemDisplay
                    ? cloneElement(itemDisplay, { ...this.props })
                    : cloneElement(children, { ...this.props })}
            </Col>
        );
    }
}

IsotopeItem.propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    width: PropTypes.number,
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    children: PropTypes.node,
    item: PropTypes.any,
};

IsotopeItem.defaultProps = {
    role: 'item',
};

const ITEM_ROLE = IsotopeItem.defaultProps.role;

class IsotopeGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isotope: null,
            reload: true,
        };
        this.createIsotope = this.createIsotope.bind(this);
    }

    createIsotope() {
        const {
            id,
            wholeWord,
            searchTerm,
            filterList,
            sortBy,
            sortAscending,
            getSortData,
            onArrangeComplete,
        } = this.props;
        const { isotope } = this.state;

        const reg = wholeWord
            ? RegExp(`\\b${searchTerm.toLowerCase().trim()}\\b`, 'i')
            : RegExp(`${searchTerm.toLowerCase().trim()}`, 'i');

        if (!isotope) {
            const isotope = new Isotope(ReactDOM.findDOMNode(this), {
                itemSelector: `.${id}-item`,
                masonry: {
                    columnWidth: '.wfui-isotope-grid-sizer',
                    horizontalOrder: true,
                },
                sortBy,
                sortAscending,
                getSortData,
                filter(itemElem) {
                    const isoSearch = itemElem ? itemElem.dataset.item : this.dataset.item;
                    return (
                        (!filterList ||
                            filterList.length === 0 ||
                            filterList.every(filter => filter(itemElem || this))) &&
                        reg.test(isoSearch || '')
                    );
                },
            });
            // Set event listener
            isotope.on('arrangeComplete', onArrangeComplete);
            onArrangeComplete(isotope.getFilteredItemElements());
            this.setState({
                isotope,
            });
        } else {
            this.state.isotope.reloadItems();
        }
    }

    componentDidMount() {
        this.createIsotope();
    }

    componentWillReceiveProps(nextProps) {
        const oldElems = [];

        if (Array.isArray(this.props.children)) {
            this.props.children.forEach((item) => {
                if (Array.isArray(item)) {
                    item.forEach(i => oldElems.push(i));
                } else {
                    oldElems.push(item);
                }
            });
        } else {
            oldElems.push(this.props.children);
        }

        const newElems = [];

        if (Array.isArray(nextProps.children)) {
            nextProps.children.forEach((item) => {
                if (Array.isArray(item)) {
                    item.forEach(i => newElems.push(i));
                } else {
                    newElems.push(item);
                }
            });
        } else {
            newElems.push(nextProps.children);
        }
        const reload = oldElems.length !== newElems.length;
        const options = {};
        if (
            this.props.searchTerm.toLowerCase().trim() !==
                nextProps.searchTerm.toLowerCase().trim() ||
            JSON.stringify(this.props.filterList) !== JSON.stringify(nextProps.filterList) ||
            JSON.stringify(this.props.category) !== JSON.stringify(nextProps.category)
        ) {
            const reg = nextProps.wholeWord
                ? RegExp(`\\b${nextProps.searchTerm.toLowerCase().trim()}\\b`, 'i')
                : RegExp(`${nextProps.searchTerm.toLowerCase().trim()}`, 'i');
            options.filter = function (itemElem) {
                const isoSearch = itemElem ? itemElem.dataset.item : this.dataset.item;
                return (
                    (!nextProps.filterList ||
                        nextProps.filterList.length === 0 ||
                        nextProps.filterList.every(filter => filter(itemElem || this))) &&
                    reg.test(isoSearch || '')
                );
            };
        }
        if (this.props.sortBy !== nextProps.sortBy) {
            options.sortBy = nextProps.sortBy;
        }
        if (this.props.sortAscending !== nextProps.sortAscending) {
            options.sortAscending = nextProps.sortAscending;
        }
        if (JSON.stringify(this.props.getSortData) !== JSON.stringify(nextProps.getSortData)) {
            options.getSortData = nextProps.getSortData;
        }

        if (reload !== this.state.reload) this.setState({ reload });
        if (Object.keys(options).length && this.state.isotope) {
            this.state.isotope.arrange({ ...options });
        } else if (Object.keys(options).length) {
            this.createIsotope();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidUpdate() {
        if (this.state.isotope) {
            if (this.state.reload) {
                this.state.isotope.reloadItems();
            }
        }
    }

    componentWillUnmount() {
        if (this.state.isotope) {
            this.state.isotope.destroy();
        }
    }

    render() {
        const { id, width, xs, sm, md, lg, children, className } = this.props;
        const { isotope } = this.state;
        const elems = [];

        if (Array.isArray(children)) {
            children.forEach((item) => {
                if (Array.isArray(item)) {
                    item.forEach(i => elems.push(i));
                } else {
                    elems.push(item);
                }
            });
        } else {
            elems.push(children);
        }

        if (width) {
            return (
                <div
                    id={id}
                    className={classNames(className, `${id}-grid`, 'wfui-isotope-grid')}
                    style={{ width: '100%' }}
                >
                    {elems &&
                        elems.map((child, index) => {
                            if (!child) return null;
                            switch (child.props.role) {
                                case ITEM_ROLE:
                                    return cloneElement(child, {
                                        index,
                                        id,
                                        width,
                                        xs,
                                        sm,
                                        md,
                                        lg,
                                        isotope,
                                    });
                                default:
                                    return null;
                            }
                        })}
                </div>
            );
        }

        return (
            <Row id={id} className={classNames(`${id}-grid`, 'wfui-isotope-grid')}>
                {elems &&
                    elems.map((child, index) => {
                        if (!child || child.length === 0 || !child.props.role) return null;
                        switch (child.props.role) {
                            case ITEM_ROLE:
                                return cloneElement(child, {
                                    index,
                                    id,
                                    width,
                                    xs,
                                    sm,
                                    md,
                                    lg,
                                    isotope,
                                });
                            default:
                                return null;
                        }
                    })}
            </Row>
        );
    }
}

IsotopeGrid.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    width: PropTypes.number,
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    children: PropTypes.node,
    sortBy: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
    sortAscending: PropTypes.bool,
    getSortData: PropTypes.object,
    searchTerm: PropTypes.string,
    wholeWord: PropTypes.bool,
    filterList: PropTypes.arrayOf(PropTypes.func),
    onArrangeComplete: PropTypes.func,
};

IsotopeGrid.defaultProps = {
    searchTerm: '',
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    sortBy: 'original-order',
    sortAscending: true,
    onArrangeComplete: f => f,
};

IsotopeGrid.Item = IsotopeItem;

export default connect(state => ({
    category: state.visibilityFilter && state.visibilityFilter.category,
}))(IsotopeGrid);
