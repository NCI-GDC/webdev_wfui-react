import React from 'react';
import {
    ButtonToolbar, Button, ButtonGroup, ProgressBar, MenuItem, Tooltip,
    OverlayTrigger, Nav, Navbar, NavItem, NavDropdown, Tab, Row,
    Col, Pagination, Pager, Label, Badge, Grid, Alert, Image, Table,
    Popover, Modal, DropdownButton, SplitButton, Collapse, Glyphicon,
    Well, Form, ControlLabel, FormControl, HelpBlock, Checkbox, Radio,
} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </Form.Group>
  );
}

const example = (
  <Form>
    <Form.Row>
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form.Row>

    <Form.Group controlId="formGridAddress1">
      <Form.Label>Address</Form.Label>
      <Form.Control placeholder="1234 Main St" />
    </Form.Group>

    <Form.Group controlId="formGridAddress2">
      <Form.Label>Address 2</Form.Label>
      <Form.Control placeholder="Apartment, studio, or floor" />
    </Form.Group>

    <Form.Row>
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label>City</Form.Label>
        <Form.Control />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>State</Form.Label>
        <Form.Control as="select">
          <option>Choose...</option>
          <option>...</option>
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Zip</Form.Label>
        <Form.Control />
      </Form.Group>
    </Form.Row>

    <Form.Group id="formGridCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
);

export default example