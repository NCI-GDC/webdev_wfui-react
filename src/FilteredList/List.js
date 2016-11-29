import React from 'react';

class List extends React.Component {
   render() {
      const { itemDisplay, data, pageSize, currentPage, container, onDisplay } = this.props;

      /* Calculates the list of articles that should be displayed on the current page */
      const activeData = [];
      const numArticles = data ? data.length : 0;

      const startingArticle = pageSize * (currentPage - 1);
      const lastArticle = Math.min(startingArticle + pageSize, numArticles);

      for (let i = startingArticle; i < lastArticle; i += 1) {
         activeData.push(data[i]);
      }

      /* onDisplay is provided for cases that the client needs to see
       * the range of articles being displayed */
      onDisplay({ starting: startingArticle, last: lastArticle });

      /* New article object with data injected into it. */
      const itemDisplays = activeData.map((item, idx) => (
         React.cloneElement(
             itemDisplay,
             Object.assign({},
             item,
             { key: idx, idx }),
          )
      ));

      /* Populates the container element passed to this with the items */
      const populatedContainer = React.cloneElement(
          container,
          { children: itemDisplays },
      );
      return populatedContainer;
   }
}

List.propTypes = {
    itemDisplay: React.PropTypes.element.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    container: React.PropTypes.element,
    onDisplay: React.PropTypes.func,
};

export default List;
