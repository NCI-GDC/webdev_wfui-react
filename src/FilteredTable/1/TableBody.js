import React from 'react';

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
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    selectable: React.PropTypes.bool.isRequired,
    itemFormat: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onCheck: React.PropTypes.func.isRequired,
    checks: React.PropTypes.arrayOf(React.PropTypes.bool).isRequired,
    rowClickable: React.PropTypes.bool,
    onRowClick: React.PropTypes.func,
};

TableBody.defaultProps = {
    rowClickable: false,
    onRowClick: f => f
};

export default TableBody;
