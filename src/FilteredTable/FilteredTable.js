import React from 'react';
import TableBody from './TableBody';
import Search from '../util/searchUtil';

/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */
class FilteredTable extends React.Component {
   constructor(props) {
       super(props);
       this.onCheck = this.onCheck.bind(this);
       this.onAllCheck = this.onAllCheck.bind(this);
       this.lastResultsCount = -1;
       this.state = {
           currentPage: props.currentPage,
           checkedItems: (new Array(props.data.length)).fill(false),
           sortedIdx: props.sortedIdx,
           sortedOrientation: 'desc',
       };
   }

    componentDidMount() {
        this.onFilter(this.generateFilteredArticles(this.applySearch(this.props.data)));
    }

   componentWillReceiveProps(nextProps) {
       /* We need to sync the selected items when some are added
        * or deleted from the list.  Note, this runs in worst case
        * O(A + B + D*max(A,B)) where D is the size of the difference
        * and A and B are the lengths of each list. */

       /* Also note: JSON.stringify is the cheapest arbitrary comparison function
        * since it runs on native code. */
        const { checkedItems } = this.state;
        const thisData = this.props.data;
        const nextData = nextProps.data;
        if (thisData.length !== nextData.length) {
            let u = 0; /* Pointer to current object on old data */
            let z = 0; /* ... on the new checklist/new data. */
            const newCheckedItems = new Array(nextData.length).fill(false);
            while (u < thisData.length && z < nextData.length) {
                if (JSON.stringify(thisData[u]) === JSON.stringify(nextData[z])) {
                    newCheckedItems[z] = checkedItems[u];
                    u += 1;
                    z += 1;
                } else {
                    /* Check if the item was deleted */
                    let p = z + 1;
                    while (p < nextData.length) {
                        if (JSON.stringify(thisData[u]) === JSON.stringify(nextData[z])) {
                            /* Item was found later in the list,
                             * now add it and all elements in between. */
                            z = p + 1; /* Set all items inbetween as checked */
                            newCheckedItems[z + 1] = checkedItems[u];
                            u += 1;
                            break;
                        }
                        p += 1;
                    }
                    if (p === nextData.length) {
                        /* Then item was deleted */
                        u += 1;
                    }
                }
                /* When we hit the end the rest of the items are unchecked anyways
                 * so we don't actually need to do anything */
            }
            this.setState({
                checkedItems: newCheckedItems,
            });
       }
   }

    componentDidUpdate() {
        const { data } = this.props;
        this.onFilter(this.generateFilteredArticles(this.applySearch(data)));
    }

   /* This is called when a individual item's checkbox is clicked */
    onCheck(index) {
        const { checkedItems } = this.state;

        const newArray = checkedItems.slice(0);
        newArray[index] = !newArray[index];

        /* We do this since setstate does not immediately mutate the state */
        this.setState({ checkedItems: newArray },
            () => this.selectionChanged(),
        );
    }

    onAllCheck() {
        const { checkedItems } = this.state;
        const newArray = this.state.checkedItems.slice(0);

        if (checkedItems.every(item => item)) {
            /* If all items are checked, then uncheck everything */
            newArray.fill(false);
        } else {
            /* Else check everything */
            newArray.fill(true);
        }

        this.setState({ checkedItems: newArray },
            () => this.selectionChanged(),
        );
    }

    toggleSort(event, idx) {
       const { sortedIdx, sortedOrientation } = this.state;
       event.preventDefault();
       if (sortedIdx === idx) {
           if (sortedOrientation === 'desc') {
               this.setState({ sortedOrientation: 'asc' });
           } else {
               this.setState({ sortedOrientation: 'desc' });
           }
       } else {
           this.setState({ sortedOrientation: 'desc', sortedIdx: idx });
       }
   }

   /* Passes the list of filtered articles to the callbacks in the props. */
   onFilter(filteredArticles) {
      const { onResultsNumUpdate } = this.props;

       /* Now sort the articles*/
      const resultsCount = filteredArticles.length;
      if (this.lastResultsCount !== resultsCount) {
          this.lastResultsCount = resultsCount;
          if (onResultsNumUpdate) {
              onResultsNumUpdate(resultsCount);
          }
      }
   }

