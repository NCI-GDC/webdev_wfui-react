import React from 'react';
import List from './List';

/*
 * Applies the filtering to the articles and then passes its' props to List for
 * display.
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
   render() {
      const { Article, articleList, pageSize, currentPage } = this.props;
      return (
         <List
            articleList={articleList}
            Article={Article}
            pageSize={pageSize}
            currentPage={currentPage}
         />
      );
   }
}

FilteredList.propTypes = {
    Article: React.PropTypes.func.required,
    articleList: React.PropTypes.arrayOf(React.PropTypes.object),
    pageSize: React.PropTypes.number,
    currentPage: React.propTypes.number,
    filterList: React.PropTypes.arrayOf(React.PropTypes.func),
};
