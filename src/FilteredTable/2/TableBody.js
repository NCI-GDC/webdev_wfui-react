/* global document, window */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';
import classNames from 'classnames';

class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rowSelected: undefined, columnWidths: {} };

        this.onHandleScroll = this.onHandleScroll.bind(this);
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
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
            noTableHeader,
            rowHeight,
            rowHeightGetter,
            headerHeight,
            columnResizeDisabled,
        } = this.props;
        const { rowSelected, columnWidths } = this.state;

        const indexOffset = (currentPage - 1) * pageSize;

        /* Calculates the Table of articles that should be displayed on the current page */
        const activeData = [];
        const numArticles = data ? data.length : 0;
        const startingArticle = pageSize * (currentPage - 1);

        for (let i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
            activeData.push(data[i]);
        }

        return (
            <Table
                rowHeight={rowHeight}
                headerHeight={noTableHeader ? 0 : headerHeight}
                rowsCount={activeData.length}
                width={contentWidth}
                height={contentHeight}
                onRowClick={(event, rowIndex) => {
                    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON') {
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
                rowHeightGetter={(idx) => {
                    const rows = document.getElementsByClassName('public_fixedDataTable_bodyRow');
                    if (rows && rows[idx]) {
                        const contents = [
                            ...rows[idx].getElementsByClassName(
                                'public_fixedDataTableCell_cellContent',
                            ),
                        ];
                        if (contents && contents.length) {
                            let maxHeight = rowHeight;
                            contents.forEach((content) => {
                                if (content.offsetHeight > maxHeight) {
                                    maxHeight = content.offsetHeight;
                                }
                            });
                            return maxHeight;
                        }
                    }
                    return rowHeight;
                }}
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
    rowHeight: PropTypes.number,
    rowHeightGetter: PropTypes.func,
    headerHeight: PropTypes.number,
    columnResizeDisabled: PropTypes.bool,
    noTableHeader: PropTypes.bool,
};

TableBody.defaultProps = {
    onRowClick: f => f,
    toggleSort: f => f,
    contentWidth: 100,
    contentHeight: 300,
};

export default TableBody;
