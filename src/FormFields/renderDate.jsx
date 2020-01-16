/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import { FormGroup, ControlLabel, HelpBlock } from '../index';

const isISOString = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/;
const dateFormatString = /([12]\d{3}-(0*[1-9]|1[0-2])-(0*[1-9]|[12]\d|3[01]))/;

class renderDate extends React.Component {
    constructor() {
        super();
        this.state = {
            touched: false,
        };
    }
    render() {
        const {
            className,
            label,
            placeholder,
            input,
            help,
            required,
            disabled,
            preview,
            descDisplay,
            globalError,
            fullWidth,
            timeZone,
            meta: { /*touched,*/ error },
            utcOffsetNumber,
            datePickerProps,
            showErrors,
        } = this.props;
        const { touched } = this.state;

        /**
         * If UI is with time, do timezone convertion. If not, use UTC all the time.
         */
        let utcOffset = 0;
        if (datePickerProps.showTimeSelect) {
            utcOffset = datePickerProps.utcOffset
                ? datePickerProps.utcOffset
                : Number(utcOffsetNumber) / 100;
        }
        let selectedValue;
        if (datePickerProps.showTimeSelect) {
            selectedValue = input.value ? moment(input.value) : null
        } else {
            selectedValue = input.value ? moment.utc(input.value) : null
        }

        const convertToISOString = (e) => {
            if (!isNaN(e._d)) {
                if (datePickerProps.showTimeSelect) {
                    /**
                        Calendar with time (Localtime)
                    */
                    input.onChange(e._d.toISOString());
                } else {
                    /**
                        Calendar without time (UTC)
                    */

                    // There is a bug in DatePicker that the Moment object is not UTC. In that case, use e._i ('20XX-XX-XX' string) to get new ISOString.
                    if (e._isValid && !e._isUTC && e._i) {
                        input.onChange(new Date(e._i).toISOString());

                    } else {
                        input.onChange(e._d.toISOString());
                    }
                }
            }
        }

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error': (touched || showErrors) && (error || globalError),
                    },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { 'wfui-form-item-full-width': fullWidth }
                )}
            >
                {label && (
                    <div className="wfui-form-label">
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    </div>
                )}
                <FormGroup
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                        } wfui-form-date`}
                    validationState={(touched || showErrors) && (error || globalError) ? 'error' : null}
                >
                    {!disabled ? (
                        <div className="wfui-form-datepicker">
                            <DatePicker
                                {...datePickerProps}
                                utcOffset={utcOffset}
                                selected={selectedValue}
                                onChangeRaw={(e) => {
                                    input.onChange(e.target.value);
                                }}
                                onSelect={convertToISOString}
                                onChange={convertToISOString}
                                onBlur={(e) => {
                                    this.setState({ touched: true });
                                    // This logic is needed when user manually type date string in UI and not exactly following the format 20XX-XX-XX (something like 2020-1-1 )
                                    if (!input.value.match(isISOString) && input.value.match(dateFormatString)) {
                                        const parsedDate = new Date(input.value);
                                        if (!isNaN(parsedDate)) {
                                            if (datePickerProps.showTimeSelect) {
                                                /**
                                                    Calendar with time (Localtime)
                                                    ---------------------------
                                                    new Date with the string and get ISO string.
                                                */
                                                input.onChange(parsedDate.toISOString());
                                            } else {
                                                /**
                                                    Calendar without time (UTC)
                                                    ---------------------------
                                                    There is a bug in a browser that new Date('2020-01-01') and new Date('2020-1-1') generates different time.
                                                    So use Date.UTC to make sure that time is always 00:00:00
                                                 */
                                                const dates = input.value.split('-');
                                                input.onChange(new Date(Date.UTC(Number(dates[0]), Number(dates[1] - 1), Number(dates[2]), 0, 0, 0)).toISOString())
                                            }
                                        }
                                    }
                                }}
                                placeholderText={placeholder}
                            />
                            {datePickerProps.showTimeSelect && (<span className="timezone">
                                {timeZone} ({utcOffsetNumber})
                            </span>)}
                        </div>
                    ) : (
                            <p className="date-value">
                                {input.value ? new Date(input.value).toString() : ''}
                            </p>
                        )}
                    {(touched || showErrors) && error && (
                        <HelpBlock className="wfui-form-error">
                            <span>{error}</span>
                        </HelpBlock>
                    )}
                    {(touched || showErrors) && globalError && (
                        <HelpBlock className="wfui-form-error">
                            <span>{globalError}</span>
                        </HelpBlock>
                    )}
                    {help && !preview && (
                        <div
                            className="wfui-form-help"
                            dangerouslySetInnerHTML={{ __html: help }}
                        />
                    )}
                </FormGroup>
                {descDisplay && !preview ? cloneElement(descDisplay) : ''}
            </div>
        );
    }
}

renderDate.propTypes = {
    datePickerProps: PropTypes.object,
};
renderDate.defaultProps = {
    datePickerProps: {
        timeFormat: 'HH:mm',
        dateFormat: 'YYYY-MM-DD HH:mm',
        showTimeSelect: true,
    },
    utcOffsetNumber: new Date().toString().match(/([-\+][0-9]+)\s/)[1],
    timeZone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1],
};

export default renderDate;
