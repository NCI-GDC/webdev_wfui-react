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

       this.state = {
           currentPage: props.currentPage,
           checkedItems: (new Array(props.data.length)).fill(false),
       };
   }

   componentWillReceiveProps(props) {
       this.setState({
           checkedItems: (new Array(props.data.length)).fill(false),
       });
   }

   generateFilteredArticles(articles) {
      const { filterList } = this.props;
      let filteredArticles = articles;
      filterList.forEach(filter => (
         filteredArticles = filteredArticles.filter(filter)
      ));
      return filteredArticles;
   }

   applySearch(articles) {
      const { searchTerm } = this.props;
      if (searchTerm) {
        return Search.search(articles, searchTerm);
      }
      return articles;
   }

   /* This is called when a individual item's checkbox is clicked */
    onCheck(index) {
        const { checkedItems } = this.state;
        const newArray = checkedItems.slice(0);
        newArray[index] = !newArray[index];
        this.setState({ checkedItems: newArray });
    }

    onAllCheck() {
        const { checkedItems } = this.state;
        const newArray = this.state.checkedItems.slice(0);
        /* If all items are checked, then uncheck everything */
        if (checkedItems.every(item => item)) {
            newArray.fill(false);
        } else {
            /* Else check everything */
            newArray.fill(true);
        }
        this.setState({ checkedItems: newArray });
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
      const { rowData,
              className,
              paginatorDisplay,
              data,
              pageSize,
              sortable,
              selectable,
              onSelectionChange,
              rowNames,
            } = this.props;

      const { checkedItems, currentPage } = this.state;

      const filteredData = this.applySearch(this.generateFilteredArticles(data));

      const paginatorObject = this.generatePaginatorObject();
      const InjectedPaginatorDisplay = React.cloneElement(
          paginatorDisplay,
          paginatorObject,
      );


      return (
         <table className={className}>
            <TableBody
                data={filteredData}
                rowData={rowData}
                pageSize={pageSize}
                currentPage={currentPage}
                selectable={selectable}
                onSelectionChange={onSelectionChange}
                rowNames={rowNames}
                onCheck={this.onCheck}
                onAllCheck={this.onAllCheck}
                checks={checkedItems}
            />
         </table>
      );
   }
}

FilteredTable.propTypes = {
    className: React.PropTypes.string,
    rowData: React.PropTypes.arrayOf(React.PropTypes.func).isRequired,
    paginatorDisplay: React.PropTypes.element,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    filterList: React.PropTypes.arrayOf(React.PropTypes.func),
    searchTerm: React.PropTypes.string,
    selectable: React.PropTypes.bool,
    onSelectionChange: React.PropTypes.func,
    rowNames: React.PropTypes.arrayOf(React.PropTypes.string),
};

FilteredTable.defaultProps = {
    pageSize: 1000,
    paginatorDisplay: <span />,
    currentPage: 1,
    filterList: [],
    searchTerm: '',
    sortFunction: undefined,
    selectable: false,
};

export default FilteredTable;
