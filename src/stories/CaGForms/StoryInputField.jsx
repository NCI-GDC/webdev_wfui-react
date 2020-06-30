import React from 'react';
import {
    Description,
    Grid,
    InputField,
    InputTable,
    Listbox,
    ListboxOption,
    Selection,
} from '../../components/CaGForms';

class Example extends React.Component {
    render() {
        return (
            <InputField
                type="text"
                name="input1"
                errors={true}
                label="Type Text:"
                description={<Description content="This is description" />}
            />
        );
    }
}
export default <Example />;
