import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import actions from '../../src/AddAnother/actions/action_creators';
const { addTodoAction, toggleTodoAction, setVisibilityFilterAction } = actions;
const { addAnotherAction, editAnotherAction, removeAnotherAction } = actions;

/**
 * Presentation Components
 **/

/**
 * Container Components
 **/
let Another = ({ dispatch, component, id }) => {
  return (
    <tr className="wfui-add-another__row">
      <td className="wfui-add-another__col">{component}</td>
      <td className="wfui-add-another__col wfui-add-another__remove"><button onClick={(e)=>{
        dispatch(removeAnotherAction(id));
      }}>-</button></td>
    </tr>
  )
};
Another = connect()(Another);

let AnotherList = ({ anothers, label }) => {
  if(anothers.length > 0){
    var header = (
      <tr className="wfui-add-another__row">
        <th className="wfui-add-another__header">{label}</th>
        <th className="wfui-add-another__header">Remove</th>
      </tr>
    )
  }
  return (
    <table className="wfui-add-another">
      <tbody className="wfui-add-another__tbody">
        {header}
        {anothers.map(another =>
          <Another key={another.id} {...another} />
        )}
      </tbody>
    </table>
  )
};


let AddAnother = ({ dispatch, children, buttonLabel }) => {
  return (
    <div className="wfui-add-another__add">
      <button onClick={() => {
        dispatch(addAnotherAction(children));
      }}>{buttonLabel}</button>
    </div>
  );
};
AddAnother = connect()(AddAnother);

//Connect to store
const mapStateToAnotherListProps = (state) => {
  return { anothers: state.anothersReducer };
};
AnotherList = connect(
  mapStateToAnotherListProps
)(AnotherList);

const AnotherTable = (props) => (
  <div>
    <AnotherList {...props} />
    <AddAnother {...props} />
  </div>
);

export default AnotherTable