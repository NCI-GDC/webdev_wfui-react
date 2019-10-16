import React from 'react';
import {
    ButtonToolbar, Button, ButtonGroup, ProgressBar, MenuItem, Tooltip,
    OverlayTrigger, Nav, Navbar, NavItem, NavDropdown, Tab, Row,
    Col, Pagination, Pager, Label, Badge, Container, Alert, Image, Table,
    Popover, Modal, DropdownButton, SplitButton, Collapse, Glyphicon,
    Well, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio,
} from 'react-bootstrap';

const example = (
    <Container className="grid-preview">
        <Row className="show-grid">
            <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
            <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
            <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
            <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
            <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
        </Row>
    </Container>
)
export default example