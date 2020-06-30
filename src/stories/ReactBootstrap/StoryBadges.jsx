import React from 'react';
import { Badge, Button } from 'react-bootstrap';

const example = (
    <div>
        <div>
            <h1>
                Example
                <Badge variant="secondary">New</Badge>
            </h1>
            <h2>
                Example
                <Badge variant="secondary">New</Badge>
            </h2>
            <h3>
                Example
                <Badge variant="secondary">New</Badge>
            </h3>
            <h4>
                Example
                <Badge variant="secondary">New</Badge>
            </h4>
            <h5>
                Example
                <Badge variant="secondary">New</Badge>
            </h5>
            <h6>
                Example
                <Badge variant="secondary">New</Badge>
            </h6>
        </div>
        <div>
            <Button variant="primary">
                Profile
                <Badge variant="light">9</Badge>
                <span className="sr-only">unread messages</span>
            </Button>
        </div>
        <div>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="light">Light</Badge>
            <Badge variant="dark">Dark</Badge>
        </div>
        <div>
            <Badge pill variant="primary">
                Primary
            </Badge>
            <Badge pill variant="secondary">
                Secondary
            </Badge>
            <Badge pill variant="success">
                Success
            </Badge>
            <Badge pill variant="danger">
                Danger
            </Badge>
            <Badge pill variant="warning">
                Warning
            </Badge>
            <Badge pill variant="info">
                Info
            </Badge>
            <Badge pill variant="light">
                Light
            </Badge>
            <Badge pill variant="dark">
                Dark
            </Badge>
        </div>
    </div>
);
export default example;
