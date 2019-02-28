/* global document, window */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import Dimensions from 'react-dimensions';

class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rowSelected: undefined, columnWidths: {} };

        this.onHandleScroll = this.onHandleScroll.bind(this);
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this._rowHeightGetter = this._rowHeightGetter.bind(this);
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        const { columnWidths } = this.state;
        const newColumnWidths = {
            ...columnWidths,
            [columnKey]: newColumnWidth,
        };

        this.setState({
            columnWidths: newColumnWidths,
        });
    }

    _rowHeightGetter(idx) {
        const { rowResizeDisabled, rowHeight, rowHeightGetter, id } = this.props;

        if (rowResizeDisabled) return rowHeight;

        if (rowHeightGetter) return rowHeightGetter(idx, this.props);

        const table = document.getElementById(id);
        if (table) {
            const rows = table.getElementsByClassName('public_fixedDataTable_bodyRow');
            if (rows && rows[idx]) {
                const contents = [
                    ...rows[idx].getElementsByClassName('public_fixedDataTableCell_cellContent'),
                ];

                if (contents && contents.length) {
                    let maxHeight = rowHeight;
                    contents.forEach((content, i) => {
                        if (content.offsetHeight > maxHeight) {
                            maxHeight = content.offsetHeight;
                        }
                    });

                    return maxHeight;
                }
            }
        }

        return rowHeight;
    }

    componentDidUpdate(prevProps, prevState) {
        const { id } = this.props;
        const { columnWidths } = this.state;
        const table = document.getElementById(id);
        const row = table.querySelector(
            '.public_fixedDataTable_bodyRow:first-child .public_fixedDataTableCell_cellContent:first-child',
        );

        if (
            JSON.stringify(columnWidths) !== JSON.stringify(prevState.columnWidths) &&
            row &&
            row.click
        ) {
            row.click();
        }
    }

    onHandleScroll() {
        const event = document.createEvent('Event');
        event.initEvent('fixedTableScrollStart', true, true);
        window.dispatchEvent(event);
    }

    render() {
        const {
            itemFormat,
            data,
            pageSize,
            currentPage,
            selectable,
            onCheck,
            onRowClick,
            allCheckbox,
            toggleSort,
            sortedOrientation,
            sortedIdx,
            contentWidth,
            contentHeight,
            containerHeight,
            containerWidth,
            noTableHeader,
            rowHeight,
            headerHeight,
            columnResizeDisabled,
            isResponsive,
        } = this.props;
        const { rowSelected, columnWidths } = this.state;

        const indexOffset = (currentPage - 1) * pageSize;

        /* Calculates the Table of articles that should be displayed on the current page */
        const activeData = [];
        const numArticles = data ? data.length : 0;
        const startingArticle = pageSize * (currentPage - 1);

        for (let i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
            activeData.push({ ...data[i], columnWidths });
        }

        return (
            <Table
                rowHeight={rowHeight}
                headerHeight={noTableHeader ? 0 : headerHeight}
                rowsCount={activeData.length}
                width={isResponsive ? containerWidth : contentWidth}
                height={isResponsive ? containerHeight : contentHeight}
                onRowClick={(event, rowIndex) => {
                    if (
                        event.target.tagName !== 'INPUT' &&
                        event.target.tagName !== 'BUTTON' &&
                        !event.target.querySelector('.row-selector')
                    ) {
                        // e.stopPropagation on cell doesn't work. This will be invoked first.
                        onRowClick(activeData[rowIndex], event);
                        this.setState({ rowSelected: rowIndex });
                    }
                }}
                rowClassNameGetter={idx =>
                    classNames(
                        {
                            even: (idx + 1) % 2 === 0,
                            add: (idx + 1) % 2 !== 0,
                            checked: activeData[idx].checked,
                            selected: rowSelected === idx,
                        },
                        activeData[idx].className || '',
                    )
                }
                onScrollStart={this.onHandleScroll}
                onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                isColumnResizing={false}
                rowHeightGetter={this._rowHeightGetter}
                touchScrollEnabled
                keyboardScrollEnabled
                data={activeData}
            >
                {selectable && (
                    <Column
                        columnKey={'select'}
                        header={noTableHeader ? undefined : <Cell>{allCheckbox}</Cell>}
                        cell={props => (
                            <Cell {...props}>
                                <input
                                    className="row-selector"
                                    type="checkbox"
                                    checked={activeData[props.rowIndex].checked}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        onCheck(activeData[props.rowIndex].idx);
                                    }}
                                />
                            </Cell>
                        )}
                        width={30}
                    />
                )}
                {itemFormat.map((item, i) => {
                    let flexGrow = null;
                    if (columnResizeDisabled) {
                        flexGrow = 1;
                    } else if (item.flexGrow) {
                        flexGrow = item.flexGrow;
                    }

                    return (
                        <Column
                            key={i}
                            {...item}
                            columnKey={item.columnKey || item.name}
                            header={
                                noTableHeader ? (
                                    undefined
                                ) : (
                                    <Cell
                                        className={classNames({
                                            sortActive: sortedIdx === i,
                                            sortDesc:
                                                sortedIdx === i && sortedOrientation === 'desc',
                                            sortAsc: sortedIdx === i && sortedOrientation === 'asc',
                                        })}
                                    >
                                        {/* Setup the header row and onClick for sorting if applicable */}
                                        {item.sortingKey ? (
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    toggleSort(e, i);
                                                }}
                                            >
                                                {item.name}
                                            </a>
                                        ) : (
                                            item.name
                                        )}
                                    </Cell>
                                )
                            }
                            cell={props => (
                                <Cell {...props} className={item.className}>
                                    {item.display(activeData[props.rowIndex])}
                                </Cell>
                            )}
                            isResizable={!columnResizeDisabled && !flexGrow}
                            flexGrow={flexGrow}
                            width={columnWidths[item.columnKey || item.name] || item.width || 20}
                        />
                    );
                })}
            </Table>
        );
    }
}

TableBody.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    selectable: PropTypes.bool.isRequired,
    itemFormat: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCheck: PropTypes.func.isRequired,
    onRowClick: PropTypes.func,
    allCheckbox: PropTypes.element,
    toggleSort: PropTypes.func,
    sortedOrientation: PropTypes.string,
    sortedIdx: PropTypes.number,
    contentWidth: PropTypes.number,
    contentHeight: PropTypes.number,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    rowHeightGetter: PropTypes.func,
    headerHeight: PropTypes.number,

    rowResizeDisabled: PropTypes.bool,
    columnResizeDisabled: PropTypes.bool,
    noTableHeader: PropTypes.bool,

    isResponsive: PropTypes.bool,
};

TableBody.defaultProps = {
    onRowClick: f => f,
    toggleSort: f => f,
    contentWidth: 100,
    contentHeight: 300,
};

const ResponsiveTableBody = Dimensions({ elementResize: true })(props => (
    <TableBody {...props} isResponsive />
));

const TableBodyWrapper = props => <TableBody {...props} isResponsive={false} />;

export default TableBody;

export { ResponsiveTableBody };
