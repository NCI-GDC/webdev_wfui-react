import React from 'react';
import { Description, Grid, InputField, InputTable, Listbox, ListboxOption, Selection } from '../../components/CaGForms';

class Example extends React.Component {
	render() {
		return (
			<Grid
				label="8. Over the last 2 weeks, how often have you been bothered by the following problems?"
				description={<Description type="theme-blue" content="Please choose the ONE that best describes your current situation." />}
				columnNumber={3}
				errors={true}>
				<Selection type="radio" label="Married and/or living with a partner" name="radios1" value="1" defaultChecked={true} />
				<Selection type="radio" label="Divored" name="radios1" value="2" />
				<Selection type="radio" label="Widowed" name="radios1" value="3" />
				<Selection type="radio" label="Separated" name="radios1" value="4" />
				<Selection type="radio" label="Single, never married" name="radios1" value="5" />
				<Selection type="radio" label="Widowed" name="radios1" value="6" />
				<Selection type="radio" label="Separated" name="radios1" value="7" />
				<Selection type="radio" label="Single, never married" name="radios1" value="8" />
				<Selection type="radio" label="Widowed" name="radios1" value="9" />
				<Selection type="radio" label="Separated" name="radios1" value="10" />
				<Selection type="radio" label="Single, never married" name="radios1" value="11" />
				<Selection type="radio" label="Widowed" name="radios1" value="12" />
				<Selection type="radio" label="Separated" name="radios1" value="13" />
				<Selection type="radio" label="Single, never married" name="radios1" value="14" />
			</Grid>
		)
	}
}
export default <Example />