import React from 'react';

class List extends React.Component {
   render() {
      const { Article, articleList, pageSize, currentPage } = this.props;

      /* Calculates the list of articles that should be displayed on the current page */
      const activeArticleList = [];

      const numArticles = articleList.length;
      const startingArticle = pageSize * (currentPage - 1);

      for (let i = startingArticle; i < numArticles; i += 1) {
         activeArticleList.push(articleList[i]);
      }

      return (
         <div>
            { articleList.map(article => <Article article={article} />) }
         </div>
      );
   }
}

List.propTypes = {
    Article: React.PropTypes.func.required,
    articleList: React.PropTypes.arrayOf(React.PropTypes.object),
    pageSize: React.PropTypes.number,
    currentPage: React.propTypes.number,
};
