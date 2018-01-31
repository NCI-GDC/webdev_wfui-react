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

const IsotopeItem = ({ key, id, width, xs, sm, md, lg, children, item }) =>
    width ? (
        <div
            key={key}
            className={classNames(`${id}-item`, 'wfui-isotope-item')}
            style={{ width: `${width}px` }}
            data-item={stringifyValues(item)}
        >
            {children}
        </div>
    ) : (
        <Col
            key={key}
            className={classNames(`${id}-item`, 'wfui-isotope-item')}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            data-item={stringifyValues(item)}
        >
            {children}
        </Col>
    );

IsotopeItem.propTypes = {
    key: PropTypes.number,
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
        } = this.props;
        const { isotope } = this.state;

        const reg = wholeWord
            ? RegExp(`\\b${searchTerm.toLowerCase().trim()}\\b`, 'i')
            : RegExp(`${searchTerm.toLowerCase().trim()}`, 'i');

        if (!isotope) {
            this.setState({
                isotope: new Isotope(ReactDOM.findDOMNode(this), {
                    itemSelector: `.${id}-item`,
                    layoutMode: 'fitRows',
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
                }),
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

        this.props.children.forEach((item) => {
            if (Array.isArray(item)) {
                item.forEach(i => oldElems.push(i));
            } else {
                oldElems.push(item);
            }
        });

        const newElems = [];

        nextProps.children.forEach((item) => {
            if (Array.isArray(item)) {
                item.forEach(i => newElems.push(i));
            } else {
                newElems.push(item);
            }
        });
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
        } else if (!Object.keys(options).length) {
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
            this.state.isotope.arrange();
        }
    }

    componentWillUnmount() {
        if (this.state.isotope) {
            this.state.isotope.destroy();
        }
    }

    render() {
        const { id, width, xs, sm, md, lg, children, className } = this.props;

        const elems = [];

        children.forEach((item) => {
            if (Array.isArray(item)) {
                item.forEach(i => elems.push(i));
            } else {
                elems.push(item);
            }
        });

        if (width) {
            return (
                <div
                    id={id}
                    className={classNames(className, `${id}-grid`, 'wfui-isotope-grid')}
                    style={{ width: '100%' }}
                >
                    {elems &&
                        elems.map((child, key) => {
                            if (!child) return null;
                            switch (child.props.role) {
                                case ITEM_ROLE:
                                    return cloneElement(child, {
                                        key,
                                        id,
                                        width,
                                        xs,
                                        sm,
                                        md,
                                        lg,
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
                    elems.map((child, key) => {
                        if (!child || child.length === 0 || !child.props.role) return null;
                        switch (child.props.role) {
                            case ITEM_ROLE:
                                return cloneElement(child, {
                                    key,
                                    id,
                                    width,
                                    xs,
                                    sm,
                                    md,
                                    lg,
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
};

IsotopeGrid.defaultProps = {
    searchTerm: '',
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    sortBy: 'original-order',
    sortAscending: true,
};

IsotopeGrid.Item = IsotopeItem;

export default IsotopeGrid;
