/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Alert } from 'react-bootstrap';

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import FilteredTable from '../FilteredTable/FilteredTable';

class CascadingPaneNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.cascNav || '',
            fetched: props.fetchedNav,
            dataWithClass: props.data ? props.data.map((item) => {
                const newItem = JSON.parse(JSON.stringify(item));
                newItem.className = `nav-item-${item[props.itemIdField]} ${item[props.itemIdField] === props.cascNav ? 'active' : ''}`;
                return newItem;
            }) : [],
        };

        this.onHandleClick = this.onHandleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { fetchedNav, cascNav, data } = this.props;
        if (fetchedNav !== nextProps.fetchedNav) {
                this.setState({
                    fetched: nextProps.fetchedNav,
                });
        }
        if (cascNav) {
            if (!nextProps.cascNav) {
                window.location.href = `${window.location.href.split('#/')[0]}#/?cascNav=${nextProps.data[0][nextProps.itemIdField]}`;
            }
            if (cascNav !== nextProps.cascNav) {
                this.setState({
                    selected: nextProps.cascNav || '',
                    dataWithClass: nextProps.data ? nextProps.data.map((item) => {
                        const newItem = JSON.parse(JSON.stringify(item));
                        newItem.className = `nav-item-${item[nextProps.itemIdField]} ${item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : ''}`;
                        return newItem;
                    }) : [],
                });
            }
        } else if (nextProps.cascNav) {
            this.setState({
                selected: nextProps.cascNav,
                dataWithClass: nextProps.data ? nextProps.data.map((item) => {
                    const newItem = JSON.parse(JSON.stringify(item));
                    newItem.className = `nav-item-${item[nextProps.itemIdField]} ${item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : ''}`;
                    return newItem;
                }) : [],
            });
        } else if (data.length === 0 && nextProps.data && nextProps.data.length > 0) {
            window.location.href = `${window.location.href.split('#/')[0]}#/?cascNav=${nextProps.data[0][nextProps.itemIdField]}`;
        }
        if (JSON.stringify(data) !== JSON.stringify(nextProps.data)) {
            this.setState({
                dataWithClass: nextProps.data ? nextProps.data.map((item) => {
                    const newItem = JSON.parse(JSON.stringify(item));
                    newItem.className = `nav-item-${item[nextProps.itemIdField]} ${item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : ''}`;
                    return newItem;
                }) : [],
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { updateGroupSelect, data, itemIdField } = this.props;
        const { selected } = this.state;
        if ((prevProps.data.length === 0 && data.length > 0) || selected !== prevState.selected) {
            const groupSelected = data.filter(item => item[itemIdField] === selected);
            updateGroupSelect(groupSelected[0]);
        }
    }

    onHandleClick(item) {
        const { itemIdField } = this.props;
        const { selected } = this.state;

        if (selected !== item[itemIdField]) {
            window.location.href = `${window.location.href.split('#/')[0]}#/?cascNav=${item[itemIdField]}`;
        }
    }

    render() {
        const {
            key, className, headerDisplay, footerDisplay, navFetch, data,
            itemConfigDisplay, getCascadingNav, config, logoField, titleField,
        } = this.props;
        const { fetched, dataWithClass } = this.state;

        const navFormat = [];
        if (logoField) {
            navFormat.push({
                name: 'Logo',
                className: 'nav-group-logo',
                display: item => <img role="presentation" src={item[logoField]} className="cascading-nav-logo" />,
            });
        }
        navFormat.push({
            name: 'Title',
            className: 'nav-group-title',
            display: item => item[titleField],
        });
        if (itemConfigDisplay) {
            navFormat.push({
                name: 'Actions',
                className: 'nav-group-actions',
                display: item => React.cloneElement(itemConfigDisplay, Object.assign({}, { item }, { updateNav: () => getCascadingNav(config) })),
            });
        }

        return (
            <div className={classNames(className, 'cascading-pane-nav')} key={key}>
                {headerDisplay}
                <LoadingComponent {...navFetch}>
                    <div className="cascading-pane-nav-list">
                        {fetched && !data && (
                            <Alert bsStyle="danger">No data available</Alert>
                        )}
                        {fetched && data && (
                            <FilteredTable
                                className="table table-striped table-bordered table-condensed table-cascading-nav"
                                data={dataWithClass}
                                itemFormat={navFormat}
                                rowClickable
                                onRowClick={item => this.onHandleClick(item)}
                            />
                        )}
                    </div>
                </LoadingComponent>
                {footerDisplay}
            </div>
        );
    }
}

CascadingPaneNav.propTypes = {
    role: PropTypes.string,
    key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    config: PropTypes.shape({
        APP_ID: PropTypes.string,
    }),
    data: PropTypes.array,
    getCascadingNav: PropTypes.func,
    navFetch: PropTypes.shape({
        status: PropTypes.string,
        isFetching: PropTypes.bool,
    }),
    fetchedNav: PropTypes.bool,
    cascNav: PropTypes.string,
    updateGroupSelect: PropTypes.func,

    className: PropTypes.string,
    itemIdField: PropTypes.string,
    logoField: PropTypes.string,
    titleField: PropTypes.string,

    headerDisplay: PropTypes.element,
    footerDisplay: PropTypes.element,
    itemConfigDisplay: PropTypes.element,
};

CascadingPaneNav.defaultProps = {
    role: 'nav',
    key: 0,
    data: [],
    getCascadingNav: f => f,
    navFetch: {
        status: '',
        isFetching: false,
    },
    fetchedNav: false,
    cascNav: '',
    updateGroupSelect: f => f,

    className: '',
    itemIdField: 'id',
    logoField: '',
    titleField: 'name',
};

export default CascadingPaneNav;
