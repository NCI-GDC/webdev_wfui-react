import React from 'react';
import ReactDOM from 'react-dom';
import Listbox from '../../src/Listbox/listbox';
import ListboxOption from '../../src/Listbox/listbox_option';
import InputField from '../../src/InputField/input_field';

let config1 = {
	label: 'Cancer Type',
	placeholder: '- Select one -',
}
let config2 = {
	label: 'Leg Injury Location',
	placeholder: '- Select a location -',
	defaultOption: 'Left Leg',
}
let config3 = {
	label: 'Cancer cause',
	defaultOption: 'Left Leg2',
}


ReactDOM.render( 
	<Listbox {...config1} >
		<ListboxOption value="1" label="Brain" />
		<ListboxOption value="2" label="Leg" />
	</Listbox>, 
	document.getElementById('id1')
);
ReactDOM.render( 
	<Listbox {...config2} >
		<ListboxOption value="1" label="Right Leg" />
		<ListboxOption value="2" label="Left Leg" />
	</Listbox>, 
	document.getElementById('id2')
);
ReactDOM.render( 
	<Listbox {...config3} >
		<ListboxOption value="1" label="Right Leg" />
		<ListboxOption value="2" label="Left Leg2" />
	</Listbox>, 
	document.getElementById('id3')
);