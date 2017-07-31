import React from 'react';
import classNames from 'classnames';
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
           dataWithState: this.transformData(props.data),
       };
       this.filteredData = [];
   }

    componentDidMount() {
        this.onFilter(this.generateFilteredArticles(this.applySearch(this.props.data)));
    }

    transformData(data) {
        return data.map((obj, i) => {
            const _obj = JSON.parse(JSON.stringify(obj));
            _obj.checked = false;
            _obj.idx = i;
            return _obj;
        });
    }
   componentWillReceiveProps(nextProps) {

       /* Also note: JSON.stringify is the cheapest arbitrary comparison function
        * since it runs on native code. */
        const thisData = this.props.data;
        const nextData = nextProps.data;

        if (thisData.length !== nextData.length) {
            this.setState({
                dataWithState: this.transformData(nextData),
            });
       }
   }

    componentDidUpdate() {
        const { data } = this.props;
        this.onFilter(this.generateFilteredArticles(this.applySearch(data)));
    }

   /* This is called when a individual item's checkbox is clicked */
    onCheck(index) {
        const { dataWithState } = this.state;
        const newArray = dataWithState.slice(0);
        newArray[index].checked = !newArray[index].checked;

        /* We do this since setstate does not immediately mutate the state */
        this.setState({ dataWithState: newArray },
            () => this.selectionChanged(),
        );
    }

    onAllCheck() {
        const { dataWithState } = this.state;
        const newArray = dataWithState.slice(0);

        if (newArray.every(item => item.checked)) {
            /* If all items are checked, then uncheck everything */
            newArray.forEach((item) => { item.checked = false });
        } else {
            /* Else check everything */
            newArray.forEach((item) => { item.checked = true });
        }

        this.setState({ dataWithState: newArray },
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
                return bData - aData;
            }
            if (typeof aData === 'string') {
                return aData.toLowerCase().localeCompare(bData.toLowerCase());
            }
            return aData - bData;
        });
      }

      return filteredArticles;
   }

   applySearch(articles) {
      const { searchTerm, simpleSearch, searchKeys, wholeWord } = this.props;
      if (searchTerm) {
        const filteredArticles = simpleSearch ? Search.simpleSearch(articles, searchTerm, searchKeys, wholeWord) : Search.search(articles, searchTerm);
        return filteredArticles;
      }

      return articles;
   }

   /* Return a list of the indices of all selected items */
   selectionChanged() {
       const { onSelectionChange } = this.props;
       const { dataWithState } = this.state;

       const indexes = [];
       const checkedItems = dataWithState.filter((item, i) => {
           if (item.checked) indexes.push(i);
           return item.checked;
       });
        
       onSelectionChange(indexes, checkedItems);
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
              pageSize,
              selectable,
              onSelectionChange,
            } = this.props;

      const { currentPage, dataWithState } = this.state;
      this.filteredData = this.applySearch(this.generateFilteredArticles(dataWithState));

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
                                    checked={dataWithState.every(item => item.checked)}
                                />
                            </th>
                            :
                            null
                        }
                        { headerRow }
                    </tr>
                </thead>
                <TableBody
                    data={this.filteredData}
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
                <div className={classNames(className, 'wfui-filtered-table')}>
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
    wholeWord: React.PropTypes.bool,
};

FilteredTable.defaultProps = {
    pageSize: 1000,
    paginatorDisplay: null,
    currentPage: 1,
    filterList: [],
    searchTerm: '',
    selectable: false,
    sortedIdx: -1,
    wholeWord: false,
    onSelectionChange: f => f,
};

export default FilteredTable;