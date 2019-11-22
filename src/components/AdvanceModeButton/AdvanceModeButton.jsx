import React from 'react';
import PropTypes from 'prop-types';

class AdvanceModeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advanced: false,
        };
    }

    render() {
        const { onChange, label, id } = this.props;
        const { advanced } = this.state;

        return (
            <div className="advance-mode-button">
                {label && label.length ? (
                    <span className="title">{label}</span>
                ) : null}
                <label htmlFor={id || 'togBtn-advance-mode'} className="switch">
                    <input
                        name="advance"
                        type="checkbox"
                        id={id || 'togBtn-advance-mode'}
                        value={advanced}
                        onChange={() => {
                            this.setState({ advanced: !advanced });
                            onChange(!advanced);
                        }}
                    />
                    <div className="slider round">
                        <span className="on">ON</span>
                        <span className="off">OFF</span>
                    </div>
                </label>
            </div>
        );
    }
}

AdvanceModeButton.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    id: PropTypes.string,
};
AdvanceModeButton.defaultProps = {
    onChange: f => f,
};

export default AdvanceModeButton;
