export const setFieldUntouched = (args, state) => {
    const [name] = args;
    const field = state.fields[name];
    if (field) {
        field.touched = false;
    }
};
