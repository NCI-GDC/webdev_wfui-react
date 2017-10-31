export const transformDataFormToSubmission = (data) => {
    const newData = JSON.parse(JSON.stringify(data));
    Object.keys(newData).forEach((key) => {
        // Data transformation for Add-Inputs type question.
        if (Array.isArray(newData[key])) {
            const answers = [];
            
            newData[key].forEach((answer) => {
                answers.push(answer.value);
            });
            newData[key] = { value: answers };
        }
    });
    return newData;
};
