import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import FilteredTable from '../../src/FilteredTable/FilteredTable';

export default (
    <Grid>
        <Row>
        <Col xs={4} md={2}>
        <Image src="https://dummyimage.com/100x100/000/fff" rounded />
        </Col>
        <Col xs={4} md={2}>
        <Image src="https://dummyimage.com/100x100/000/fff" circle />
        </Col>
        <Col xs={4} md={2}>
        <Image src="https://dummyimage.com/100x100/000/fff" thumbnail />
        </Col>
        </Row>
    </Grid>
)
