import React from 'react';
import {
    ButtonToolbar, Button, ButtonGroup, ProgressBar, MenuItem, Tooltip,
    OverlayTrigger, Nav, Navbar, NavItem, NavDropdown, Tab, Row,
    Col, Pagination, Pager, Label, Badge, Grid, Alert, Image, Table,
    Popover, Modal, DropdownButton, SplitButton, Collapse, Glyphicon,
    Well, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio,
} from 'react-bootstrap';

const tooltip = (
    <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
);
const example = (
    <ButtonToolbar>

        <OverlayTrigger placement="bottom" overlay={tooltip}>
        <Button bsStyle="default">Holy guacamole!</Button>
        </OverlayTrigger>

        <OverlayTrigger placement="left" overlay={tooltip}>
        <Button bsStyle="default">Holy guacamole!</Button>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={tooltip}>
        <Button bsStyle="default">Holy guacamole!</Button>
        </OverlayTrigger>

    </ButtonToolbar>
)
export default example;