import React from 'react';
import classNames from 'classnames';
import { stringifyValues } from '../util/stringifyValues';

const Element = (props) => (
    <div className={classNames(props.className, 'wfui-isotope-element')}>
        {React.cloneElement(
            props.itemDisplay,
            Object.assign({}, props.item),
        )}
        <span className="hide isotope-search" aria-hidden="true" hidden>{stringifyValues(props.item)}</span>
    </div>
);

export default Element;
