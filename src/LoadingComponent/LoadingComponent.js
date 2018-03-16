import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import { Button, Spinner } from '../index';

class LoadingComponent extends React.Component {
    render() {
        const {
            requestId,
            enableIntl,
            hideMessage,
            isFetching,
            fetch5s,
            fetch8s,
            message5s,
            message8s,
            messageFailed,
            error,
            retried,
            timeout,
            status,
            spinnerConfig,
            children,
            onRetry,
            textRetry,
        } = this.props;

        if (isFetching) {
            return (
                <div className="wfui-loading-component">
                    {<Spinner {...spinnerConfig} />}
                    {!hideMessage &&
                        fetch5s && (
                            <p
                                className="loading-5s"
                                style={{ textAlign: 'center' }}
                            >
                                {enableIntl ? (
                                    <FormattedHTMLMessage
                                        id="loadingcomponent.message5s"
                                        defaultMessage={message5s}
                                    />
                                ) : (
                                    message5s
                                )}
                            </p>
                        )}
                    {!hideMessage &&
                        fetch8s && (
                            <p
                                className="loading-8s"
                                style={{ textAlign: 'center' }}
                            >
                                {enableIntl ? (
                                    <FormattedHTMLMessage
                                        id="loadingcomponent.message8s"
                                        defaultMessage={message8s}
                                    />
                                ) : (
                                    message8s
                                )}
                            </p>
                        )}
                </div>
            );
        }
        if (status === 'fail') {
            const errorType = typeof error === 'object' && error.type;
            return (
                <div className="wfui-loading-component">
                    {!hideMessage &&
                        error && (
                            <p className="error">
                                {enableIntl ? (
                                    <FormattedHTMLMessage
                                        id={`loadingcomponent.${requestId}.${
                                            errorType
                                                ? `${errorType}`
                                                : 'default'
                                        }`}
                                        defaultMessage={
                                            typeof error === 'object'
                                                ? error.type
                                                : error
                                        }
                                    />
                                ) : typeof error === 'object' ? (
                                    error.type
                                ) : (
                                    error
                                )}
                            </p>
                        )}
                    {!hideMessage &&
                        (retried || timeout) && (
                            <p
                                className="error"
                                style={{ textAlign: 'center' }}
                            >
                                {enableIntl ? (
                                    <FormattedHTMLMessage
                                        id="loadingcomponent.messageFailed"
                                        defaultMessage={messageFailed}
                                    />
                                ) : (
                                    messageFailed
                                )}
                            </p>
                        )}
                    {(retried || timeout) &&
                        typeof onRetry === 'function' && (
                            <div
                                className="retry-button"
                                style={{ textAlign: 'center' }}
                            >
                                <Button onClick={onRetry}>{textRetry}</Button>
                            </div>
                        )}
                </div>
            );
        }

        if (status === 'success') {
            return <div className="wfui-loading-component">{children}</div>;
        }
        return null;
    }
}

LoadingComponent.propTypes = {
    requestId: PropTypes.string,
    isFetching: PropTypes.bool,
    fetch5s: PropTypes.bool,
    fetch8s: PropTypes.bool,
    status: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    timeout: PropTypes.bool,
    retried: PropTypes.bool,
    hideMessage: PropTypes.bool,
    children: PropTypes.node,
    spinnerConfig: PropTypes.oneOfType([PropTypes.object]),
    message5s: PropTypes.string,
    message8s: PropTypes.string,
    messageFailed: PropTypes.string,
    onRetry: PropTypes.func,
    textRetry: PropTypes.string,
    enableIntl: PropTypes.bool,
};

LoadingComponent.defaultProps = {
    spinnerConfig: {
        type: 1,
        color: '#337ab7',
        fontSize: '12',
        margin: '100px auto',
    },
    message5s: 'Loading, please wait...',
    message8s: 'We are experiencing longer than normal load times.',
    messageFailed:
        'The server encountered an internal error and was unable to complete your request.',
    textRetry: 'Retry',
    enableIntl: true,
    requestId: '[requestId]',
};

export default LoadingComponent;
