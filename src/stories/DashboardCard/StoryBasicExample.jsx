/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
// import '../../components/DashboardCard/index.scss';

const Hey = ({ item }) => <a href="#">{item}</a>;
const example = (
    <Container>
        <Row>
            <Col xs={12} md={6} lg={4}>
                <DashboardCard>
                    <DashboardCard.Title title="Request a Jira Project" />
                    <DashboardCard.Header>
                        <ul>
                            <li>item1</li>
                            <li>item2</li>
                            <li>item3</li>
                        </ul>
                    </DashboardCard.Header>
                    <DashboardCard.Body>
                        <p>
                            A JIRA project helps your team track tasks and
                            issues as cases. These cases allow you manage
                            changes and progress with your team.
                        </p>
                    </DashboardCard.Body>
                    <DashboardCard.Footer>
                        <a
                            href="#"
                            className="form-box-link request-form-link"
                            title="Request From"
                        >
                            Request Form
                        </a>
                        <a
                            href="#"
                            className="form-box-link app-website-link"
                            title="Visit Jira Website"
                        >
                            jira.oicr.on.ca
                        </a>
                    </DashboardCard.Footer>
                </DashboardCard>
            </Col>
            <Col xs={12} md={6} lg={4}>
                <DashboardCard>
                    <DashboardCard.Title title="Request a Jira Project" />
                    <DashboardCard.Body
                        isList
                        items={['a', 'b']}
                        itemDisplay={<Hey />}
                    />
                    <DashboardCard.Footer>
                        <a
                            href="#"
                            className="form-box-link request-form-link"
                            title="Request From"
                        >
                            Request Form
                        </a>
                        <a
                            href="#"
                            className="form-box-link app-website-link"
                            title="Visit Jira Website"
                        >
                            jira.oicr.on.ca
                        </a>
                    </DashboardCard.Footer>
                </DashboardCard>
            </Col>
        </Row>
    </Container>
);

export default example;
