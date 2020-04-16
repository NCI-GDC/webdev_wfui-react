import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { injectIntl, FormattedHTMLMessage } from 'react-intl';
import uuidv1 from 'uuid/v1';
import { NotificationSystem, Alert, Glyphicon } from '../index';
import { flattenObject } from '../util/flattenObject';

class StaticNotification extends React.Component {
    constructor() {
        super();
        this.state = { notifications: [] };
        this.removeNotificationQue = this.removeNotificationQue.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
    }

    getStyle(key) {
        switch (key) {
            case 'success':
                return 'success';
            case 'error':
                return 'danger';
            case 'warning':
                return 'warning';
            default:
                return 'info';
        }
    }

    addNotification(message) {
        const { duration } = this.props;
        const { notifications } = this.state;
        const _message = { ...message, uid: uuidv1() };
        notifications.push(_message);
        if (!_message.forever) {
            setTimeout(() => {
                this.removeNotificationQue(_message.uid);
            }, duration);
        }
        this.setState({ notifications });
    }

    removeNotificationQue(uid) {
        const { notifications } = this.state;
        const index = notifications.findIndex(n => n.uid === uid);
        notifications.splice(index, 1);
        this.setState({ notifications });
    }

    removeNotification(index) {
        const { notifications } = this.state;
        notifications.splice(index, 1);
        this.setState({ notifications });
    }

    render() {
        const { withTitle } = this.props;
        const { notifications } = this.state;
        return notifications && notifications.length ? (
            <div className="wfui-notification-static">
                <ReactCSSTransitionGroup
                    transitionName="wfui-notification-fadeout"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {notifications.map((notification, i) => (
                        <Alert
                            key={i}
                            variant={this.getStyle(notification.level)}
                            className="message"
                        >
                            {withTitle && notification.title && (
                                <div className="alert-heading h4">
                                    {notification.title}
                                </div>
                            )}
                            {notification.children}
                            <Glyphicon
                                className="remove"
                                onClick={() => this.removeNotification(i)}
                                glyph="remove-circle"
                            />
                        </Alert>
                    ))}
                </ReactCSSTransitionGroup>
            </div>
        ) : null;
    }
}
StaticNotification.propTypes = {
    duration: PropTypes.number,
};
StaticNotification.defaultProps = {
    duration: 5000,
};

