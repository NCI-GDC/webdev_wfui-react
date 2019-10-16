import React from 'react';
import PropTypes from 'prop-types';

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
    constructor(props) {
        super(props);
        this.state = {
            numOfItems: 0,
            startingArticle: 0,
            lastArticle: 0,
        };
    }

    componentDidMount(){
        const { onListDidMount, onNumOfListChange, data } = this.props;
        onListDidMount(data); // deprecate: use onDisplay instead.
        this.updateStatus();
    }

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

    componentDidUpdate(prevProps) {
        const { onDisplay, onNumOfListChange, data } = this.props;
        const { activeData, startingArticle, lastArticle } = calcActiveData(this.props);

        /* Only setState and invoke callbacks when the state is changed to avoid infinite loop */
        if ( activeData.length !== this.state.numOfItems ||
            startingArticle !== this.state.startingArticle ||
            lastArticle !== this.state.lastArticle || 
            prevProps.data.length !== data.length) {
            this.updateStatus();
        }
    }
    
    updateStatus() {
        const { onDisplay, onNumOfListChange, data } = this.props;
        const { activeData, startingArticle, lastArticle } = calcActiveData(this.props);

        this.setState({
            numOfItems: activeData.length,
            startingArticle,
            lastArticle,
        });
        /* Return number of articles. */
        onNumOfListChange(activeData.length); // deprecated: use onDisplay instead.

        /* onDisplay is provided for cases that the client needs to see
        * the range of articles being displayed */
        onDisplay({ starting: startingArticle, last: lastArticle, numListed: activeData.length, numTotal: data.length, rawData: data });
    }

}

List.propTypes = {
    itemDisplay: PropTypes.element.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    container: PropTypes.element,
    onDisplay: PropTypes.func,
    onNumOfListChange: PropTypes.func,
    onListDidMount: PropTypes.func,
};

export default List;
