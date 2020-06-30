import React, { useState, useEffect } from 'react';
import {
    ButtonToolbar,
    Button,
    ButtonGroup,
    ToggleButton,
    ToggleButtonGroup,
} from 'react-bootstrap';

function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Loading…' : 'Click to load'}
        </Button>
    );
}

function ToggleButtonGroupControlled() {
    const [value, setValue] = useState([1, 3]);

    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = val => setValue(val);

    return (
        <ToggleButtonGroup
            type="checkbox"
            value={value}
            onChange={handleChange}
        >
            <ToggleButton value={1}>Option 1</ToggleButton>
            <ToggleButton value={2}>Option 2</ToggleButton>
            <ToggleButton value={3}>Option 3</ToggleButton>
        </ToggleButtonGroup>
    );
}

const example = (
    <div>
        <div>
            <h1>Basic Examples</h1>
            <ButtonToolbar>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="info">Info</Button>
                <Button variant="light">Light</Button>
                <Button variant="dark">Dark</Button>
                <Button variant="link">Link</Button>
            </ButtonToolbar>
        </div>
        <div>
            <h1>Outline buttons</h1>
            <ButtonToolbar>
                <Button variant="outline-primary">Primary</Button>
                <Button variant="outline-secondary">Secondary</Button>
                <Button variant="outline-success">Success</Button>
                <Button variant="outline-warning">Warning</Button>
                <Button variant="outline-danger">Danger</Button>
                <Button variant="outline-info">Info</Button>
                <Button variant="outline-light">Light</Button>
                <Button variant="outline-dark">Dark</Button>
            </ButtonToolbar>
        </div>
        <div>
            <h1>Button tags</h1>
            <ButtonToolbar>
                <Button href="#">Link</Button>
                <Button type="submit">Button</Button>
                <Button as="input" type="button" value="Input" />
                <Button as="input" type="submit" value="Submit" />
                <Button as="input" type="reset" value="Reset" />
            </ButtonToolbar>
        </div>
        <div>
            <h1>Sizes</h1>
            <div>
                <ButtonToolbar>
                    <Button variant="primary" size="lg">
                        Large button
                    </Button>
                    <Button variant="secondary" size="lg">
                        Large button
                    </Button>
                </ButtonToolbar>

                <ButtonToolbar>
                    <Button variant="primary" size="sm">
                        Small button
                    </Button>
                    <Button variant="secondary" size="sm">
                        Small button
                    </Button>
                </ButtonToolbar>
            </div>
        </div>
        <div>
            <h1>Block Buttons</h1>
            <div>
                <Button variant="primary" size="lg" block>
                    Block level button
                </Button>
                <Button variant="secondary" size="lg" block>
                    Block level button
                </Button>
            </div>
        </div>
        <div>
            <h1>Active state</h1>
            <ButtonToolbar>
                <Button variant="primary" size="lg" active>
                    Primary button
                </Button>
                <Button variant="secondary" size="lg" active>
                    Button
                </Button>
            </ButtonToolbar>
        </div>
        <div>
            <h1>Disabled state</h1>
            <ButtonToolbar>
                <Button variant="primary" size="lg" disabled>
                    Primary button
                </Button>
{' '}
                <Button variant="secondary" size="lg" disabled>
                    Button
                </Button>
{' '}
                <Button href="#" variant="secondary" size="lg" disabled>
                    Link
                </Button>
            </ButtonToolbar>
        </div>
        <div>
            <h1>Button loading state</h1>
            <LoadingButton />
        </div>
        <div>
            <h1>Checkbox/Radio</h1>
            <div className="d-flex flex-column">
                <ButtonGroup toggle>
                    <ToggleButton type="checkbox" defaultChecked value="1">
                        Checked
                    </ToggleButton>
                </ButtonGroup>
                <ButtonGroup toggle className="mt-3">
                    <ToggleButton
                        type="radio"
                        name="radio"
                        defaultChecked
                        value="1"
                    >
                        Active
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value="2">
                        Radio
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value="3">
                        Radio
                    </ToggleButton>
                </ButtonGroup>
            </div>
        </div>
        <div>
            <h1>Uncontrolled</h1>
            <ButtonToolbar>
                <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
                    <ToggleButton value={1}>
                        Checkbox 1 (pre-checked)
                    </ToggleButton>
                    <ToggleButton value={2}>Checkbox 2</ToggleButton>
                    <ToggleButton value={3}>
                        Checkbox 3 (pre-checked)
                    </ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>

            <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
                    <ToggleButton value={2}>Radio 2</ToggleButton>
                    <ToggleButton value={3}>Radio 3</ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
        </div>
        <div>
            <h1>Controlled</h1>
            <ToggleButtonGroupControlled />
        </div>
    </div>
);
export default example;