class Notifications extends React.Component {
    componentWillReceiveProps(nextProps) {
        const {
            fetches,
            requestIds,
            queryIds,
            intl,
            lang,
            values,
            overrides,
            duration,
            level,
            withTitle,
        } = this.props;
        const newFetches = nextProps.fetches;
        Object.keys(fetches)
            .filter(
                key =>
                    requestIds.includes(key) ||
                    queryIds.includes(fetches[key].queryId)
            )
            .forEach(key => {
                const overriding = overrides[key] || {};
                const notificationId = queryIds.includes(fetches[key].queryId)
                    ? fetches[key].queryId
                    : key; // If this fetch object has corresponding queryId, notify against the queryId over the requestId.

                if (fetches[key] && newFetches[key]) {
                    if (
                        fetches[key].isFetching &&
                        !newFetches[key].isFetching
                    ) {
                        let displayingTitle;
                        let displayingLevel;
                        let displayingId;
                        let displayingDefaultMessage;
                        let displayingValues;

                        if (newFetches[key].status === 'success') {
                            if (level.includes('success')) {
                                displayingLevel = 'success';

                                if (overriding.success) {
                                    displayingId = '_overridding_text_';
                                } else if (withTitle) {
                                    displayingId = `notifications.${notificationId}.success.default`;
                                    displayingTitle = intl.formatMessage({
                                        id: `notifications.${notificationId}.success.title`,
                                    });
                                } else {
                                    displayingId = `notifications.${notificationId}.success`;
                                }

                                displayingDefaultMessage =
                                    overriding.success || undefined;

                                displayingValues = flattenObject(
                                    newFetches[key].data
                                );
                            }
                        } else if (level.includes('error')) {
                            if (typeof newFetches[key].error === 'object') {
                                displayingLevel = 'error';

                                if (
                                    overriding.error &&
                                    overriding.error[newFetches[key].error.type]
                                ) {
                                    displayingId = '_overridding_text_';
                                } else {
                                    displayingId = `notifications.${notificationId}.error.${newFetches[key].error.type}`;
                                }

                                if (withTitle) {
                                    displayingTitle = intl.formatMessage({
                                        id: `notifications.${notificationId}.error.title`,
                                    });
                                }

                                displayingDefaultMessage =
                                    (overriding.error &&
                                        overriding.error[
                                            newFetches[key].error.type
                                        ]) ||
                                    `An unexpected error has occurred.<br/> Error: "${newFetches[key].error.type}"`;

                                if (
                                    newFetches[key].error.type === 'NO_AUTH' ||
                                    newFetches[key].error.type === 'NO_PERM'
                                ) {
                                    displayingDefaultMessage = `You don't have permission to perform this action.`;
                                }

                                const errorData = newFetches[key].error.data || {};
                                displayingValues = flattenObject(
                                    ...newFetches[key].data,
                                    ...errorData,
                                );
                            } else {
                                displayingLevel = 'error';
                                if (
                                    overriding.error &&
                                    overriding.error.default
                                ) {
                                    displayingId = '_overridding_text_';
                                } else {
                                    displayingId = `notifications.${notificationId}.error.default`;
                                }

                                if (withTitle) {
                                    displayingTitle = intl.formatMessage({
                                        id: `notifications.${notificationId}.error.title`,
                                    });
                                }

                                displayingDefaultMessage =
                                    (overriding.error &&
                                        overriding.error.default) ||
                                    'An unexpected error has occurred.';

                                displayingValues = {
                                    message: newFetches[key].error,
                                };
                            }
                        }

                        if (displayingValues) {
                            this.notificationRef.addNotification({
                                title: withTitle && displayingTitle,
                                children: (
                                    <FormattedHTMLMessage
                                        id={displayingId}
                                        defaultMessage={
                                            displayingDefaultMessage
                                        }
                                        values={{
                                            ...flattenObject(fetches[key].meta),
                                            ...flattenObject(values),
                                            lang,
                                            ...displayingValues,
                                        }}
                                    />
                                ),
                                level: displayingLevel,
                                autoDismiss: Math.floor(duration / 1000),
                            });
                        }
                    }
                }
            });
    }

    componentWillMount() {
        // Create container for dropdown menu
        let el = document.getElementById('wfui-notifications');
        if (!el) {
            el = document.createElement('div');
            el.setAttribute('id', 'wfui-notifications');
            document.body.appendChild(el);
        }
    }

    render() {
        const {
            fetches,
            fixed,
            duration,
            notificationRef,
            withTitle,
        } = this.props;
        return (
            <div className="wfui-notification">
                {fixed ? (
                    <StaticNotification
                        duration={duration}
                        ref={ref => {
                            this.notificationRef = ref;
                            notificationRef(ref);
                        }}
                        withTitle
                    />
                ) : (
                    ReactDOM.createPortal(
                        <NotificationSystem
                            ref={ref => {
                                this.notificationRef = ref;
                                notificationRef(ref);
                            }}
                            withTitle
                        />,
                        document.querySelector(
                            '#wfui-notifications'
                        )
                    )
                )}
            </div>
        );
    }
}

Notifications.propTypes = {
    requestIds: PropTypes.arrayOf(PropTypes.string),
    queryIds: PropTypes.arrayOf(PropTypes.string),
    level: PropTypes.arrayOf(PropTypes.string),
    lang: PropTypes.string,
    values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    overrides: PropTypes.object,
    duration: PropTypes.number,
    notificationRef: PropTypes.func,
    withTitle: PropTypes.bool,
};

Notifications.defaultProps = {
    requestIds: [],
    queryIds: [],
    level: ['error', 'success'],
    lang: 'en',
    values: {},
    overrides: {},
    duration: 5000,
    notificationRef: f => f,
};

export default injectIntl(
    connect(state => ({
        fetches: state.fetch || {},
    }))(Notifications)
);
