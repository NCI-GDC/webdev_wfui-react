import React from 'react';
import { Button } from '../index';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';

class LoadingComponent extends React.Component {
    render() {
        const { hideMessage, isFetching, fetch5s, fetch8s, message5s, message8s, messageFailed, error, retried, timeout, status, spinnerConfig, children, onRetry } = this.props;
        
        if (isFetching) {
            return (
                <div className="wfui-loading-component">
                    {<Spinner {...spinnerConfig} />}
                    { !hideMessage && fetch5s && <p className="loading-5s" style={{ textAlign: 'center' }}>{message5s}</p>}
                    { !hideMessage && fetch8s && <p className="loading-8s" style={{ textAlign: 'center' }}>{message8s}</p>}
                </div>
            );
        }
        if (status === 'fail') {
            return (
                <div className="wfui-loading-component">
                    { !hideMessage && error && <p className="error">{ error }</p>}
                    { !hideMessage && (retried || timeout) && <p className="error" style={{ textAlign: 'center' }}>{ messageFailed }</p>}
                    { (retried || timeout) && typeof onRetry === 'function' && <div className="retry-button" style={{ textAlign: 'center' }}><Button onClick={onRetry}>Retry</Button></div>}
                </div>
            );
        }
        if (status === 'success') {
            return (
                <div className="wfui-loading-component">
                    { children }
                </div>
            );
        }
        return null;
    }
}

LoadingComponent.propTypes = {
    isFetching: PropTypes.bool,
    fetch5s: PropTypes.bool,
    fetch8s: PropTypes.bool,
    status: PropTypes.string,
    error: PropTypes.string,
    timeout: PropTypes.bool,
    retried: PropTypes.bool,
    hideMessage: PropTypes.bool,
    children: PropTypes.node,
    spinnerConfig: PropTypes.oneOfType([PropTypes.object]),
    message5s: PropTypes.string,
    message8s: PropTypes.string,
    messageFailed: PropTypes.string,
    onRetry: PropTypes.func,
};

LoadingComponent.defaultProps = {
    spinnerConfig: {
        type: 1,
        fontSize: '20',
        margin: '100px auto',
    },
    message5s: 'Loading, please wait...',
    message8s: 'We are experiencing longer than normal load times.',
    messageFailed: 'The server encountered an internal error and was unable to complete your request.',
};

export default LoadingComponent;
