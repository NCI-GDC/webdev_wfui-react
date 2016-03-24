import React from 'react';
import ReactDOM from 'react-dom';
import Radios from '../../src/Radios/radios';
import Radio from '../../src/Radios/radio';

ReactDOM.render(
    <Radios
        label="8. Over the last 2 weeks, how often have you been bothered by the following problems?"
    >
        <Radio label="Label 1" name="test" value="1" checked={true} />
        <Radio label="Label 2" name="test" value="1" />
        <Radio label="Label 3" name="test" value="1" />
    </Radios>,
document.getElementById('app'));