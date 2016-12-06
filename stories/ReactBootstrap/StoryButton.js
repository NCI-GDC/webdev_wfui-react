import React from 'react';
import {
    ButtonToolbar,
    Button,
    ButtonGroup,
} from 'react-bootstrap';

export default (
    <div>
        <ButtonToolbar>
            <Button>Default</Button>
            <Button bsStyle="primary">Primary</Button>
            <Button bsStyle="success">Success</Button>
            <Button bsStyle="info">Info</Button>
            <Button bsStyle="warning">Warning</Button>
            <Button bsStyle="danger">Danger</Button>
            <Button bsStyle="link">Link</Button>
        </ButtonToolbar>
        <ButtonToolbar>
            <Button bsSize="large">Large button</Button>
            <Button>Default button</Button>
            <Button bsSize="small">Small button</Button>
            <Button bsSize="xsmall">X-Small button</Button>
        </ButtonToolbar>
        <ButtonGroup>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
        </ButtonGroup>
    </div>
)