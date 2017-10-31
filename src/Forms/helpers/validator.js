// Range Validator
const rangeValidator = field => (value) => {
    if (value) {
        if (Number(value) < Number(field.range_lower) || Number(value) > Number(field.range_upper)) {
            return `The number has to be within the range ( from ${field.range_lower} to ${field.range_upper} )`
        }
    }
    return '';
};

// Email Validator
const emailValidator = (value) => {
    if (value) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return 'Please enter a valid email address';
        }
    }
    return '';
};

// Input Hybrid
const inputHybridRequiredValidator = (field, multiple) => (value, values) => {
    if (values && values[multiple.cid] && values[multiple.cid].includes(field.input_id) ) {
        if (!value) {
            return 'Please fill out a value for this input field';
        }
        if (field.field_type === 'email') {
            return emailValidator(value);
        } else if (field.field_type === 'number') {
            return rangeValidator(field)(value);
        }
    }
    return '';
};

// Input Table (AND)
const andGlobalValidator = fields => (values) => {
    let valid = true;
    fields.forEach((field) => {
        valid = valid && values && values[field.cid];
    });
    return valid ? '' : 'Please fill out every field in the table';
};

/**
 * Required Fields
 */

 // For input texts
const requiredInputValidator = fields => (values) => {
    let valid = false;
    if (values) {
        fields.forEach((field) => {
            valid = !!values[field.cid];
        });
    }
    return valid ? '' : 'Please answer the question.';
};

// For select option | textarea
const requiredSimpleValidator = (values) => {
    let valid = false;
    if (values && values.value) valid = true;
    return valid ? '' : 'Please answer the question.';
};

// For radio or checkbox.
const requiredInputHybridValidator = fields => (values) => {
    let valid = false;

    if (values) {
        fields.forEach((field) => {
            if (field.type === 'hybrid') {
                if (typeof values[field.cid] === 'string') {
                    valid = !!values[field.cid];
                } else if (typeof values[field.cid] === 'object') {
                    valid = !!values[field.cid].length;
                }
            }
        });
    }

    return valid ? '' : 'Please answer the question.';
};

// For add input type validation.
const addInputsValidator = (child, field) => (values) => {
    let valid = false;
    if (child.required) valid = requiredSimpleValidator(values);
    if (!valid && field && field.field_type === 'number') valid = rangeValidator(field)(values && values.value);
    if (!valid && field && field.field_type === 'email') valid = emailValidator(values && values.value);
    return valid;
};

// Recursively generating map
const _generateValidatorMap = (children, lang, map) => {
    children.forEach((child) => {
        map[child.id] = { global: [] };
        const fieldInfo = child.values[lang];

        switch(child.type) {
            case 'question-group':
                _generateValidatorMap(child.children, lang, map[child.id]);
                break;
            case 'add-inputs':
                const field = fieldInfo.children[0];
                map[child.id][field.cid] = addInputsValidator(child, field);
                break;
            case 'input-text':
                // Required field
                if (child.required) {
                    map[child.id].global.push(requiredInputValidator(fieldInfo.children));
                }

                if (fieldInfo.children.length > 1) {
                    // Multiple Input Texts (AND)
                    if (fieldInfo.logic === 'AND') map[child.id].global.push(andGlobalValidator(fieldInfo.children));

                    // Range Validation
                    fieldInfo.children.map((field) => {
                        if (field && field.field_type === 'number') map[child.id][field.cid] = rangeValidator(field);
                        if (field && field.field_type === 'email') map[child.id][field.cid] = emailValidator;
                    });
                } else {
                    // Range Validation
                    const field = fieldInfo.children[0];
                    if (field && field.field_type === 'number') map[child.id][field.cid] = rangeValidator(field);
                    if (field && field.field_type === 'email') map[child.id][field.cid] = emailValidator;
                }
                
                break;
            case 'input-hybrid':
                // Required field
                if (child.required) {
                    map[child.id].global.push(requiredInputHybridValidator(fieldInfo.children));
                }
                // Input Hybrid fields validation.
                fieldInfo.children.map((field) => {
                    if (field.type === 'input') {
                        map[child.id][field.cid] = inputHybridRequiredValidator(field, fieldInfo.children[0]);
                    }
                });
                break;
            case 'listbox':
                // Required field
                if (child.required) {
                    map[child.id].global.push(requiredSimpleValidator);
                }
                break;
            case 'textarea':
                // Required field
                if (child.required) {
                    map[child.id].global.push(requiredSimpleValidator);
                }
            default:
                break;
        }
    });
}

export const generateValidatorMap = (children, lang) => {
    const validatorMap = {};
    _generateValidatorMap(children, lang, validatorMap);
    return validatorMap;
};


// Recursively validate questions
const validate = (validatorMap, values, errors, globalErrors, index = -1) => {
    Object.keys(validatorMap).map((key) => {
        errors[key] = {};
        if (Object.keys(validatorMap[key]).length) {
            Object.keys(validatorMap[key]).forEach((cid) => {
                if (cid === 'global') {
                    let globalError;
                    validatorMap[key].global.map((func) => {
                        globalError = func(values[key]);
                    });
                    // const globalError = validatorMap[key].global(values[key]);
                    if (globalError) {
                        if (!globalErrors._error){ 
                            globalErrors._error = {};
                            globalErrors.global = {};
                        }
                        globalErrors._error[`${key}${index >= 0 ? `[${index}]`: ''}`] = globalError;
                        globalErrors.global[`${key}${index >= 0 ? `[${index}]`: ''}`] = globalError; // Set _error in local ( Need this because "_error" values are invisible in syncError valiable. )
                    }

                } else {
                    if (typeof validatorMap[key][cid] === 'function') {
                        if (Array.isArray(values[key])) {
                            // Add Input type questions.
                            errors[key] = [];
                            values[key].forEach((val, i) => {
                                errors[key][i] = {
                                    value: validatorMap[key][cid](val),
                                };
                                // console.log(validatorMap[key][cid](val), 'aaaaa');
                            });
                        } else {
                            errors[key][cid] = validatorMap[key][cid](values[key] && values[key][cid], values[key]);
                        }
                    } else {
                        if (Array.isArray(values[key])) {
                            errors[key] = [];
                            values[key].forEach((val, i) => {
                                errors[key][i] = {};
                                validate(validatorMap[key], val || {}, errors[key][i], globalErrors, i);
                            })
                        } else {
                            validate(validatorMap[key], values[key] || {}, errors[key], globalErrors);
                        }
                    }
                }
            });
        }
    });
};

export const validator = validatorMap => (values) => {
    const errors = {};

    // console.log(values, 'values===============');
    validate(validatorMap, values, errors, errors);
    // console.log(errors, 'errors===============');
    return errors;
};
