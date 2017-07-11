/* eslint react/prop-types : 0 */
import React from 'react';

/**
 * Reusable field component.
 */
export const renderSelectFilter = ({ name, category, onHandleChange, items, capitalize }) => (
    <select
        name={name}
        id={name}
        value={category[name] || ''}
        onChange={onHandleChange}
    >
        {
            items.map((item, idx) => (
                <option key={idx} value={idx === 0 ? '' : (item.value || item)} className={capitalize ? 'text-capitalize' : ''}>{item.label || item}</option>
            ))
        }
    </select>
);

export const renderDateFilter = ({ name, category, onHandleChange }) => (
    <input
        type="date"
        name={name}
        id={name}
        value={category[name] || ''}
        onChange={onHandleChange}
    />
);

export const renderTextFilter = ({ name, category, onHandleChange }) => (
    <input
        type="text"
        name={name}
        id={name}
        value={category[name] || ''}
        onChange={onHandleChange}
    />
);
