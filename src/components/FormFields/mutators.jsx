export const setFieldUntouched = (args, state) => {
    const [name] = args;
    const field = state.fields[name];
    if (field) {
        field.touched = false;
    }
};

export const setFieldUnmodified = (args, state) => {
    const [name] = args;
    const field = state.fields[name];
    if (field) {
        field.modified = false;
    }
};

export const setFieldUndirty = (args, state) => {
    const [name] = args;
    const field = state.fields[name];
    if (field) {
        field.dirty = false;
    }
};