   generateFilteredArticles(articles) {
      const { filterList, itemFormat } = this.props;
      const { sortedIdx, sortedOrientation } = this.state;

      let filteredArticles = articles;
      filterList.forEach(filter => (
         filteredArticles = filteredArticles.filter(filter)
      ));

      if (sortedIdx !== -1) {
        filteredArticles = filteredArticles.sort((a, b) => {
            const getSortingData = itemFormat[sortedIdx].sortingKey;
            const aData = getSortingData(a);
            const bData = getSortingData(b);
            if (sortedOrientation === 'desc') {
                if (typeof aData === 'string') {
                    return bData.toLowerCase().localeCompare(aData.toLowerCase());
                }
                return aData > bData;
            }
            if (typeof aData === 'string') {
                return aData.toLowerCase().localeCompare(bData.toLowerCase());
            }
            return aData < bData;
        });
      }

      return filteredArticles;
   }

   applySearch(articles) {
      const { searchTerm, simpleSearch, searchKeys } = this.props;
      if (searchTerm) {
        const filteredArticles = simpleSearch ? Search.simpleSearch(articles, searchTerm, searchKeys) : Search.search(articles, searchTerm);
        return filteredArticles;
      }

      return articles;
   }

   /* Return a list of the indices of all selected items */
   selectionChanged() {
       const { onSelectionChange } = this.props;
       const { checkedItems } = this.state;

       const selectedItems = [];
       checkedItems.forEach((val, idx) => {
           if (val) {
                selectedItems.push(idx);
           }
       });
       onSelectionChange(selectedItems);
   }

   generatePaginatorObject() {
       const { currentPage } = this.state;
       const { pageSize, data } = this.props;

       const filteredData = this.applySearch(this.generateFilteredArticles(data));
       const dataLength = filteredData ? filteredData.length : 0;
       const numPages = Math.ceil(dataLength / pageSize);

       const Paginator = {
           currentPage,
           numPages,
           /* Returns a function that will open the page 'page'
            * or undefined if the page does not exist.  */
           getOpenPage: (page) => {
               if (page > 0 && page <= numPages) {
                    return (
                        () => (
                            this.setState({ currentPage: page })
                        )
                    );
               }
               return undefined;
           },
       };
       return Paginator;
   }

    render() {
      const { itemFormat,
              className,
              paginatorDisplay,
              data,
              pageSize,
              selectable,
              onSelectionChange,
            } = this.props;

      const { checkedItems, currentPage } = this.state;
      const filteredData = this.applySearch(this.generateFilteredArticles(data));

      /* Setup the header row and onClick for sorting if applicable */
      const headerRow = itemFormat.map((cell, idx) =>
        <th key={cell.name}>
            { cell.sortingKey ?
                <a href="#sort" onClick={e => this.toggleSort(e, idx)}>{cell.name}</a> :
                cell.name
            }
        </th>,
      );

      /* We have to do this to avoid breaking backwards compatibility */
      const table = (
            <table className={className}>
                <thead>
                    <tr>
                        {
                            selectable ?
                            <th>
                                <input
                                    type="Checkbox"
                                    onChange={this.onAllCheck}
                                    checked={checkedItems.every(item => item)}
                                />
                            </th>
                            :
                            null
                        }
                        { headerRow }
                    </tr>
                </thead>
                <TableBody
                    data={filteredData}
                    itemFormat={itemFormat}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    selectable={selectable}
                    onSelectionChange={onSelectionChange}
                    onCheck={this.onCheck}
                    checks={this.state.checkedItems}
                />
            </table>
        );

        if (paginatorDisplay) {
            const paginatorObject = this.generatePaginatorObject();
            const InjectedPaginatorDisplay = React.cloneElement(
                paginatorDisplay,
                paginatorObject,
            );
            return (
                <div>
                    {table}
                    {InjectedPaginatorDisplay}
                </div>
            );
        }
        
        return table;
   }
}

FilteredTable.propTypes = {
    className: React.PropTypes.string,
    paginatorDisplay: React.PropTypes.element,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    filterList: React.PropTypes.arrayOf(React.PropTypes.func),
    searchTerm: React.PropTypes.string,
    selectable: React.PropTypes.bool,
    onSelectionChange: React.PropTypes.func,
    itemFormat: React.PropTypes.arrayOf(React.PropTypes.object),
    onResultsNumUpdate: React.PropTypes.func,
    simpleSearch: React.PropTypes.bool,
    searchKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    sortedIdx: React.PropTypes.number,
};

FilteredTable.defaultProps = {
    pageSize: 1000,
    paginatorDisplay: null,
    currentPage: 1,
    filterList: [],
    searchTerm: '',
    selectable: false,
    sortedIdx: -1,
};

export default FilteredTable;
