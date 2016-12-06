import React from 'react';
import {
    ButtonToolbar,
    DropdownButton,
    SplitButton,
    MenuItem,
} from 'react-bootstrap';

export default (
    <ButtonToolbar>
    <DropdownButton bsStyle="default" title="Dropdown" id={`dropdown-basic-1`}>
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3" active>Active Item</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
    <SplitButton bsStyle="primary" title="Split Dropdown" id={`split-button-basic-1`}>
        <MenuItem header>Header</MenuItem>
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3">Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem header>Header</MenuItem>
        <MenuItem eventKey="4">Separated link</MenuItem>
    </SplitButton>
    </ButtonToolbar>
);
