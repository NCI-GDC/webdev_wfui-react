/* eslint react/prop-types : 0 */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { FormControl, Icon } from '../index';

/**
 * Reusable field component.
 */
export const renderSelectFilter = ({
    name,
    category,
    onHandleChange,
    items,
    capitalize,
}) => (
    <FormControl
        name={name}
        id={name}
        as="select"
        onChange={onHandleChange}
        value={(category && category[name]) || ''}
        selected={(category && category[name]) || ''}
    >
        {items.map((item, idx) => (
            <option
                key={idx}
                value={idx === 0 ? item.value || '' : item.value || item}
                className={capitalize ? 'text-capitalize' : ''}
            >
                {item.label || item}
            </option>
        ))}
    </FormControl>
);

export const renderDateFilter = ({ name, category, onHandleChange }) => (
    <FormControl
        type="date"
        name={name}
        id={name}
        value={(category && category[name]) || ''}
        onChange={onHandleChange}
    />
);

const RenderTextFilter = ({ name, category, onHandleChange, placeholder }) => {
    const [initialized, setInitialized] = useState(false);
    const [value, setValue] = useState((category && category[name]) || '');

    useEffect(() => {
        if (!initialized) {
            if (category && category[name]) {
                setInitialized(true);
                setValue((category && category[name]) || '');
            }
        }
    }, [category, initialized, name, value]);

    const debouce = _.debounce(e => {
        onHandleChange(e);
    }, 150);
    const onChange = e => {
        setValue(e.target.value);
        debouce({
            target: {
                value: e.target.value,
            },
        });
    };

    return (
        <div className="wfui-text-filter">
            <FormControl
                type="text"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder || ''}
            />
            {value && (
                <button className="input-clear" onClick={onChange} value="">
                    <Icon name="times" bsSize="xsmall" />
                </button>
            )}
        </div>
    );
};
export const renderTextFilter = RenderTextFilter;
