import React from 'react';

/* Calculates the list of articles that should be displayed on the current page */
const calcActiveData = ({ data, pageSize, currentPage }) => {

    const activeData = [];
    const numArticles = data ? data.length : 0;

    const startingArticle = pageSize * (currentPage - 1);
    const lastArticle = Math.min(startingArticle + pageSize, numArticles);

    for (let i = startingArticle; i < lastArticle; i += 1) {
        activeData.push(data[i]);
    }
    return { activeData, startingArticle, lastArticle };
};

class List extends React.Component {
    render() {
        const { itemDisplay, data, pageSize, currentPage, container } = this.props;

        /* New article object with data injected into it. */
        const { activeData } = calcActiveData(this.props);
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
    componentDidUpdate() {
        const { onDisplay, onNumOfListChange } = this.props;
        const { activeData, startingArticle, lastArticle } = calcActiveData(this.props);
        /* Return number of articles. */
        onNumOfListChange(activeData.length);
        /* onDisplay is provided for cases that the client needs to see
        * the range of articles being displayed */
        onDisplay({ starting: startingArticle, last: lastArticle });
    }
}

List.propTypes = {
    itemDisplay: React.PropTypes.element.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    container: React.PropTypes.element,
    onDisplay: React.PropTypes.func,
    onNumOfListChange: React.PropTypes.func,
};

export default List;
