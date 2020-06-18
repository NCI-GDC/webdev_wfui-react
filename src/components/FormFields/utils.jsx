export const setAllFieldsUntouched = form => {
    if (form.mutators && form.mutators.setFieldUntouched) {
        const allFields = form.getRegisteredFields();
        allFields.forEach(setFieldUntouched);
    } else {
        console.warn('Mutator setFieldUntouched is not ');
    }
};
