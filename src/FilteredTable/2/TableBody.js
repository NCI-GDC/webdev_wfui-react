/* global document, window */
import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import classNames from 'classnames';

class TableBody extends React.Component {
    constructor() {
        super();
        this.state = { rowSelected: undefined };
        this.onHandleScroll = this.onHandleScroll.bind(this);
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
        } = this.props;
        const { rowSelected } = this.state;

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
                rowHeightGetter={rowHeightGetter}
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
                {itemFormat.map((item, i) => (
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
                                        sortDesc: sortedIdx === i && sortedOrientation === 'desc',
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
                                {console.log('props', props)}
                                {item.display(activeData[props.rowIndex])}
                            </Cell>
                        )}
                        flexGrow={typeof item.flexGrow === 'undefined' ? 1 : item.flexGrow}
                        width={item.width || 20}
                    />
                ))}
            </Table>
        );
    }
}

TableBody.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    selectable: React.PropTypes.bool.isRequired,
    itemFormat: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onCheck: React.PropTypes.func.isRequired,
    onRowClick: React.PropTypes.func,
    allCheckbox: React.PropTypes.element,
    toggleSort: React.PropTypes.func,
    sortedOrientation: React.PropTypes.string,
    sortedIdx: React.PropTypes.number,
    contentWidth: React.PropTypes.number,
    contentHeight: React.PropTypes.number,
    rowHeight: React.PropTypes.number,
    rowHeightGetter: React.PropTypes.func,
    headerHeight: React.PropTypes.number,
};

TableBody.defaultProps = {
    onRowClick: f => f,
    toggleSort: f => f,
    contentWidth: 100,
    contentHeight: 300,
};

export default TableBody;
