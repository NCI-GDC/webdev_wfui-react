import React, { useState } from 'react';
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Dropdown,
    DropdownButton,
    FormControl,
    SplitButton,
} from 'react-bootstrap';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={e => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        child =>
                            !value ||
                            child.props.children.toLowerCase().startsWith(value)
                    )}
                </ul>
            </div>
        );
    }
);

const example = (
    <div>
        <div>
            <h1>Single button dropdowns</h1>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            Something else
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                <DropdownButton
                    id="dropdown-basic-button"
                    title="Dropdown button"
                >
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        Something else
                    </Dropdown.Item>
                </DropdownButton>
            </div>
            <div>
                <ButtonToolbar>
                    {[
                        'Primary',
                        'Secondary',
                        'Success',
                        'Info',
                        'Warning',
                        'Danger',
                    ].map(variant => (
                        <DropdownButton
                            title={variant}
                            variant={variant.toLowerCase()}
                            id={`dropdown-variants-${variant}`}
                            key={variant}
                        >
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" active>
                                Active Item
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                Separated link
                            </Dropdown.Item>
                        </DropdownButton>
                    ))}
                </ButtonToolbar>
            </div>
        </div>
        <div>
            <h1>Split button dropdowns</h1>
            <div>
                <Dropdown as={ButtonGroup}>
                    <Button variant="success">Split Button</Button>

                    <Dropdown.Toggle
                        split
                        variant="success"
                        id="dropdown-split-basic"
                    />

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            Something else
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                <ButtonToolbar>
                    {[
                        'Primary',
                        'Secondary',
                        'Success',
                        'Info',
                        'Warning',
                        'Danger',
                    ].map(variant => (
                        <SplitButton
                            title={variant}
                            variant={variant.toLowerCase()}
                            id={`dropdown-split-variants-${variant}`}
                            key={variant}
                        >
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" active>
                                Active Item
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                Separated link
                            </Dropdown.Item>
                        </SplitButton>
                    ))}
                </ButtonToolbar>
            </div>
        </div>
        <div>
            <h1>Sizing</h1>
            <div>
                <ButtonToolbar>
                    {[DropdownButton, SplitButton].map((DropdownType, idx) => (
                        <DropdownType
                            size="lg"
                            title="Drop small"
                            id={`dropdown-button-drop-${idx}`}
                            key={idx}
                        >
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3">
                                Something else here
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                Separated link
                            </Dropdown.Item>
                        </DropdownType>
                    ))}
                </ButtonToolbar>
                <ButtonToolbar>
                    {[DropdownButton, SplitButton].map((DropdownType, idx) => (
                        <DropdownType
                            size="sm"
                            variant="secondary"
                            title="Drop small"
                            id={`dropdown-button-drop-${idx}`}
                            key={idx}
                        >
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3">
                                Something else here
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                Separated link
                            </Dropdown.Item>
                        </DropdownType>
                    ))}
                </ButtonToolbar>
            </div>
        </div>
        <div>
            <h1>Drop directions</h1>
            <div>
                <ButtonToolbar>
                    {['up', 'down', 'left', 'right'].map(direction => (
                        <DropdownButton
                            drop={direction}
                            variant="secondary"
                            title={` Drop ${direction} `}
                            id={`dropdown-button-drop-${direction}`}
                            key={direction}
                        >
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3">
                                Something else here
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                Separated link
                            </Dropdown.Item>
                        </DropdownButton>
                    ))}
                </ButtonToolbar>
            </div>
            <div>
                <ButtonToolbar>
                    {['up', 'down', 'left', 'right'].map(direction => (
                        <SplitButton
                            drop={direction}
                            variant="secondary"
                            title={`Drop ${direction}`}
                            id={`dropdown-button-drop-${direction}`}
                            key={direction}
                        >
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3">
                                Something else here
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                Separated link
                            </Dropdown.Item>
                        </SplitButton>
                    ))}
                </ButtonToolbar>
            </div>
        </div>
        <div>
            <h1>Dropdown items</h1>
            <div>
                <h2>Basic Example</h2>
                <DropdownButton
                    id="dropdown-item-button"
                    title="Dropdown button"
                >
                    <Dropdown.Item as="button">Action</Dropdown.Item>
                    <Dropdown.Item as="button">Another action</Dropdown.Item>
                    <Dropdown.Item as="button">Something else</Dropdown.Item>
                </DropdownButton>
            </div>
            <div>
                <h2>Menu alignment</h2>
                <DropdownButton
                    alignRight
                    title="Dropdown right"
                    id="dropdown-menu-align-right"
                >
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        Something else here
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
        <div>
            <h1>Menu headers</h1>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu show>
                    <Dropdown.Header>Dropdown header</Dropdown.Header>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        Something else here
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div>
            <h1>Menu dividers</h1>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu show>
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        Something else here
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div>
            <h1>Customization</h1>
            <div>
                <h2>Basic Example</h2>
                <ButtonToolbar>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-1">
                            Pow! Zoom!
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" active>
                                Active Item
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                Separated link
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown as={ButtonGroup}>
                        <Button variant="info">mix it up style-wise</Button>
                        <Dropdown.Toggle
                            split
                            variant="success"
                            id="dropdown-custom-2"
                        />
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" active>
                                Active Item
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">
                                Separated link
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ButtonToolbar>
            </div>
            <div>
                <h2>Custom Component</h2>
                <Dropdown>
                    <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                    >
                        Custom toggle
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                        <Dropdown.Item eventKey="3" active>
                            Orange
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    </div>
);

export default example;
