import React from 'react';

class TableBody extends React.Component {

   render() {
      const { data,
              pageSize,
              currentPage,
              rowNames,
              selectable,
              rowData,
              onCheck,
              onAllCheck,
              checks,
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
         const row = [];
         if (selectable) {
            row.push(
                <td>
                    <input
                        type="checkbox"
                        checked={checks[idx]}
                        onClick={() => onCheck(idx)}
                    />
                </td>,
            );
         }
         for (const cell of rowData) {
             row.push(<td>{cell(item)}</td>);
         }
         return (
             <tr>{ row }</tr>
         );
      });

      const headerRow = rowNames.map(name => <th key={name}> {name} </th>);
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
    rowData: React.PropTypes.arrayOf(React.PropTypes.func).isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    selectable: React.PropTypes.bool,
    rowNames: React.PropTypes.arrayOf(React.PropTypes.string),
    onCheck: React.PropTypes.func,
    onAllCheck: React.PropTypes.func,
    checks: React.PropTypes.arrayOf(React.PropTypes.bool),
};

export default TableBody;
