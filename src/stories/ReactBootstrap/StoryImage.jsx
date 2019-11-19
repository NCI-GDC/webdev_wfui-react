import React from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';

const example = (
    <Container>
        <Row>
            <Col xs={6} md={4}>
                <Image src="https://dummyimage.com/150x150/000/fff" rounded />
            </Col>
            <Col xs={6} md={4}>
                <Image
                    src="https://dummyimage.com/150x150/000/fff"
                    roundedCircle
                />
            </Col>
            <Col xs={6} md={4}>
                <Image src="https://dummyimage.com/150x150/000/fff" thumbnail />
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={6}>
                <Image src="https://dummyimage.com/2000x300/000/fff" fluid />
            </Col>
        </Row>
    </Container>
);
export default example;
