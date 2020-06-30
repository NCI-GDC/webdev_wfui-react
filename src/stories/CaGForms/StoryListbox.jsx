import React from 'react';
import { Description, Grid, InputField, InputTable, Listbox, ListboxOption, Selection } from '../../components/CaGForms';

let config1 = {
	label: 'Cancer Type',
	placeholder: '- Select one -',
	value: 2
}
let config2 = {
	label: 'Leg Injury Location',
	placeholder: '- Select a location -',
	defaultOption: 'Left Leg',
	errors: 1,
}
let config3 = {
	label: 'Cancer cause',
	defaultOption: 'Left Leg2',
	errors: true,
}

class Example extends React.Component {
	render() {
		return (
			<Listbox {...config1} >
				<ListboxOption value="1" label="Brain" />
				<ListboxOption value="2" label="Leg" />
			</Listbox>
		)
	}
}
export default <Example />