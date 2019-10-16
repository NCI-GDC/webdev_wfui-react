import React from 'react';
import {
    ButtonToolbar, Button, ButtonGroup, ProgressBar, DropdownItem, Tooltip,
    OverlayTrigger, Nav, Navbar, NavItem, NavDropdown, Tab, Row,
    Col, Pagination, Pager, Label, Badge, Grid, Alert, Image, Table,
    Popover, Modal, DropdownButton, SplitButton, Collapse, Glyphicon,
    Well, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio,
} from 'react-bootstrap';

const example = (
    <ButtonToolbar>
    <DropdownButton bsStyle="default" title="Dropdown" id={`dropdown-basic-1`}>
        <DropdownItem eventKey="1">Action</DropdownItem>
        <DropdownItem eventKey="2">Another action</DropdownItem>
        <DropdownItem eventKey="3" active>Active Item</DropdownItem>
        <DropdownItem divider />
        <DropdownItem eventKey="4">Separated link</DropdownItem>
    </DropdownButton>
    <SplitButton bsStyle="primary" title="Split Dropdown" id={`split-button-basic-1`}>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem eventKey="1">Action</DropdownItem>
        <DropdownItem eventKey="2">Another action</DropdownItem>
        <DropdownItem eventKey="3">Something else here</DropdownItem>
        <DropdownItem divider />
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem eventKey="4">Separated link</DropdownItem>
    </SplitButton>
    </ButtonToolbar>
);

export default example;