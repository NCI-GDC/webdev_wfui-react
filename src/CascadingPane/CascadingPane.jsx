/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';

import CascadingPaneNav from './CascadingPaneNav';
import CascadingPaneMainView from './CascadingPaneMainView';
import CascadingPaneSubView from './CascadingPaneSubView';

import { fetchSelector } from '../util';

const NAV_ROLE = CascadingPaneNav.role;
const MAINVIEW_ROLE = CascadingPaneMainView.role;
const SUBVIEW_ROLE = CascadingPaneSubView.role;

class CascadingPane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainSelectIdx: -1,

            selectedGroup: {},
            selectedMember: {},
        };
    }

    componentWillMount() {
        const { getCascadingNav } = this.props;
        getCascadingNav();
    }

    renderNav(child) {
        const { location, getCascadingNav, navData, navFetch, fetchedNav } = this.props;

        return React.cloneElement(child, {
            key: 0,
            data: navData,
            getCascadingNav,
            navFetch,
            fetchedNav,
            cascNav: location.query.cascNav,
            updateGroupSelect: item => this.setState({ selectedGroup: item }),
        });
    }

    renderMainView(child) {
        const {
            getCascadingNav,
            getCascadingMainView,
            location,
            mainData,
            navFetch,
            mainViewFetch,
            fetchedNav,
            fetchedMainView,
            visibilityFilter,
        } = this.props;
        const { selectedGroup } = this.state;

        return React.cloneElement(child, {
            key: 1,
            groupData: selectedGroup,
            mainData,
            getCascadingMainView,
            navFetch,
            mainViewFetch,
            fetchedNav,
            fetchedMainView,
            location,
            cascNav: location.query.cascNav,
            cascSelect: location.query.cascSelect,
            reloadNav: getCascadingNav,
            updateMemberSelect: item => this.setState({ selectedMember: item || {} }),
            visibilityFilter,
        });
    }

    renderSubView(child) {
        const {
            getCascadingSubView,
            getCascadingMainView,
            location,
            subData,
            subViewFetch,
            mainViewFetch,
            fetchedSubView,
            fetchedMainView,
        } = this.props;
        const { selectedGroup, selectedMember } = this.state;

        return React.cloneElement(child, {
            key: 2,
            groupData: selectedGroup,
            memberData: selectedMember,
            data: subData,
            getCascadingSubView,
            subViewFetch,
            mainViewFetch,
            fetchedSubView,
            fetchedMainView,
            cascNav: location.query.cascNav,
            cascSelect: location.query.cascSelect,
            reloadMainView: getCascadingMainView,
        });
    }

    render() {
        const { className, viewClassName, splitClassName, defaultSize, children } = this.props;
        const { selectedMember } = this.state;

        return (
            <div className={classNames(className, 'cascading-pane cascading-pane-container')}>
                {this.renderNav(children[0])}
                {Object.keys(selectedMember).length === 0 ? (
                    <div className={classNames(viewClassName, 'cascading-pane-view')}>
                        {this.renderMainView(children[1])}
                    </div>
                ) : (
                    <SplitPane
                        className={classNames(viewClassName, splitClassName, 'cascading-pane-view')}
                        split="vertical"
                        minSize={50}
                        defaultSize={defaultSize || 150}
                        primary="second"
                    >
                        {this.renderMainView(children[1])}
                        {this.renderSubView(children[2])}
                    </SplitPane>
                )}
            </div>
        );
    }
}

CascadingPane.Nav = CascadingPaneNav;
CascadingPane.MainView = CascadingPaneMainView;
CascadingPane.SubView = CascadingPaneSubView;

CascadingPane.propTypes = {
    location: PropTypes.object,
    className: PropTypes.string,
    viewClassName: PropTypes.string,
    splitClassName: PropTypes.string,
    getCascadingNav: PropTypes.func,
    getCascadingMainView: PropTypes.func,
    getCascadingSubView: PropTypes.func,
    navData: PropTypes.array,
    mainData: PropTypes.array,
    subData: PropTypes.object,
    navFetch: PropTypes.object,
    mainViewFetch: PropTypes.object,
    subViewFetch: PropTypes.object,
    fetchedNav: PropTypes.bool,
    fetchedMainView: PropTypes.bool,
    fetchedSubView: PropTypes.bool,
    defaultSize: PropTypes.number,
    navDataSelector: PropTypes.func,
    mainDataSelector: PropTypes.func,
    subDataSelector: PropTypes.func,
    children: PropTypes.arrayOf((propValue) => {
        if (propValue.length !== 3) {
            return new Error(
                'The Cascading Pane requires exactly three children: CascadingPane.Nav, CascadingPane.MainView and CascadingPane.SubView',
            );
        }
        const roles = ['nav', 'mainView', 'subView'];
        const rolesMatch = propValue.every((child, idx) => child.props.role === roles[idx]);
        if (!rolesMatch) {
            return new Error(
                'The Cascading Pane requires exactly three children in the following order: CascadingPane.Nav, CascadingPane.MainView and CascadingPane.SubView',
            );
        }
    }).isRequired,
    visibilityFilter: PropTypes.object,
};

CascadingPane.defaultProps = {
    className: '',
    viewClassName: '',
    splitClassName: '',
    getCascadingNav: f => f,
    getCascadingMainView: f => f,
    getCascadingSubView: f => f,
    navData: [],
    mainData: [],
    subData: {},
    location: {
        query: {
            cascNav: '',
            cascSelect: '',
        },
    },
    defaultSize: 0,
};

export default connect((state, props) => {
    const casData = state.cascadingPane;
    const navFetch = fetchSelector('getCascadingNav')(state);
    const mainViewFetch = fetchSelector('getCascadingMainView')(state);
    const subViewFetch = fetchSelector('getCascadingSubView')(state);
    return {
        navFetch,
        mainViewFetch,
        subViewFetch,
        navData: props.navDataSelector ? props.navDataSelector(casData)(state) : casData.navData,
        mainData: props.mainDataSelector
            ? props.mainDataSelector(casData)(state)
            : casData.mainData,
        subData: props.subDataSelector ? props.subDataSelector(casData)(state) : casData.subData,
        visibilityFilter: state.visibilityFilter,
        fetchedNav: navFetch && !navFetch.isFetching && navFetch.status === 'success',
        fetchedMainView:
            mainViewFetch && !mainViewFetch.isFetching && mainViewFetch.status === 'success',
        fetchedSubView:
            subViewFetch && !subViewFetch.isFetching && subViewFetch.status === 'success',
    };
})(CascadingPane);
