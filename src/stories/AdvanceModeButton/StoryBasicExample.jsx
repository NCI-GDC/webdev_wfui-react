import React from 'react';
import { AdvanceModeButton, Container, Row, Col } from '../../components';

const example = (
    <Container>
        <Row>
            <Col>
                <AdvanceModeButton id="advance-one" />
            </Col>
            <Col>
                <AdvanceModeButton label="Advanced Mode" />
            </Col>
        </Row>
    </Container>
);

export default example;
