import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Grid
 */
class Grid extends Component {
    render() {
        const {
            expandColumn,
            label,
            description,
            children,
            columnNumber,
            errors,
        } = this.props;
        const last = children.length - (children.length % columnNumber);

        // check error flag for default
        let errorClassName = '';
        if (errors) {
            errorClassName = 'wfui-grid__main--error';
        }

        // Render rows and columns ( except last row if number of columns is different from columnNumber)
        //= =========
        let grid;
        const grid_rows = [[]];
        let index = 0;
        children.map(function(child, i) {
            if (expandColumn && i >= last) return;
            if (i != 0 && i % columnNumber == 0) {
                grid_rows[++index] = [];
            }
            grid_rows[index].push(child);
        });
        grid = (
            <div className="wfui-grid__container">
                {grid_rows.map(function(row, i) {
                    return (
                        <div className="wfui-grid__row" key={i}>
                            {row.map(function(child, j) {
                                const className = `wfui-grid__column wfui-grid--col-${columnNumber}`;
                                return (
                                    <div className={className} key={j}>
                                        {child}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        ); //= =========

        if (expandColumn) {
            // Render last row (in case last row has different number of columns)
            var grid_last;
            const grid_rows_last = [];
            children.map(function(child, i) {
                if (i >= last) {
                    grid_rows_last.push(child);
                }
            });
            grid_last = (
                <div className="wfui-grid__container wfui-grid__container--last">
                    <div className="wfui-grid__row">
                        {grid_rows_last.map(function(child, i) {
                            const className = `wfui-grid__column wfui-grid--col-${grid_rows_last.length}`;
                            return (
                                <div className={className} key={i}>
                                    {child}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } //= =========

        return (
            <div className="wfui-grid">
                <label
                    className="wfui-grid__label"
                    dangerouslySetInnerHTML={{
                        __html: label.replace(/\n/g, '<br/>'),
                    }}
                />
                <div className="wfui-grid__description">{description}</div>
                <div className={`wfui-grid__main ${errorClassName}`}>
                    {grid}
                    {grid_last}
                </div>
            </div>
        );
    }
}

/**
 * Property types
 */
Grid.propTypes = {
    label: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    columnNumber: PropTypes.number,
    errors: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
};
Grid.defaultProps = {
    label: '',
    description: '',
    columnNumber: 1,
    errors: '',
    expandColumn: false,
};

export default Grid;
