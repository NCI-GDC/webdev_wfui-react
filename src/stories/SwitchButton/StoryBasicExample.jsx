import React from 'react';
import { SwitchButton, Container, Row, Col } from '../../components';

const example = (
    <Container>
        <Row>
            <Col>
                <h1>Enabled</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <SwitchButton id="advance-one" />
            </Col>
            <Col>
                <SwitchButton label="Advanced Mode" />
            </Col>
        </Row>
        <Row>
            <Col>
                <h1>Disabled</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <SwitchButton id="advance-one" disabled />
            </Col>
            <Col>
                <SwitchButton label="Advanced Mode" disabled />
            </Col>
        </Row>
    </Container>
);

export default example;
