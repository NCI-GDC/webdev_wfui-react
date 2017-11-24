import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import classNames from 'classnames';

class TableBody extends React.Component {
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
            rowSelect,
            contentWidth,
            contentHeight,
        } = this.props;

        const indexOffset = (currentPage - 1) * pageSize;

        /* Calculates the Table of articles that should be displayed on the current page */
        const activeData = [];
        const numArticles = data ? data.length : 0;
        const startingArticle = pageSize * (currentPage - 1);

        for (
            let i = startingArticle;
            i < startingArticle + pageSize && i < numArticles;
            i += 1
        ) {
            activeData.push(data[i]);
        }

        return (
            <Table
                rowHeight={50}
                headerHeight={50}
                rowsCount={activeData.length}
                width={contentWidth}
                height={contentHeight}
                onRowClick={(event, rowIndex) => {
                    if (selectable && rowSelect) {
                        onCheck(rowIndex + indexOffset);
                    }
                    onRowClick(activeData[rowIndex]);
                }}
                rowClassNameGetter={idx =>
                    classNames({
                        even: (idx + 1) % 2 === 0,
                        add: (idx + 1) % 2 !== 0,
                        selected: activeData[idx].checked,
                    })
                }
                data={activeData}
            >
                {selectable && (
                    <Column
                        columnKey={'select'}
                        header={<Cell>{allCheckbox}</Cell>}
                        cell={props => (
                            <Cell {...props}>
                                <input
                                    type="checkbox"
                                    checked={activeData[props.rowIndex].checked}
                                    onChange={e => {
                                        if (!rowSelect) {
                                            onCheck(
                                                props.rowIndex + indexOffset,
                                            );
                                        }
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
                            <Cell
                                className={classNames({
                                    sortActive: sortedIdx === i,
                                    sortDesc:
                                        sortedIdx === i &&
                                        sortedOrientation === 'desc',
                                    sortAsc:
                                        sortedIdx === i &&
                                        sortedOrientation === 'asc',
                                })}
                            >
                                {/* Setup the header row and onClick for sorting if applicable */}
                                {item.sortingKey ? (
                                    <a
                                        href="#"
                                        onClick={e => {
                                            toggleSort(e, i);
                                        }}
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    item.name
                                )}
                            </Cell>
                        }
                        cell={props => (
                            <Cell {...props}>
                                {item.display(activeData[props.rowIndex])}
                            </Cell>
                        )}
                        flexGrow={item.flexGrow || 1}
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
    rowSelect: React.PropTypes.bool,
    contentWidth: React.PropTypes.number,
    contentHeight: React.PropTypes.number,
};

TableBody.defaultProps = {
    onRowClick: f => f,
    toggleSort: f => f,
    rowSelect: false,
    contentWidth: 100,
    contentHeight: 300,
};

export default TableBody;
