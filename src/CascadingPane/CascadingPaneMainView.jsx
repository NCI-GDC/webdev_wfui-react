/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import FilteredTable from '../FilteredTable/FilteredTable';

class CascadingPaneMainView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navSelect: props.cascNav || '',
            curSelect: props.cascSelect || '',
            fetchedNav: props.fetchedNav,
            fetchedMainView: props.fetchedMainView,
            selected: [],
            filtered: [],
            showing: 0,
            dataWithClass: props.mainData
                ? props.mainData.map((item) => {
                      const newItem = JSON.parse(JSON.stringify(item));
                      newItem.group = props.groupData;
                      newItem.className = `member-item-${item[props.itemIdField]} ${item[
                          props.itemIdField
                      ] === props.cascSelect
                          ? 'active'
                          : ''}`;
                      return newItem;
                  })
                : [],
        };

        this.onHandleClick = this.onHandleClick.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    componentWillMount() {
        const { cascNav, getCascadingMainView } = this.props;
        if (cascNav) getCascadingMainView(cascNav);
    }

    componentWillReceiveProps(nextProps) {
        const {
            cascNav,
            cascSelect,
            fetchedNav,
            fetchedMainView,
            getCascadingMainView,
            mainData,
        } = this.props;
        const newState = {};
        if (fetchedNav !== nextProps.fetchedNav) {
            newState.fetchedNav = nextProps.fetchedNav;
        }
        if (fetchedMainView !== nextProps.fetchedMainView) {
            newState.fetchedMainView = nextProps.fetchedMainView;
        }
        if (cascNav) {
            if (!nextProps.cascNav || cascNav !== nextProps.cascNav) {
                newState.navSelect = nextProps.cascNav || '';
                if (nextProps.cascNav) getCascadingMainView(nextProps.cascNav);
            }
        } else if (nextProps.cascNav) {
            newState.navSelect = nextProps.cascNav;
            getCascadingMainView(nextProps.cascNav);
        }

        if (cascSelect) {
            if (!nextProps.cascSelect || cascSelect !== nextProps.cascSelect) {
                newState.curSelect = nextProps.cascSelect || '';
                newState.dataWithClass = nextProps.mainData
                    ? nextProps.mainData.map((item) => {
                          const newItem = JSON.parse(JSON.stringify(item));
                          newItem.group = nextProps.groupData;
                          newItem.className = `member-item-${item[nextProps.itemIdField]} ${item[
                              nextProps.itemIdField
                          ] === nextProps.cascSelect
                              ? 'active'
                              : ''}`;
                          return newItem;
                      })
                    : [];
            }
        } else if (nextProps.cascSelect) {
            newState.curSelect = nextProps.cascSelect;
            newState.dataWithClass = nextProps.mainData
                ? nextProps.mainData.map((item) => {
                      const newItem = JSON.parse(JSON.stringify(item));
                      newItem.group = nextProps.groupData;
                      newItem.className = `member-item-${item[nextProps.itemIdField]} ${item[
                          nextProps.itemIdField
                      ] === nextProps.cascSelect
                          ? 'active'
                          : ''}`;
                      return newItem;
                  })
                : [];
        }
        if (JSON.stringify(mainData) !== nextProps.mainData) {
            newState.dataWithClass = nextProps.mainData
                ? nextProps.mainData.map((item) => {
                      const newItem = JSON.parse(JSON.stringify(item));
                      newItem.group = nextProps.groupData;
                      newItem.className = `member-item-${item[nextProps.itemIdField]} ${item[
                          nextProps.itemIdField
                      ] === nextProps.cascSelect
                          ? 'active'
                          : ''}`;
                      return newItem;
                  })
                : [];
        }

        if (Object.keys(newState).length > 0) {
            this.setState({ ...newState });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { updateMemberSelect, mainData, itemIdField } = this.props;
        const { curSelect } = this.state;

        if (
            (prevProps.mainData.length === 0 && mainData.length > 0) ||
            curSelect !== prevState.curSelect ||
            JSON.stringify(mainData) !== JSON.stringify(prevProps.mainData)
        ) {
            const memberSelected = mainData.filter(item => item[itemIdField] === curSelect);
            updateMemberSelect(memberSelected[0]);
        }
    }

    onSelectionChange(selection) {
        const { mainData } = this.props;
        const newSelected = selection.map(idx => mainData[idx]);
        this.setState({
            selected: newSelected,
        });
    }

    onHandleClick(item) {
        const { itemIdField } = this.props;
        const { curSelect } = this.state;
        if (curSelect !== item[itemIdField]) {
            if (curSelect) {
                window.location.href = window.location.href.replace(
                    `cascSelect=${curSelect}`,
                    `cascSelect=${item[itemIdField]}`,
                );
            } else {
                window.location.href = `${window.location.href}&cascSelect=${item[itemIdField]}`;
            }
        }
    }

    render() {
        const {
            key,
            className,
            noneSelectedDisplay,
            navFetch,
            mainViewFetch,
            groupData,
            mainData,
            summaryDisplay,
            reloadNav,
            itemDisplay,
            tableClassName,
            visibilityFilter,
            filtersDisplay,
            getFilters,
            location,
        } = this.props;
        const { navSelect, fetchedNav, fetchedMainView, showing, dataWithClass } = this.state;

        if (!navSelect) {
            return (
                <div className={classNames(className, 'cascading-pane-mainview')} key={key}>
                    {noneSelectedDisplay}
                </div>
            );
        }

        return (
            <div className={classNames(className, 'cascading-pane-mainview')} key={key}>
                <LoadingComponent {...navFetch}>
                    <LoadingComponent {...mainViewFetch}>
                        <div className="cascading-pane-mainview-summary">
                            {fetchedNav &&
                                summaryDisplay &&
                                React.cloneElement(summaryDisplay, {
                                    data: mainData,
                                    groupData,
                                    updateNav: () => reloadNav(),
                                })}
                        </div>
                        <div className="cascading-pane-mainview-filters ">
                            {filtersDisplay &&
                                React.cloneElement(filtersDisplay, {
                                    visibilityFilter,
                                    location,
                                    showing,
                                    data: mainData,
                                })}
                        </div>
                        <div className="cascading-pane-mainview-table">
                            {fetchedMainView && (
                                <FilteredTable
                                    className={tableClassName}
                                    searchTerm={visibilityFilter.category.searchTerm || ''}
                                    filterList={getFilters(visibilityFilter.category)}
                                    data={dataWithClass}
                                    itemFormat={itemDisplay}
                                    onSelectionChange={this.onSelectionChange}
                                    onResultsNumUpdate={results =>
                                        this.setState({ showing: results })}
                                    rowClickable
                                    onRowClick={item => this.onHandleClick(item)}
                                    selectable
                                    simpleSearch
                                    wholeWord
                                />
                            )}
                        </div>
                    </LoadingComponent>
                </LoadingComponent>
            </div>
        );
    }
}

