import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '../index';
import style from './style';

const { Component } = React;

/**
 * Check if password is greater than specific characters
 */
export const validateCharacterLength = password => !!(password.length >= 8);

/**
 * Check if a password contains both upper and lower case.
 */
export const validateAtLeastOneLower = password => {
    const regAtLeastOneLower = /(?=.*[a-z])/;
    return !!regAtLeastOneLower.exec(password);
};

/**
 * Check if a password contains both upper and lower case.
 */
export const validateAtLeastOneUpper = password => {
    const regAtLeastOneUpper = /(?=.*[A-Z])/;
    return !!regAtLeastOneUpper.exec(password);
};

/**
 * Check if a password contains at lease one number
 */
export const validateAtLeastOneNumber = password => {
    const regAtLeastOneNumber = /(?=.*\d)/;
    return !!regAtLeastOneNumber.exec(password);
};

/**
 * Check if a passwords are same
 */
export const validateConfirmPasswords = (password, passwordConfirm) =>
    password !== '' && password === passwordConfirm;

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
        const {
            validations,
            onValidateStatusChange,
            password,
            password_confirm,
            validateWith,
        } = this.props;
        const { validated } = this.state;
        let allValidated = true;
        validations
            .filter(validation => validateWith.includes(validation.type))
            .forEach(validation => {
                allValidated =
                    allValidated &&
                    validation.validate(password, password_confirm);
            });
        if (validated !== allValidated) {
            /*eslint-disable */ // Only setState when state is different.
            this.setState({ validated: allValidated });
            /* eslint-enable */
            onValidateStatusChange({ validated: allValidated });
        }
    }

    render() {
        const {
            className,
            label,
            validations,
            password,
            password_confirm,
            validateWith,
        } = this.props;
        const classes = 'wfui-password-validator';

        return (
            <div className={classNames(className, classes)}>
                <p style={style.title}>{label}</p>
                <ul style={style.ul}>
                    {validations
                        .filter(validation =>
                            validateWith.includes(validation.type)
                        )
                        .map((validation, i) => {
                            const validated = validation.validate(
                                password,
                                password_confirm
                            );
                            return (
                                <li
                                    key={i}
                                    className={`password-validate-${i}`}
                                    style={
                                        validated ? style.li_active : style.li
                                    }
                                >
                                    <span
                                        className="icon-wrapper"
                                        style={style.icon}
                                    >
                                        {validated ? (
                                            <Icon name="check" />
                                        ) : (
                                            <Icon name="times" />
                                        )}
                                    </span>
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
    validateWith: PropTypes.arrayOf(PropTypes.string),
};
PasswordValidator.defaultProps = {
    label: 'Your password must have:',
    password: '',
    password_confirm: '',
    onValidateStatusChange: () => undefined,
    validations: [
        {
            type: 'length',
            title: '8 or more characters (eg. 1BdenVer8)',
            validate: validateCharacterLength,
        },
        {
            type: 'uppercase',
            title: 'At least one uppercase letter (example: A, B, C, ...)',
            validate: validateAtLeastOneUpper,
        },
        {
            type: 'lowercase',
            title: 'At least one lowercase letter (example: a, b, c, ...)',
            validate: validateAtLeastOneLower,
        },
        {
            type: 'number',
            title: 'At least one number (example: 0, 1, 2, 3, ...)',
            validate: validateAtLeastOneNumber,
        },
        {
            type: 'match',
            title: 'Passwords must match',
            validate: validateConfirmPasswords,
        },
    ],
    validateWith: ['length', 'uppercase', 'lowercase', 'number', 'match'],
};

export default PasswordValidator;
