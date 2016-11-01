import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
    ButtonToolbar,
    Button,
    ButtonGroup,
    DropdownButton,
    SplitButton,
    MenuItem,
    Popover,
    Tooltip,
    Modal,
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
    Alert,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

storiesOf('ReactBootstrap', module)
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
    { inline: true, source: true, static: true }
)
.addWithInfo(
    'Badges',
    () => (
        <p>Badges <Badge>42</Badge></p>
    ),
    { inline: true, source: true, static: true }
)
.addWithInfo(
    'Buttons',
    () => (
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
    ),
    { inline: true, source: true, static: true }
)
.addWithInfo(
    'Dropdown',
    () => {
        return (
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
        )
    },
    { inline: true, source: true, static: true }
)
.addWithInfo(
    'Modal',
    () => {
        const Example = React.createClass({
            getInitialState() {
                return { showModal: false };
            },

            close() {
                this.setState({ showModal: false });
            },

            open() {
                this.setState({ showModal: true });
            },

            render() {
                const popover = ( <Popover id="modal-popover" title="popover"> very popover. such engagement </Popover>);
                const tooltip = ( <Tooltip id="modal-tooltip"> wow. </Tooltip> );

                return (
                <div>
                    <p>Click to get the full Modal experience!</p>
                    <Button bsStyle="primary" bsSize="large" onClick={this.open} > Launch demo modal </Button>

                    <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                        <h4>Popover in a modal</h4>
                        <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>
                        <h4>Tooltips in a modal</h4>
                        <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
                        <hr />
                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                    </Modal>
                </div>
                );
            }
        });

        return <Example />
    },
    { inline: true }
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
    { inline: true }
)
.addWithInfo(
    'Nav',
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
    { inline: true }
)
.addWithInfo(
    'Tooltip',
    () => {
        const tooltip = (
            <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
        );
        return (
            <ButtonToolbar>
                <OverlayTrigger placement="top" overlay={tooltip}>
                <Button bsStyle="default">Holy guacamole!</Button>
                </OverlayTrigger>

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
    },
    { inline: true }
)
.addWithInfo(
    'Popover',
    () => {
        const popoverBottom = (
            <Popover id="popover-positioned-bottom" title="Popover bottom">
                <strong>Holy guacamole!</strong> Check this info.
            </Popover>
        );
        return (
            
            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                <Button>Holy guacamole!</Button>
            </OverlayTrigger>
        )
    },
    { inline: true }
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
            }
        });
        return (
            <div>
                <PaginationAdvanced />
                <Pager>
                    <Pager.Item previous href="#">&larr; Previous</Pager.Item>
                    <Pager.Item disabled next href="#">Next &rarr;</Pager.Item>
                </Pager>
            </div>   
        )
    },
    { inline: true }
)
.addWithInfo(
    'Alert',
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
    { inline: true, source: true, static: true }
)