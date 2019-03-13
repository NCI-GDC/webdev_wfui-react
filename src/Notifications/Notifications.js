import React from 'react';
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
        const _message = Object.assign({}, message, { uid: uuidv1() });
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
        const { notifications } = this.state;
        return (
            <div className="wfui-notification-static">
                <ReactCSSTransitionGroup
                    transitionName="wfui-notification-fadeout"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {notifications.map((notification, i) => (
                        <Alert
                            key={i}
                            bsStyle={this.getStyle(notification.level)}
                            className="message"
                        >
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
        );
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
                        if (newFetches[key].status === 'success') {
                            if (level.includes('success')) {
                                this.notificationRef.addNotification({
                                    children: overriding.success ? (
                                        <FormattedHTMLMessage
                                            id="_overridding_text_"
                                            defaultMessage={overriding.success}
                                            values={Object.assign(
                                                {},
                                                flattenObject(
                                                    fetches[key].meta
                                                ),
                                                flattenObject(values),
                                                flattenObject(
                                                    newFetches[key].data
                                                ),
                                                { lang }
                                            )}
                                        />
                                    ) : (
                                        <FormattedHTMLMessage
                                            id={`notifications.${notificationId}.success`}
                                            values={Object.assign(
                                                {},
                                                flattenObject(
                                                    fetches[key].meta
                                                ),
                                                flattenObject(values),
                                                flattenObject(
                                                    newFetches[key].data
                                                ),
                                                { lang }
                                            )}
                                        />
                                    ),
                                    level: 'success',
                                    autoDismiss: Math.floor(duration / 1000),
                                });
                            }
                        } else if (level.includes('error')) {
                            if (typeof newFetches[key].error === 'object') {
                                this.notificationRef.addNotification({
                                    children:
                                        overriding.error &&
                                        overriding.error[
                                            newFetches[key].error.type
                                        ] ? (
                                            <FormattedHTMLMessage
                                                id="_overridding_text_"
                                                defaultMessage={
                                                    overriding.error[
                                                        newFetches[key].error
                                                            .type
                                                    ]
                                                }
                                                values={Object.assign(
                                                    {},
                                                    flattenObject(
                                                        fetches[key].meta
                                                    ),
                                                    flattenObject(values),
                                                    flattenObject(
                                                        newFetches[key].data
                                                    ),
                                                    { lang }
                                                )}
                                            />
                                        ) : (
                                            <FormattedHTMLMessage
                                                id={`notifications.${notificationId}.error.${
                                                    newFetches[key].error.type
                                                }`}
                                                values={Object.assign(
                                                    {},
                                                    flattenObject(
                                                        fetches[key].meta
                                                    ),
                                                    flattenObject(values),
                                                    flattenObject(
                                                        newFetches[key].data
                                                    ),
                                                    { lang }
                                                )}
                                            />
                                        ),
                                    level: 'error',
                                    autoDismiss: Math.floor(duration / 1000),
                                });
                            } else {
                                this.notificationRef.addNotification({
                                    children:
                                        overriding.error &&
                                        overriding.error.default ? (
                                            <FormattedHTMLMessage
                                                id="_overridding_text_"
                                                defaultMessage={
                                                    overriding.error.default
                                                }
                                                values={Object.assign(
                                                    {},
                                                    flattenObject(
                                                        fetches[key].meta
                                                    ),
                                                    flattenObject(values),
                                                    {
                                                        message:
                                                            newFetches[key]
                                                                .error,
                                                    },
                                                    { lang }
                                                )}
                                            />
                                        ) : (
                                            <FormattedHTMLMessage
                                                id={`notifications.${notificationId}.error.default`}
                                                values={Object.assign(
                                                    {},
                                                    flattenObject(
                                                        fetches[key].meta
                                                    ),
                                                    flattenObject(values),
                                                    {
                                                        message:
                                                            newFetches[key]
                                                                .error,
                                                    },
                                                    { lang }
                                                )}
                                            />
                                        ),
                                    level: 'error',
                                    autoDismiss: Math.floor(duration / 1000),
                                });
                            }
                        }
                    }
                }
            });
    }

    render() {
        const { fetches, fixed, duration, notificationRef } = this.props;
        return (
            <div className="wfui-notification">
                {fixed ? (
                    <StaticNotification
                        duration={duration}
                        ref={ref => {
                            this.notificationRef = ref;
                            notificationRef(ref);
                        }}
                    />
                ) : (
                    <NotificationSystem
                        ref={ref => {
                            this.notificationRef = ref;
                            notificationRef(ref);
                        }}
                    />
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
