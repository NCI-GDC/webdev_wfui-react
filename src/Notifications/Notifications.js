import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedHTMLMessage } from 'react-intl';
import { NotificationSystem } from '../index';

class Notifications extends React.Component {
    componentWillReceiveProps(nextProps) {
        const { fetches, requestIds, intl } = this.props;
        const newFetches = nextProps.fetches;
        Object.keys(fetches)
            .filter(key => requestIds.includes(key))
            .forEach(key => {
                if (fetches[key] && newFetches[key]) {
                    if (
                        fetches[key].isFetching &&
                        !newFetches[key].isFetching
                    ) {
                        if (newFetches[key].status === 'success') {
                            this.notificationRef.addNotification({
                                children: (
                                    <FormattedHTMLMessage
                                        id={`notifications.${key}.success`}
                                        values={newFetches[key].data}
                                    />
                                ),
                                level: 'success',
                            });
                        } else {
                            if (typeof newFetches[key].error === 'object') {
                                this.notificationRef.addNotification({
                                    children: (
                                        <FormattedHTMLMessage
                                            id={`notifications.${key}.error.${
                                                newFetches[key].error.type
                                            }`}
                                        />
                                    ),
                                    level: 'error',
                                });
                            } else {
                                this.notificationRef.addNotification({
                                    children: (
                                        <FormattedHTMLMessage
                                            id={`notifications.${key}.error.default`}
                                            values={{
                                                message: newFetches[key].error,
                                            }}
                                        />
                                    ),
                                    level: 'error',
                                });
                            }
                        }
                    }
                }
            });
    }
    render() {
        const { fetches } = this.props;
        return (
            <NotificationSystem
                ref={ref => {
                    this.notificationRef = ref;
                }}
            />
        );
    }
}

Notifications.propTypes = {
    requestIds: PropTypes.arrayOf(PropTypes.string),
};

Notifications.defaultProps = {
    requestIds: [],
};

export default injectIntl(
    connect(state => ({
        fetches: state.fetch || {},
    }))(Notifications),
);
