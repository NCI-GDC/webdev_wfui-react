export var setAllFieldsUntouched = function setAllFieldsUntouched(form) {
  if (form.mutators && form.mutators.setFieldUntouched) {
    var allFields = form.getRegisteredFields();
    allFields.forEach(setFieldUntouched);
  } else {
    console.warn('Mutator setFieldUntouched is not ');
  }
};