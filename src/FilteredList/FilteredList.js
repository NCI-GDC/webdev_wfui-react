import React from 'react';
import List from './List';
import Search from './searchUtil';

/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */
class FilteredList extends React.Component {
   generateFilteredArticles(articles) {
      const { filterList } = this.props;
      let filteredArticles = articles;
      for (const filter of filterList) {
         filteredArticles = filteredArticles.filter(filter);
      }
      return filteredArticles;
   }
   applySearch(articles) {
      //const { searchTerm } = this.props;
      //return Search.search(articles, searchTerm);
      return articles;
   }
   render() {
      const { itemDisplay, className, paginatorDisplay, data, pageSize, currentPage } = this.props;
      const filtereddata = this.applySearch(this.generateFilteredArticles(data));

      return (
         <div className={className}>
            <List
                data={filtereddata}
                itemDisplay={itemDisplay}
                pageSize={pageSize}
                currentPage={currentPage}
            />
         </div>
      );
   }
}

FilteredList.propTypes = {
    className: React.PropTypes.string,
    itemDisplay: React.PropTypes.element.isRequired,
    paginatorDisplay: React.PropTypes.element.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    filterList: React.PropTypes.arrayOf(React.PropTypes.func),
    searchTerm: React.PropTypes.string,
    itemsPerPage: React.PropTypes.number,
};

FilteredList.defaultProps = {
    pageSize: 5,
    currentPage: 1,
    filterList: [],
    searchTerm: '',
    itemsPerPage: -1,
};

export default FilteredList;
