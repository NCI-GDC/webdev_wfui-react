import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Selection
 */
class Selection extends Component {
    constructor() {
        super();
    }

    onHandleClick(e) {
        if (e.target.id != 'ws-label') {
            const { type } = this.props;
            if (type == 'radio') {
                this.refs.selection.checked = true;
            }
            // Pass data to a callback.
            if (this.props.onHandleChange) {
                const res = {
                    checked: this.refs.selection.checked,
                    value: this.refs.selection.value,
                    name: this.refs.selection.name,
                };
                this.props.onHandleChange(res);
            }
        }
    }

    render() {
        const {
            label,
            name,
            value,
            defaultChecked,
            children,
            type,
            className,
            active,
        } = this.props;
        const activeClassName = active ? ' active' : '';

        return (
            <div className={`wfui-selection ${className} ${activeClassName}`}>
                <label
                    id="ws-label"
                    className="wfui-selection__label"
                    onClick={this.onHandleClick.bind(this)}
                >
                    <input
                        id="ws-input"
                        className={`wfui-selection__input-${type}`}
                        ref="selection"
                        data-ref="selection"
                        type={type}
                        name={name}
                        value={value}
                        defaultChecked={defaultChecked}
                    />
                    <span
                        id="ws-label"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        {label}
                    </span>
                    {children}
                </label>
            </div>
        );
    }
}

/**
 * Property types
 */
Selection.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.oneOf(['radio', 'checkbox']),
    defaultChecked: PropTypes.bool,
    className: PropTypes.string,
    active: PropTypes.bool,
};
Selection.defaultProps = {
    label: '',
    name: '',
    value: '',
    type: 'radio',
    defaultChecked: false,
    className: '',
};

export default Selection;
