import React from 'react';
import { Description, Grid, InputField, InputTable, Listbox, ListboxOption, Selection } from '../../components/CaGForms';

class Example extends React.Component {
    render() {
        return (
            <Selection label="Single, never married" name="selection2" value="5" type="checkbox">
                <InputTable fieldType='and' >
                    <InputField type="text" label="Hours:" />
                    <InputField type="text" label="Minutes:" />
                </InputTable>
            </Selection>
        )
    }
}
export default <Example />