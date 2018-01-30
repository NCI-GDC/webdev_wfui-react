import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Isotope from 'isotope-layout';
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery';

const columnProps = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
        size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
        // example size values:
        // 12 || "12" => col-12 or col-`width`-12
        // auto => col-auto or col-`width`-auto
        // true => col or col-`width`
        order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
]);

const IsotopeItem = ({ key, id, width, xs, sm, md, lg, children }) =>
    width ? (
        <div key={key} className={classNames(`${id}-item`, 'wfui-isotope-item')} style={{ width }}>
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
        const { id, wholeWord, searchTerm, filterList } = this.props;
        const { isotope } = this.state;

        const reg = wholeWord
            ? RegExp(`\\b${searchTerm.toLowerCase().trim()}\\b`, 'i')
            : RegExp(`${searchTerm.toLowerCase().trim()}`, 'i');

        if (!isotope) {
            this.setState({
                isotope: new Isotope(ReactDOM.findDOMNode(this), {
                    itemSelector: `.${id}-item`,
                    layoutMode: 'fitRows',
                    filter: (itemElem) => {
                        const isoSearch = itemElem
                            ? itemElem.querySelector('.isotope-search')
                            : $(this).find('.isotope-search');
                        return (
                            (!filterList ||
                                filterList.length === 0 ||
                                filterList.every(filter => filter(itemElem || $(this)))) &&
                            reg.test(isoSearch ? isoSearch.innerText : '')
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
            JSON.stringify(this.props.filterList) !== JSON.stringify(nextProps.filterList)
        ) {
            const reg = nextProps.wholeWord
                ? RegExp(`\\b${nextProps.searchTerm.toLowerCase().trim()}\\b`, 'i')
                : RegExp(`${nextProps.searchTerm.toLowerCase().trim()}`, 'i');
            options.filter = (itemElem) => {
                const isoSearch = itemElem
                    ? itemElem.querySelector('.isotope-search')
                    : $(this).find('.isotope-search');
                return (
                    (!nextProps.filterList ||
                        nextProps.filterList.length === 0 ||
                        nextProps.filterList.every(filter => filter(itemElem || $(this)))) &&
                    reg.test(isoSearch ? isoSearch.innerText : '')
                );
            };
        }

        if (reload !== this.state.reload) this.setState({ reload });
        if (options) this.state.isotope.arrange({ ...options });
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
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
    searchTerm: PropTypes.string,
    wholeWord: PropTypes.bool,
    filterList: PropTypes.arrayOf(PropTypes.func),
};

IsotopeGrid.defaultProps = {
    searchTerm: '',
    sm: 12,
    md: 6,
    lg: 4,
};

IsotopeGrid.Item = IsotopeItem;

export default IsotopeGrid;
