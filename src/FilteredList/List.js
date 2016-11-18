import React from 'react';

class List extends React.Component {
   render() {
      const { itemDisplay, data, pageSize, currentPage } = this.props;

      /* Calculates the list of articles that should be displayed on the current page */
      const activeData = [];
      const numArticles = data ? data.length : 0;
      const startingArticle = pageSize * (currentPage - 1);

      for (let i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
         activeData.push(data[i]);
      }

      /* New article object with data injected into it. */
      const itemDisplays = activeData.map(item => (
         React.cloneElement(itemDisplay, { data: item })
      ));

      return (
         <div>
            { itemDisplays }
         </div>
      );
   }
}

List.propTypes = {
    itemDisplay: React.PropTypes.element.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
};

export default List;
