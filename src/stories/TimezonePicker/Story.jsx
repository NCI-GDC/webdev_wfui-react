import React from 'react';
import { TimezonePicker } from '../../components/';

class Example extends React.Component {
    constructor() {
        super();
        this.state = { timezone: "" }
    }
    render() {
        const { timezone } = this.state;
        return (
            <TimezonePicker 
                value={timezone}
                onChange={timezone => this.setState({ timezone: timezone })}
                inputProps={{
                placeholder: 'Select Timezone...',
                name: 'timezone',
                }}
            />
        )
    }
}
export default <Example />;