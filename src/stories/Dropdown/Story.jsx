import React from 'react';
import { ButtonToolbar, WFUIDropdown, Dropdown, MenuItem, Glyphicon } from '../../components/';

class Example extends React.Component {
    render() {
        return (
            <ButtonToolbar>
                <Dropdown variant="default" id="cascading-nav-config" pullRight>
                    <Dropdown.Toggle className="btn-config">
                        <Glyphicon glyph="cog" />
                        <span className="sr-only">Configuration</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem
                            eventKey="1"
                            onClick={f => f}
                        >
                            Edit Display Name
                        </MenuItem>
                        <MenuItem
                            eventKey="2"
                            onClick={f => f}
                        >
                            Edit Description
                        </MenuItem>
                        <MenuItem
                            eventKey="3"
                            onClick={f => f}
                        >
                            Change Logo
                        </MenuItem>
                        <MenuItem
                            eventKey="4"
                            onClick={f => f}
                        >
                            Toggle Visibility
                        </MenuItem>
                        <MenuItem
                            eventKey="5"
                            onClick={f => f}
                        >
                            Export Members
                        </MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonToolbar>
        )
    }
}
export default <Example />