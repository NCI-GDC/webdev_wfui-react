import React from 'react';
import {
    ButtonToolbar, Button, ButtonGroup, ProgressBar, MenuItem, Tooltip,
    OverlayTrigger, Nav, Navbar, NavItem, NavDropdown, Tab, Row,
    Col, Pagination, Pager, Label, Badge, Grid, Alert, Image, Table,
    Popover, Modal, DropdownButton, SplitButton, Collapse, Glyphicon,
    Well, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio,
} from 'react-bootstrap';

class PaginationAdvanced extends React.Component{
    constructor() {
        super();
        this.state = { activePage: 1 }
    }

    handleSelect(eventKey) {
        this.setState({
        activePage: eventKey
        });
    }

    render() {
        return (
        <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={20}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />
        );
    }
};
const example = (
    <div>
        <PaginationAdvanced />
        <Pagination>
            <Pagination.Item previous href="#">&larr; Previous</Pagination.Item>
            <Pagination.Item disabled next href="#">Next &rarr;</Pagination.Item>
        </Pagination>
    </div>   
);
export default example;