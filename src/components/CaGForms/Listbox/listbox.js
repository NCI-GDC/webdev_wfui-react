import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Listbox
 */
class Listbox extends Component {
    onHandleChange(e) {
        if (this.props.onHandleChange) {
            this.props.onHandleChange(e);
        }
    }

    render() {
        const {
            label,
            placeholder,
            defaultOption,
            children,
            description,
            errors,
            value,
        } = this.props;

        const options = [];
        children.map(function(list_box_option, i) {
            options.push(list_box_option);
        });

        const placeholder_option = placeholder ? (
            <option value="">{placeholder}</option>
        ) : null;

        // check error flag
        let errorClassName = '';
        if (errors) {
            errorClassName += ' wfui-list-box--theme-error';
        }

        return (
            <div className="wfui-list-box">
                {description}
                <div className="wfui-list-box-fields">
                    <label
                        dangerouslySetInnerHTML={{
                            __html: label.replace(/\n/g, '<br/>'),
                        }}
                    />
                    <select
                        className={errorClassName}
                        defaultValue={defaultOption}
                        value={value}
                        onChange={this.onHandleChange.bind(this)}
                    >
                        {placeholder_option}
                        {options}
                    </select>
                </div>
            </div>
        );
    }
}

/**
 * Property types
 */
Listbox.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    errors: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
};
Listbox.defaultProps = {
    label: '',
    placeholder: '',
    defaultOption: '',
    description: '',
    children: [],
    errors: '',
};

export default Listbox;
