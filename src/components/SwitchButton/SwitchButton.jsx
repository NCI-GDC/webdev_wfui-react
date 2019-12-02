import React from 'react';
import PropTypes from 'prop-types';

class SwitchButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advanced: false,
        };
    }

    render() {
        const { onChange, label, id, disabled } = this.props;
        const { advanced } = this.state;

        return (
            <div className="switch-container">
                {label && label.length ? (
                    <span className="switch-title">{label}</span>
                ) : null}
                <label
                    htmlFor={id || 'switch'}
                    className={`switch-btn ${disabled ? 'disabled' : ''}`}
                >
                    <input
                        name="advance"
                        type="checkbox"
                        id={id || 'switch'}
                        className="switch-input"
                        value={advanced}
                        disabled={disabled}
                        onChange={() => {
                            this.setState({ advanced: !advanced });
                            onChange(!advanced);
                        }}
                    />
                    <div
                        className={`switch-slider round ${
                            disabled ? 'disabled' : ''
                        }`}
                    >
                        <span className="on">ON</span>
                        <span className="off">OFF</span>
                    </div>
                </label>
            </div>
        );
    }
}

SwitchButton.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
};
SwitchButton.defaultProps = {
    onChange: f => f,
};

export default SwitchButton;