CascadingPaneMainView.propTypes = {
    role: PropTypes.string,
    key: PropTypes.number,
    groupData: PropTypes.object,
    mainData: PropTypes.array,
    getCascadingMainView: PropTypes.func,
    navFetch: PropTypes.shape({
        status: PropTypes.string,
        isFetching: PropTypes.bool,
    }),
    mainViewFetch: PropTypes.shape({
        status: PropTypes.string,
        isFetching: PropTypes.bool,
    }),
    fetchedNav: PropTypes.bool,
    fetchedMainView: PropTypes.bool,
    location: PropTypes.object,
    cascNav: PropTypes.string,
    cascSelect: PropTypes.string,
    reloadNav: PropTypes.func,
    updateMemberSelect: PropTypes.func,
    visibilityFilter: PropTypes.object,

    className: PropTypes.string,
    tableClassName: PropTypes.string,
    noneSelectedDisplay: PropTypes.element,
    summaryDisplay: PropTypes.element,
    itemDisplay: PropTypes.array,
    itemIdField: PropTypes.string,
    getFilters: PropTypes.func,
    filtersDisplay: PropTypes.element,
};

CascadingPaneMainView.defaultProps = {
    role: 'mainView',
    key: 1,
    groupData: {},
    mainData: [],
    getCascadingMainView: f => f,
    navFetch: {
        status: '',
        isFetching: false,
    },
    mainViewFetch: {
        status: '',
        isFetching: false,
    },
    fetchedNav: false,
    fetchedMainView: false,
    cascNav: '',
    cascSelect: '',
    reloadNav: f => f,
    updateMemberSelect: f => f,

    className: '',
    tableClassName: '',
    noneSelectedDisplay: <p>Please select a group</p>,
    itemIdField: 'id',
};

export default CascadingPaneMainView;
