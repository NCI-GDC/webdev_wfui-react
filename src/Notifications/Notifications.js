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
        const { notifications } = this.state;
        const _message = Object.assign({}, message, { uid: uuidv1() });
        notifications.push(_message);
        if (!_message.forever) {
            setTimeout(() => {
                this.removeNotificationQue(_message.uid);
            }, 5000);
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
                            bsStyle={this.getStyle(notification.level)}
                            className="message"
                        >
                            {notification.children}
                            <Glyphicon
                                className="remove"
                                onClick={() => this.removeNotification(i)}
                                glyph={'remove-circle'}
                            />
                        </Alert>
                    ))}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

class Notifications extends React.Component {
    componentWillReceiveProps(nextProps) {
        const { fetches, requestIds, intl, lang } = this.props;
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
                                        values={Object.assign(
                                            {},
                                            flattenObject(newFetches[key].data),
                                            { lang },
                                        )}
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
        const { fetches, fixed } = this.props;
        return (
            <div className="wfui-notification">
                {fixed ? (
                    <StaticNotification
                        ref={ref => {
                            this.notificationRef = ref;
                        }}
                    />
                ) : (
                    <NotificationSystem
                        ref={ref => {
                            this.notificationRef = ref;
                        }}
                    />
                )}
            </div>
        );
    }
}

Notifications.propTypes = {
    requestIds: PropTypes.arrayOf(PropTypes.string),
    lang: PropTypes.string,
};

Notifications.defaultProps = {
    requestIds: [],
    lang: 'en',
};

export default injectIntl(
    connect(state => ({
        fetches: state.fetch || {},
    }))(Notifications),
);
