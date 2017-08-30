/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LoadingComponent from '../LoadingComponent/LoadingComponent';

class CascadingPaneSubView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navSelect: props.cascNav || '',
            mainSelect: props.cascSelect || '',
            fetchedSub: props.fetchedSubView,
            fetchedMain: props.fetchedMainView,
        };
    }

    componentWillMount() {
        const { config, cascSelect, getCascadingSubView } = this.props;
        if (cascSelect) getCascadingSubView(config, cascSelect);
    }

    componentWillReceiveProps(nextProps) {
        const {
            cascNav, cascSelect, fetchedMainView, fetchedSubView,
            config, getCascadingSubView,
        } = this.props;
        const newState = {};
        if (fetchedMainView !== nextProps.fetchedMainView) {
            newState.fetchedMain = nextProps.fetchedMainView;
        }
        if (fetchedSubView !== nextProps.fetchedSubView) {
            newState.fetchedSub = nextProps.fetchedSubView;
        }
        if (cascNav) {
            if (!nextProps.cascNav || (cascNav !== nextProps.cascNav)) {
                newState.navSelect = nextProps.cascNav || '';
            }
        } else if (nextProps.cascNav) {
            newState.navSelect = nextProps.cascNav;
        }
        if (cascSelect) {
            if (!nextProps.cascSelect || (cascSelect !== nextProps.cascSelect)) {
                newState.navSelect = nextProps.cascSelect || '';
                if (nextProps.cascSelect) getCascadingSubView(config, nextProps.cascSelect);
            }
        } else if (nextProps.cascSelect) {
            newState.navSelect = nextProps.cascSelect;
            getCascadingSubView(config, nextProps.cascSelect);
        }
        if (Object.keys(newState).length > 0) {
            this.setState({ ...newState });
        }
    }

    render() {
        const {
            key, className, getCascadingSubView, reloadMainView, subViewFetch,
            mainViewFetch, groupData, config, memberData, data, contentDisplay,
        } = this.props;
        const { navSelect, mainSelect, fetchedSub, fetchedMain } = this.state;

        return (
            <div className={classNames(className, 'cascading-pane-subview')} key={key}>
                <LoadingComponent {...mainViewFetch}>
                    <LoadingComponent {...subViewFetch}>
                        {fetchedSub && fetchedMain && (
                            React.cloneElement(contentDisplay, {
                                config,
                                groupData,
                                memberData,
                                data,
                                reloadMainView: () => reloadMainView(config),
                                reloadSubView: () => getCascadingSubView(config),
                                navSelect,
                                mainSelect,
                            })
                        )}
                    </LoadingComponent>
                </LoadingComponent>
            </div>
        );
    }
}

CascadingPaneSubView.propTypes = {
    role: PropTypes.string,
    key: PropTypes.number,
    config: PropTypes.shape({
        APP_ID: PropTypes.string,
    }),
    groupData: PropTypes.object,
    memberData: PropTypes.object,
    data: PropTypes.object,
    getCascadingSubView: PropTypes.func,
    subViewFetch: PropTypes.shape({
        status: PropTypes.string,
        isFetching: PropTypes.bool,
    }),
    mainViewFetch: PropTypes.shape({
        status: PropTypes.string,
        isFetching: PropTypes.bool,
    }),
    fetchedSubView: PropTypes.bool,
    fetchedMainView: PropTypes.bool,
    cascNav: PropTypes.string,
    cascSelect: PropTypes.string,
    reloadMainView: PropTypes.func,

    className: PropTypes.string,
    contentDisplay: PropTypes.element.isRequired,
    tableClassName: PropTypes.string,
};

CascadingPaneSubView.defaultProps = {
    role: 'subView',
    key: 2,
    groupData: {},
    memberData: {},
    data: {},
    getCascadingSubView: f => f,
    subViewFetch: {
        status: '',
        isFetching: false,
    },
    mainViewFetch: {
        status: '',
        isFetching: false,
    },
    fetchedSubView: false,
    fetchedMainView: false,
    cascNav: '',
    cascSelect: '',
    reloadMainView: f => f,

    className: '',
};

export default CascadingPaneSubView;
