/* eslint react/prop-types : 0 */
import React from 'react';
import { FormControl, Glyphicon } from '../index';

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
        componentClass="select"
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

export const renderTextFilter = ({
    name,
    category,
    onHandleChange,
    placeholder,
}) => {
    const value = (category && category[name]) || '';
    return (
        <div>
            <FormControl
                type="text"
                name={name}
                id={name}
                value={value}
                onChange={onHandleChange}
                placeholder={placeholder || ''}
            />
            {value && (
                <Glyphicon
                    glyph="remove-circle"
                    bsSize="xsmall"
                    onClick={onHandleChange}
                />
            )}
        </div>
    );
};
