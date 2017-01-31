import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import actions from './actions/action_creators';
const { addTodoAction, toggleTodoAction, setVisibilityFilterAction } = actions;
const { initAnotherAction, addAnotherAction, editAnotherAction, removeAnotherAction } = actions;

/**
 * Presentation Components
 **/

/**
 * Container Components
 **/
let Another = ({ dispatch, component, id }) => {
  return (
    <tr className="wfui-add-another__row">
      <td className="wfui-add-another__col main-column">{component}</td>
      <td className="wfui-add-another__col wfui-add-another__remove del-column">
      <Button onClick={(e)=>{
        dispatch(removeAnotherAction(id));
      }}>Delete</Button>
      </td>
    </tr>
  )
};
Another = connect()(Another);

let AnotherList = ({ anothers, tableLabel }) => {
  if(anothers.length > 0){
    var header = (
      <tr className="wfui-add-another__row">
        <th className="wfui-add-another__header main-column">{tableLabel}</th>
        <th className="wfui-add-another__header del-column">Remove</th>
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
  dispatch(initAnotherAction(children));
  return (
    <div className="wfui-add-another__add">
      <Button onClick={(e) => {
        e.preventDefault();
        dispatch(addAnotherAction(children));
      }}>+ {buttonLabel}
      </Button>
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

const AnotherTable = (props) => {
  const {label, description} = props;
  return (
    <div>
      <label>{label}</label>
      {description}
      <AnotherList {...props} />
      <AddAnother {...props} />
    </div>
  )
};

/**
 * Property types
 */
AnotherTable.propTypes = {
  label: React.PropTypes.string,
  buttonLabel: React.PropTypes.string,
  tableLabel: React.PropTypes.string,
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
}
AnotherTable.defaultProps = {
  label: '',
  description: '',
  buttonLabel: 'Add',
  tableLabel: '',
}

export default AnotherTable