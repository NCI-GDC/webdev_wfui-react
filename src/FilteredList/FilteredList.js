import React from 'react';
import List from './List';
import Search from './searchUtil';

/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */
class FilteredList extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           currentPage: props.currentPage,
       };
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
      const { itemDisplay, className, paginatorDisplay, data, pageSize, sortFunction } = this.props;
      const { currentPage } = this.state;
      const filteredData = this.applySearch(this.generateFilteredArticles(data));
      if (sortFunction) {
        filteredData.sort(sortFunction);
      }

      const paginatorObject = this.generatePaginatorObject();
      const InjectedPaginatorDisplay = React.cloneElement(
          paginatorDisplay,
          paginatorObject,
      );
      
      return (
         <div className={className}>
            <List
                data={filteredData}
                itemDisplay={itemDisplay}
                pageSize={pageSize}
                currentPage={currentPage}
            />
            { InjectedPaginatorDisplay }
         </div>
      );
   }
}

FilteredList.propTypes = {
    className: React.PropTypes.string,
    itemDisplay: React.PropTypes.element.isRequired,
    paginatorDisplay: React.PropTypes.element,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    filterList: React.PropTypes.arrayOf(React.PropTypes.func),
    sortFunction: React.PropTypes.func,
    searchTerm: React.PropTypes.string,
};

FilteredList.defaultProps = {
    pageSize: 1000,
    paginatorDisplay: <span />,
    currentPage: 1,
    filterList: [],
    searchTerm: '',
    sortFunction: undefined,
};

export default FilteredList;
