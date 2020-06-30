import React from 'react';
import {
    ButtonToolbar,
    WFUIDropdown as Dropdown,
    MenuItem,
    Glyphicon,
} from '../../components';

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
                        <Dropdown.Item eventKey="1" onClick={f => f}>
                            Edit Display Name
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={f => f}>
                            Edit Description
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={f => f}>
                            Change Logo
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="4" onClick={f => f}>
                            Toggle Visibility
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="5" onClick={f => f}>
                            Export Members
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonToolbar>
        );
    }
}
export default <Example />;
