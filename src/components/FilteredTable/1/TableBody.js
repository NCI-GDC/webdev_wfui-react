import React from 'react';
import PropTypes from 'prop-types';

class TableBody extends React.Component {
   render() {
      const { itemFormat,
              data,
              pageSize,
              currentPage,
              selectable,
              onCheck,
              checks,
              rowClickable,
              onRowClick,
            } = this.props;

      /* Calculates the Table of articles that should be displayed on the current page */
      const activeData = [];
      const numArticles = data ? data.length : 0;
      const startingArticle = pageSize * (currentPage - 1);

      for (let i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
         activeData.push(data[i]);
      }

      /* Form row using the provided data functions. */
      const itemDisplays = activeData.map((item, idx) => {
         const rowItems = [];
         if (selectable) {
            rowItems.push(
                <td key={`td_${idx}`}>
                    <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => onCheck(item.idx)}
                    />
                </td>,
            );
         }
         if (rowClickable) {
             itemFormat.forEach((cell, rowIdx) => {
                if (cell.excludeRowClick) {
                    rowItems.push(<td key={`td_${idx}_${rowIdx}`} className={cell.className}>{cell.display(item)}</td>);
                } else {
                    rowItems.push(<td key={`td_${idx}_${rowIdx}`} className={cell.className} onClick={() => onRowClick(item)}>{cell.display(item)}</td>);
                }
             });
         } else {
            itemFormat.forEach((cell, rowIdx) => {
                rowItems.push(<td key={`td_${idx}_${rowIdx}`} className={cell.className}>{cell.display(item)}</td>);
            });
         }
         return (
             <tr key={`td_${idx}`} className={`${(idx + 1) % 2 === 0 ? 'even' : 'odd'} ${item.className}`}>{ rowItems }</tr>
         );
      });

      return (
         <tbody>
            { itemDisplays }
         </tbody>
      );
   }
}

TableBody.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    selectable: PropTypes.bool.isRequired,
    itemFormat: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCheck: PropTypes.func.isRequired,
    checks: PropTypes.arrayOf(PropTypes.bool).isRequired,
    rowClickable: PropTypes.bool,
    onRowClick: PropTypes.func,
};

TableBody.defaultProps = {
    rowClickable: false,
    onRowClick: f => f
};

export default TableBody;
