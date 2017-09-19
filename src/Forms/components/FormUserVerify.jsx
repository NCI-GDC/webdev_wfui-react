import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FormUserVerify extends React.Component {
    componentDidMount() {
        const { values, verifyFormRegister, onVerified, onUnverified, getConfig } = this.props;
        verifyFormRegister(values, getConfig)
            .then(({ res }) => {
                if (res.ok) {
                    onVerified();
                    return Promise.resolve();
                }
                return Promise.reject();
            })
            .catch(onUnverified);
    }
    render() {
        return <div>Verify</div>;
    }
}

FormUserVerify.propTypes = {
    values: PropTypes.object,
    onVerified: PropTypes.func,
    onUnverified: PropTypes.func,
    verifyFormRegister: PropTypes.func,
    getConfig: PropTypes.func,
};
FormUserVerify.defaultProps = {
    onVerified: f => f,
    onUnverified: f => f,
};

export default connect(
    () => ({}),
    actions,
)(FormUserVerify);
