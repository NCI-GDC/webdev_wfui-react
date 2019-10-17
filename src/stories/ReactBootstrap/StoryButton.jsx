import React from 'react';
import {
    ButtonToolbar, Button, ButtonGroup, ProgressBar, MenuItem, Tooltip,
    OverlayTrigger, Nav, Navbar, NavItem, NavDropdown, Tab, Row,
    Col, Pagination, Pager, Label, Badge, Grid, Alert, Image, Table,
    Popover, Modal, DropdownButton, SplitButton, Collapse, Glyphicon,
    Well, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio,
} from 'react-bootstrap';

const example = (
    <div>
        <ButtonToolbar>
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="success">Success</Button>
            <Button variant="info">Info</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link</Button>
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
export default example;