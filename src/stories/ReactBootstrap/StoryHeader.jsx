import React from 'react';
import {
    ButtonToolbar, Button, ButtonGroup, ProgressBar, MenuItem, Tooltip,
    OverlayTrigger, Nav, Navbar, NavItem, NavDropdown, Tab, Row,
    Col, Pagination, Pager, Label, Badge, Grid, Alert, Image, Table,
    Popover, Modal, DropdownButton, SplitButton, Collapse, Glyphicon,
    Well, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio,
} from 'react-bootstrap';

const example = (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        </Nav>
        <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
        </Form>
    </Navbar.Collapse>
    </Navbar>
)
export default example;