'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Range Validator
var rangeValidator = function rangeValidator(field) {
    return function (value) {
        if (value) {
            if (Number(value) < Number(field.range_lower) || Number(value) > Number(field.range_upper)) {
                return 'The number has to be within the range ( from ' + field.range_lower + ' to ' + field.range_upper + ' )';
            }
        }
        return '';
    };
};

// Email Validator
var emailValidator = function emailValidator(value) {
    if (value) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return 'Please enter a valid email address';
        }
    }
    return '';
};

// Input Hybrid
var inputHybridRequiredValidator = function inputHybridRequiredValidator(field, multiple) {
    return function (value, values) {
        if (values && values[multiple.cid] && values[multiple.cid].includes(field.input_id)) {
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
};

// Input Table (AND)
var andGlobalValidator = function andGlobalValidator(fields) {
    return function (values) {
        var valid = true;
        fields.forEach(function (field) {
            valid = valid && values && values[field.cid];
        });
        return valid ? '' : 'Please fill out every field in the table';
    };
};

/**
 * Required Fields
 */

// For input texts
var requiredInputValidator = function requiredInputValidator(fields) {
    return function (values) {
        var valid = false;
        if (values) {
            fields.forEach(function (field) {
                valid = !!values[field.cid];
            });
        }
        return valid ? '' : 'Please answer the question.';
    };
};

// For select option | textarea
var requiredSimpleValidator = function requiredSimpleValidator(values) {
    var valid = false;
    if (values && values.value) valid = true;
    return valid ? '' : 'Please answer the question.';
};

// For radio or checkbox.
var requiredInputHybridValidator = function requiredInputHybridValidator(fields) {
    return function (values) {
        var valid = false;

        if (values) {
            fields.forEach(function (field) {
                if (field.type === 'hybrid') {
                    if (typeof values[field.cid] === 'string') {
                        valid = !!values[field.cid];
                    } else if (_typeof(values[field.cid]) === 'object') {
                        valid = !!values[field.cid].length;
                    }
                }
            });
        }

        return valid ? '' : 'Please answer the question.';
    };
};

// For add input type validation.
var addInputsValidator = function addInputsValidator(child, field) {
    return function (values) {
        var valid = false;
        if (child.required) valid = requiredSimpleValidator(values);
        if (!valid && field && field.field_type === 'number') valid = rangeValidator(field)(values && values.value);
        if (!valid && field && field.field_type === 'email') valid = emailValidator(values && values.value);
        return valid;
    };
};

// Recursively generating map
var _generateValidatorMap = function _generateValidatorMap(children, lang, map) {
    children.forEach(function (child) {
        map[child.id] = { global: [] };
        var fieldInfo = child.values[lang];

        switch (child.type) {
            case 'question-group':
                _generateValidatorMap(child.children, lang, map[child.id]);
                break;
            case 'add-inputs':
                var field = fieldInfo.children[0];
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
                    fieldInfo.children.map(function (field) {
                        if (field && field.field_type === 'number') map[child.id][field.cid] = rangeValidator(field);
                        if (field && field.field_type === 'email') map[child.id][field.cid] = emailValidator;
                    });
                } else {
                    // Range Validation
                    var _field = fieldInfo.children[0];
                    if (_field && _field.field_type === 'number') map[child.id][_field.cid] = rangeValidator(_field);
                    if (_field && _field.field_type === 'email') map[child.id][_field.cid] = emailValidator;
                }

                break;
            case 'input-hybrid':
                // Required field
                if (child.required) {
                    map[child.id].global.push(requiredInputHybridValidator(fieldInfo.children));
                }
                // Input Hybrid fields validation.
                fieldInfo.children.map(function (field) {
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
};

var generateValidatorMap = exports.generateValidatorMap = function generateValidatorMap(children, lang) {
    var validatorMap = {};
    _generateValidatorMap(children, lang, validatorMap);
    return validatorMap;
};

// Recursively validate questions
var validate = function validate(validatorMap, values, errors, globalErrors) {
    var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;

    Object.keys(validatorMap).map(function (key) {
        errors[key] = {};
        if (Object.keys(validatorMap[key]).length) {
            Object.keys(validatorMap[key]).forEach(function (cid) {
                if (cid === 'global') {
                    var globalError = void 0;
                    validatorMap[key].global.map(function (func) {
                        globalError = func(values[key]);
                    });
                    // const globalError = validatorMap[key].global(values[key]);
                    if (globalError) {
                        if (!globalErrors._error) {
                            globalErrors._error = {};
                            globalErrors.global = {};
                        }
                        globalErrors._error['' + key + (index >= 0 ? '[' + index + ']' : '')] = globalError;
                        globalErrors.global['' + key + (index >= 0 ? '[' + index + ']' : '')] = globalError; // Set _error in local ( Need this because "_error" values are invisible in syncError valiable. )
                    }
                } else {
                    if (typeof validatorMap[key][cid] === 'function') {
                        if (Array.isArray(values[key])) {
                            // Add Input type questions.
                            errors[key] = [];
                            values[key].forEach(function (val, i) {
                                errors[key][i] = {
                                    value: validatorMap[key][cid](val)
                                };
                                // console.log(validatorMap[key][cid](val), 'aaaaa');
                            });
                        } else {
                            errors[key][cid] = validatorMap[key][cid](values[key] && values[key][cid], values[key]);
                        }
                    } else {
                        if (Array.isArray(values[key])) {
                            errors[key] = [];
                            values[key].forEach(function (val, i) {
                                errors[key][i] = {};
                                validate(validatorMap[key], val || {}, errors[key][i], globalErrors, i);
                            });
                        } else {
                            validate(validatorMap[key], values[key] || {}, errors[key], globalErrors);
                        }
                    }
                }
            });
        }
    });
};

var validator = exports.validator = function validator(validatorMap) {
    return function (values) {
        var errors = {};

        // console.log(values, 'values===============');
        validate(validatorMap, values, errors, errors);
        // console.log(errors, 'errors===============');
        return errors;
    };
};