/* eslint react/prop-types : 0 */
/* global document */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { FormattedHTMLMessage, FormattedNumber } from 'react-intl';
import { FormGroup, ControlLabel, HelpBlock } from '../index';

const dateToString = date => {
    const months = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'June',
        'July',
        'Aug.',
        'Sept.',
        'Oct.',
        'Nov.',
        'Dec.',
    ];

    return `${months[date.getMonth()]} ${date.getDate()}`;
};

const isCurrent = (startDate, endDate) => {
    const date = new Date();
    return (
        date.getTime() >= startDate.getTime() &&
        date.getTime() <= endDate.getTime()
    );
};

class renderEventSelect extends React.Component {
    constructor() {
        super();

        this.state = { checked: true };
        this.onHandleClick = this.onHandleClick.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }
    isChecked(event) {
        const checked = event.fees.reduce((result, fee) => {
            if (result) return result;
            const feeProps = _.get(this.props, fee.name);
            if (feeProps.input && feeProps.input.value) {
                return true;
            }
            return false;
        }, false);
        return checked;
    }
    onHandleClick(e, event) {
        const { disabled } = this.props;
        e.stopPropagation();
        if (!disabled) {
            const { name, changeFieldValue } = this.props;

            this.isChecked(event);
            if (!this.isChecked(event)) {
                event.fees.forEach(fee => {
                    changeFieldValue(`${fee.name}`, true);
                });
            } else {
                event.fees.forEach(fee => {
                    changeFieldValue(`${fee.name}`, false);
                });
            }
        }
    }
    render() {
        const {
            className,
            disabled,
            preview,
            events,
            label,
            required,
            help,
            globalError,
            input,
            name,
            names,
            feeCategories,
        } = this.props;

        let allTouched = false;
        let allPristine = true;

        if (names && names.length) {
            names.forEach(name => {
                const props = _.get(this.props, name);
                allTouched = allTouched && props.meta.touched;
                allPristine = allPristine && props.meta.pristine;
            });
        }

        if (!events || events.length === 0) return null;

        // const date = new Date();
        const event = events[0];

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': globalError },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                )}
            >
                <FormGroup
                    className={`wfui-form-field wfui-table-event`}
                    validationState={
                        !allPristine && globalError ? 'error' : null
                    }
                >
                    <div className="wfui-table">
                        <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th colSpan={disabled ? '1' : '2'}>
                                            <ControlLabel>
                                                {label}
                                                {required && (
                                                    <b className="required">
                                                        {' '}
                                                        *
                                                    </b>
                                                )}
                                            </ControlLabel>
                                        </th>
                                        {feeCategories.map((feeCat, i) => (
                                            <th
                                                key={i}
                                                className={classNames(
                                                    'event-price',
                                                    `category-${
                                                        feeCat.category
                                                    }`,
                                                )}
                                            >
                                                {feeCat.title}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event, i) => {
                                        return (
                                            <tr
                                                onClick={e =>
                                                    this.onHandleClick(e, event)
                                                }
                                                key={i}
                                                className={classNames({
                                                    acitve: this.isChecked(
                                                        event,
                                                    ),
                                                    disabled,
                                                    preview,
                                                })}
                                            >
                                                {!disabled && (
                                                    <td className="event-checkbox">
                                                        <div className="wfui-selection checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="wfui-selection__input-checkbox"
                                                                checked={this.isChecked(
                                                                    event,
                                                                )}
                                                                onChange={e =>
                                                                    this.onHandleClick(
                                                                        e,
                                                                        event,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="event-details">
                                                    <b className="event-title">
                                                        {event.title}
                                                    </b>
                                                    <div
                                                        className="event-description"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                event.description,
                                                        }}
                                                    />
                                                </td>
                                                {feeCategories.map(
                                                    (feeCat, i) => {
                                                        const fee = event.fees.find(
                                                            fee =>
                                                                fee.variable.lastIndexOf(
                                                                    feeCat.category,
                                                                    0,
                                                                ) === 0,
                                                        );
                                                        return (
                                                            <td
                                                                key={i}
                                                                className={classNames(
                                                                    'event-price',
                                                                    {
                                                                        current:
                                                                            fee &&
                                                                            isCurrent(
                                                                                fee.start_date,
                                                                                fee.end_date,
                                                                            ),
                                                                    },
                                                                )}
                                                            >
                                                                {fee &&
                                                                    fee.price && (
                                                                        <b>
                                                                            <FormattedNumber
                                                                                style="currency"
                                                                                currency="CAD"
                                                                                value={
                                                                                    fee.price
                                                                                }
                                                                            />
                                                                        </b>
                                                                    )}
                                                                {fee &&
                                                                    fee.start_date && (
                                                                        <FormattedHTMLMessage
                                                                            id="admin_form_builder.question_type.fee.fee_text"
                                                                            values={{
                                                                                tax:
                                                                                    fee.taxes,
                                                                                end_date: `${dateToString(
                                                                                    fee.end_date,
                                                                                )}, ${fee.end_date.getFullYear()}`,
                                                                            }}
                                                                        />
                                                                    )}
                                                            </td>
                                                        );
                                                    },
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {!allPristine && (
                        <HelpBlock>
                            {' '}
                            {globalError && <span>{globalError}</span>}{' '}
                        </HelpBlock>
                    )}
                    {help && !preview && (
                        <div
                            className="wfui-form-help"
                            dangerouslySetInnerHTML={{ __html: help }}
                        />
                    )}
                </FormGroup>
            </div>
        );
    }
}
export default renderEventSelect;
