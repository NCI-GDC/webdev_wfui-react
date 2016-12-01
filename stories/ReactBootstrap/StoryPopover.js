import React from 'react';
import {
    Popover,
    OverlayTrigger,
    Button,
} from 'react-bootstrap';


const popoverBottom = (
    <Popover id="popover-positioned-bottom" title="Popover bottom">
        <strong>Holy guacamole!</strong> Check this info.
    </Popover>
);
export default(
    <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
        <Button>Holy guacamole!</Button>
    </OverlayTrigger>
);