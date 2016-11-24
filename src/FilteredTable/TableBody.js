import React from 'react';

class TableBody extends React.Component {
  constructor(props) {
       super(props);

       this.state = {
           sortedIdx: -1,
           sortedOrientation: 'desc',
       };
   }

   toggleSort(idx) {
       const { sortedIdx, sortedOrientation } = this.state;
       if (sortedIdx === idx) {
           if (sortedOrientation === 'desc') {
               this.setState({ sortedOrientation: 'asc' });
           } else {
               /* Disable sorting if you click twice on the same label */
               this.setState({ sortedIdx: -1 });
           }
       } else {
           this.setState({ sortedOrientation: 'desc' });
           this.setState({ sortedIdx: idx });
       }
   }



   render() {
      const { rows,
              data,
              pageSize,
              currentPage,
              selectable,
              onCheck,
              onAllCheck,
              checks,
            } = this.props;

      const { sortedIdx, sortedOrientation } = this.state;

      /* Calculates the Table of articles that should be displayed on the current page */
      const activeData = [];
      const numArticles = data ? data.length : 0;
      const startingArticle = pageSize * (currentPage - 1);

      for (let i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
         activeData.push(data[i]);
      }

      let sortedData = activeData;

      /* Handle sorting */
      if (sortedIdx !== -1) {
        sortedData = sortedData.sort((a, b) => {
            const getSortingData = rows[sortedIdx].sortingKey;
            if (sortedOrientation === 'desc') {
                return getSortingData(a) > getSortingData(b);
            }
            return getSortingData(a) < getSortingData(b);
        });
      }

      /* Form row using the provided data functions. */
      const itemDisplays = sortedData.map((item, idx) => {
         const rowItems = [];
         if (selectable) {
            rowItems.push(
                <td key={idx}>
                    <input
                        type="checkbox"
                        checked={checks[idx]}
                        onClick={() => onCheck(idx)}
                    />
                </td>,
            );
         }
         rows.forEach((cell) => {
             rowItems.push(<td>{cell.display(item)}</td>);
         });
         return (
             <tr>{ rowItems }</tr>
         );
      });

      /* Setup the header row and onClick for sorting if applicable */
      const headerRow = rows.map((cell, idx) =>
        <th key={cell.name}>
            { cell.sortingKey ? 
                <a href="#" onClick={() => this.toggleSort(idx)}>{cell.name}</a> :
                cell.name
            }
        </th>
      );

      return (
         <tbody>
            <tr>
                {
                    selectable ?
                    <th>
                        <input
                            type="Checkbox"
                            onClick={onAllCheck}
                            checked={checks.every(item => item)}
                        />
                    </th>
                    :
                    null
                }
                { headerRow }
            </tr>
            { itemDisplays }
         </tbody>
      );
   }
}

TableBody.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    selectable: React.PropTypes.bool,
    rows: React.PropTypes.arrayOf(React.PropTypes.object),
    onCheck: React.PropTypes.func,
    onAllCheck: React.PropTypes.func,
    checks: React.PropTypes.arrayOf(React.PropTypes.bool),
};

export default TableBody;
