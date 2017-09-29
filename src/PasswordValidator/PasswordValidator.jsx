import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import style from './style';
import classNames from 'classnames';

const { Component, PropTypes } = React;

/**
 * Check if password is greater than specific characters
 */
const validateCharacterLength = password => !!(password.length >= 8);

/**
 * Check if a password contains both upper and lower case.
 */
const validateAtLeastOneLower = (password) => {
    const regAtLeastOneLower = /(?=.*[a-z])/;
    return !!regAtLeastOneLower.exec(password);
};

/**
 * Check if a password contains both upper and lower case.
 */
const validateAtLeastOneUpper = (password) => {
    const regAtLeastOneUpper = /(?=.*[A-Z])/;
    return !!regAtLeastOneUpper.exec(password);
};

/**
 * Check if a password contains at lease one number
 */
const validateAtLeastOneNumber = (password) => {
    const regAtLeastOneNumber = /(?=.*\d)/;
    return !!regAtLeastOneNumber.exec(password);
};

/**
 * Check if a passwords are same
 */
const validateConfirmPasswords = (password, passwordConfirm) => (password !== '' && password === passwordConfirm);


class PasswordValidator extends Component {
        constructor() {
            super();
            this.state = {
                validated: false,
            };
        }
        componentDidMount() {
            this.props.onValidateStatusChange({ validated: false });
        }
        componentDidUpdate() {
            const { validations, onValidateStatusChange, password, password_confirm } = this.props;
            const { validated } = this.state;
            let allValidated = true;
            validations.forEach((validation) => {
                allValidated = allValidated && validation.validate(password, password_confirm);
            });
            if (validated !== allValidated) {
                /*eslint-disable */ // Only setState when state is different.
                this.setState({ validated: allValidated });
                /*eslint-enable */
                onValidateStatusChange({ validated: allValidated });
            }
        }
        render() {
            const { className, label, validations, password, password_confirm } = this.props;
            const classes = 'wfui-password-validator';

            return (
                <div className={classNames(className, classes)}>
                    <p style={style.title}>{label}</p>
                    <ul style={style.ul}>
                        {validations.map((validation, i) => {
                            const validated = validation.validate(password, password_confirm);
                            return (
                                <li key={i} className={`password-validate-${i}`} style={validated ? style.li_active : style.li} >
                                    { validated ? <Glyphicon glyph="ok" style={style.icon} /> : <Glyphicon glyph="remove" style={style.icon} />}
                                    {validation.title}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }

PasswordValidator.propTypes = {
    label: PropTypes.string,
    validations: PropTypes.arrayOf(PropTypes.object),
    password: PropTypes.string,
    password_confirm: PropTypes.string,
    onValidateStatusChange: PropTypes.func,
    className: PropTypes.string,
};
PasswordValidator.defaultProps = {
    label: 'Your password must have:',
    password: '',
    password_confirm: '',
    onValidateStatusChange: () => undefined,
    validations: [
        { title: '8 or more characters (eg. 1BdenVer8)', validate: validateCharacterLength },
        { title: 'At least one uppercase letter (example: A, B, C, ...)', validate: validateAtLeastOneUpper },
        { title: 'At least one lowercase letter (example: a, b, c, ...)', validate: validateAtLeastOneLower },
        { title: 'At least one number (example: 0, 1, 2, 3, ...)', validate: validateAtLeastOneNumber },
        { title: 'Passwords must match', validate: validateConfirmPasswords },
    ],
};

export default PasswordValidator;
