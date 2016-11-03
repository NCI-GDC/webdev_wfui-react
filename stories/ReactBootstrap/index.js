import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
    ButtonToolbar,
    Button,
    ProgressBar,
    MenuItem,
    Tooltip,
    OverlayTrigger,
    Nav,
    Navbar,
    NavItem,
    NavDropdown,
    Tab,
    Row,
    Col,
    Pagination,
    Pager,
    Label,
    Badge,
    Grid,
    Alert,
} from 'react-bootstrap';

import StoryAvator from './StoryAvator';
import StoryDialog from './StoryDialog';
import StoryButton from './StoryButton';
import StoryDropdown from './StoryDropdown';
import StoryExpander from './StoryExpander';
import StoryForms from './StoryForms';
import StoryIcons from './StoryIcons';
import StoryPopover from './StoryPopover';
import StoryPane from './StoryPane';
import StoryTable from './StoryTable'; 

import StoryBadgesCode from 'raw!./StoryBadges.example';

storiesOf('ReactBootstrap', module)
.addWithInfo2(
    'Badges',
    () => StoryBadgesCode,
    { source: true, static: true, editor: { show: true, editorScope: { Badge } }},
)
.addWithInfo(
    'Buttons',
    () => StoryButton,
    { source: true, static: true }
)
.addWithInfo(
    'Dialog (Modal)',
    () => StoryDialog,
    { source: true, static: true },
)
.addWithInfo(
    'Dropdown',
    () => StoryDropdown,
    { source: true, static: true }
)
.addWithInfo(
    'Expander (Collapse)',
    () => StoryExpander,
    { source: true, static: true }
)
.addWithInfo(
    'Forms',
    () => StoryForms,
    { source: true, static: true }
)
.addWithInfo(
    'Header (Nav)',
    () => (
        <Navbar>
            <Navbar.Header>
            <Navbar.Brand>
                <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            </Navbar.Header>
            <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar>
    ),
    { source: true, static: true },
)
.addWithInfo(
    'Icons',
    () => StoryIcons,
    { source: true, static: true }
)
.addWithInfo(
    'Inline Dialog(Popover)',
    () => StoryPopover,
    { source: true, static: true }
)
.addWithInfo(
    'Labels',
    () => (
        <div>
            <Label bsStyle="default">Default</Label>&nbsp;
            <Label bsStyle="primary">Primary</Label>&nbsp;
            <Label bsStyle="success">Success</Label>&nbsp;
            <Label bsStyle="info">Info</Label>&nbsp;
            <Label bsStyle="warning">Warning</Label>&nbsp;
            <Label bsStyle="danger">Danger</Label>
        </div>
    ),
    { source: true, static: true }
)
.addWithInfo(
    'Message (Alert)',
    () => (
        <div>
            <Alert bsStyle="warning">
                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
            </Alert>
            <Alert bsStyle="success">
                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
            </Alert>
            <Alert bsStyle="danger">
                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
            </Alert>
            <Alert bsStyle="info">
                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
            </Alert>
        </div>
    ),
    { source: true, static: true },
)
.addWithInfo(
    'Pane (Grid)',
    () => StoryPane,
    { source: true, static: true },
)
.addWithInfo(
    'Progress Indicator',
    () => (
        <div>
            <ProgressBar now={60} label={`60%`} />
            <ProgressBar active now={45} />
        </div>
    ),
    { source: true, static: true }
)
.addWithInfo(
    'Table',
    () => StoryTable,
    { source: true, static: true },
)
.addWithInfo(
    'Tabs',
    () => (
        <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
            <Row className="clearfix">
            <Col sm={12}>
                <Nav bsStyle="tabs">
                <NavItem eventKey="first">
                    Tab 1
                </NavItem>
                <NavItem eventKey="second">
                    Tab 2
                </NavItem>
                <NavDropdown eventKey="3" title="Dropdown" id="nav-dropdown-within-tab">
                    <MenuItem eventKey="3.1">Action</MenuItem>
                    <MenuItem eventKey="3.2">Another action</MenuItem>
                    <MenuItem eventKey="3.3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="3.4">Separated link</MenuItem>
                </NavDropdown>
                </Nav>
            </Col>
            <Col sm={12}>
                <Tab.Content animation>
                <Tab.Pane eventKey="first">
                    Tab 1 content
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                    Tab 2 content
                </Tab.Pane>
                <Tab.Pane eventKey="3.1">
                    Tab 3.1 content
                </Tab.Pane>
                <Tab.Pane eventKey="3.2">
                    Tab 3.2 content
                </Tab.Pane>
                <Tab.Pane eventKey="3.3">
                    Tab 3.3 content
                </Tab.Pane>
                <Tab.Pane eventKey="3.4">
                    Tab 3.4 content
                </Tab.Pane>
                </Tab.Content>
            </Col>
            </Row>
        </Tab.Container>
    ),
    { source: true, static: true },
)
.addWithInfo(
    'Tooltip',
    () => {
        const tooltip = (
            <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
        );
        return (
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
        );
    },
    { source: true, static: true },
)
.addWithInfo(
    'Pagination',
    () => {
        const PaginationAdvanced = React.createClass({
            getInitialState() {
                return {
                activePage: 1
                };
            },

            handleSelect(eventKey) {
                this.setState({
                activePage: eventKey
                });
            },

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
            },
        });
        return (
            <div>
                <PaginationAdvanced />
                <Pager>
                    <Pager.Item previous href="#">&larr; Previous</Pager.Item>
                    <Pager.Item disabled next href="#">Next &rarr;</Pager.Item>
                </Pager>
            </div>   
        );
    },
    { source: true, static: true },
)
