/* global window, jQuery, extLinkConfig, document */
import React from 'react';
import { IntlProvider, FormattedDate, FormattedTime } from 'react-intl';
import moment from 'moment-timezone';

const sameDay = (d1, d2) => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
};

class FormattedDateRange extends React.Component {
    constructor(props) {
        super();
        let isSameTime = false;
        let isSameDay = false;
        if (props.startDate && props.endDate) {
            const sd = new Date(props.startDate);
            const ed = new Date(props.endDate);

            isSameTime = props.startDate === props.endDate;
            isSameDay = sameDay(sd, ed);
        }
        this.state = {
            isSameTime,
            isSameDay,
        };
    }

    render() {
        const {
            year,
            month,
            day,
            withTime,
            withTimeFull,
            onlyTime,
            startDate,
            endDate,
            toTxt,
            displayOnlyDate,
            displayFullDate,
            displayTimezone,
        } = this.props;
        const timezone = moment.tz(moment.tz.guess()).format('z');
        const { isSameDay, isSameTime } = this.state;

        if (isSameDay && !isSameTime) {
            // Jan 13, 2020 5:00 PM to 6:00 PM (EST)
            return (
                <IntlProvider>
                    <div style={{ display: 'inline' }}>
                        <FormattedDate
                            value={startDate}
                            year={year || 'numeric'}
                            month={month || 'long'}
                            day={day || 'numeric'}
                        />
                        {withTime && ' '}
                        {(withTime || onlyTime) && (
                            <FormattedTime value={startDate} />
                        )}
                        {(withTime || onlyTime) && ` ${toTxt || 'to'} `}
                        {(withTime || onlyTime) && (
                            <FormattedTime value={endDate} />
                        )}
                        {displayTimezone && ` (${timezone})`}
                    </div>
                </IntlProvider>
            );
        }
        if (startDate && endDate && !isSameTime) {
            // Jan 13, 2020 to Jan 14, 2020
            // Jan 13, 2020 5:00 PM (EST) to Jan 14, 2020 6:00 PM (EST) (Full)
            return (
                <IntlProvider>
                    <div style={{ display: 'inline' }}>
                        <FormattedDate
                            value={startDate}
                            year={year || 'numeric'}
                            month={month || 'long'}
                            day={day || 'numeric'}
                        />
                        {withTimeFull && ' '}
                        {withTimeFull && <FormattedTime value={startDate} />}
                        {withTimeFull && displayTimezone && ` (${timezone})`}
                        {` ${toTxt || 'to'} `}
                        <FormattedDate
                            value={endDate}
                            year={year || 'numeric'}
                            month={month || 'long'}
                            day={day || 'numeric'}
                        />
                        {withTimeFull && ' '}
                        {withTimeFull && <FormattedTime value={endDate} />}
                        {withTimeFull && displayTimezone && ` (${timezone})`}
                    </div>
                </IntlProvider>
            );
        }
        if (isSameTime) {
            // Jan 13, 2020
            // Jan 13, 2020 5:00 PM (EST) || withTimeFull
            return (
                <IntlProvider>
                    <div style={{ display: 'inline' }}>
                        {!onlyTime && (
                            <FormattedDate
                                value={startDate}
                                year={year || 'numeric'}
                                month={month || 'long'}
                                day={day || 'numeric'}
                            />
                        )}
                        {withTimeFull && ' '}
                        {(withTimeFull || onlyTime) && (
                            <FormattedTime value={startDate} />
                        )}
                        {displayTimezone && ` (${timezone})`}
                    </div>
                </IntlProvider>
            );
        }
        // Jan 13, 2020
        // Jan 13, 2020 5:00 PM (EST)
        return (
            <IntlProvider>
                <div style={{ display: 'inline' }}>
                    {!onlyTime && (
                        <FormattedDate
                            value={startDate}
                            year={year || 'numeric'}
                            month={month || 'long'}
                            day={day || 'numeric'}
                        />
                    )}
                    {withTime && ' '}
                    {(withTime || onlyTime) && (
                        <FormattedTime value={startDate} />
                    )}
                    {displayTimezone && ` (${timezone})`}
                </div>
            </IntlProvider>
        );
    }
}

export default FormattedDateRange;
