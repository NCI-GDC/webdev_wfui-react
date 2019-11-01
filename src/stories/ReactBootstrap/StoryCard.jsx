import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardColumns,
    CardDeck,
    CardGroup,
    ListGroup,
    ListGroupItem,
    Nav,
} from 'react-bootstrap';

const example = (
    <div>
        <div>
            <h1>Basic Example</h1>
            <Card style={{ width: '18rem' }}>
                <Card.Img
                    variant="top"
                    src="https://dummyimage.com/286x180/000/fff"
                />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
        <div>
            <h1>Content Types</h1>
            <div>
                <h2>Body 1</h2>
                <Card>
                    <Card.Body>This is some text within a card body.</Card.Body>
                </Card>
            </div>
            <div>
                <h2>Body 2</h2>
                <Card body>This is some text within a card body.</Card>
            </div>
            <div>
                <h2>Title, text, and links</h2>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Card Subtitle
                        </Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
        <div>
            <h1>List Groups</h1>
            <div>
                <Card style={{ width: '18rem' }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Header>Featured</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </div>
        <div>
            <h1>Kitchen Sink</h1>
            <Card style={{ width: '18rem' }}>
                <Card.Img
                    variant="top"
                    src="https://dummyimage.com/286x180/000/fff"
                />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        </div>
        <div>
            <h1>Header and Footer</h1>
            <div>
                <h2>Example 1</h2>
                <Card>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to
                            additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <h2>Example 2</h2>
                <Card>
                    <Card.Header as="h5">Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to
                            additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <h2>Example 3</h2>
                <Card>
                    <Card.Header>Quote</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Integer posuere erat a ante.
                            </p>
                            <footer className="blockquote-footer">
                                Someone famous in
                                <cite title="Source Title">Source Title</cite>
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <h2>Example 4</h2>
                <Card className="text-center">
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to
                            additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            </div>
        </div>
        <div>
            <h1>Images</h1>
            <div>
                <h2>Image Caps</h2>
                <Card>
                    <Card.Img
                        variant="top"
                        src="https://dummyimage.com/792x180/000/fff"
                    />
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <Card.Img
                        variant="bottom"
                        src="https://dummyimage.com/792x180/000/fff"
                    />
                </Card>
            </div>
            <div>
                <h2>Image Overlays</h2>
                <Card className="bg-dark text-white">
                    <Card.Img
                        src="https://dummyimage.com/792x180/000/fff"
                        alt="Card image"
                    />
                    <Card.ImgOverlay>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                        </Card.Text>
                        <Card.Text>Last updated 3 mins ago</Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </div>
        </div>
        <div>
            <h1>Navigation</h1>
            <div>
                <h2>Example 1</h2>
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link href="#first">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#disabled" disabled>
                                    Disabled
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to
                            additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <h2>Example 2</h2>
                <Card>
                    <Card.Header>
                        <Nav variant="pills" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link href="#first">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#disabled" disabled>
                                    Disabled
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            With supporting text below as a natural lead-in to
                            additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
        <div>
            <h1>Card Styles</h1>
            <div>
                <h2>Background Color</h2>
                <div>
                    <Card bg="primary" text="white" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Primary Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card
                        bg="secondary"
                        text="white"
                        style={{ width: '18rem' }}
                    >
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Secondary Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card bg="success" text="white" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Success Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card bg="danger" text="white" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Danger Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card bg="warning" text="white" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Warning Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card bg="info" text="white" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Info Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card bg="dark" text="white" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Dark Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Light Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </div>
            </div>
            <div>
                <h2>Border Color</h2>
                <div>
                    <Card border="primary" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Primary Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="secondary" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Secondary Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Success Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="danger" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Danger Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="warning" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Warning Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Info Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="dark" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Dark Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="light" style={{ width: '18rem' }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Light Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </div>
            </div>
        </div>
        <div>
            <h1>Card layout</h1>
            <div>
                <h2>Card Groups</h2>
                <div>
                    <CardGroup>
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://dummyimage.com/243x160/000/fff"
                            />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text
                                    below as a natural lead-in to additional
                                    content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Last updated 3 mins ago
                                </small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://dummyimage.com/243x160/000/fff"
                            />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This card has supporting text below as a
                                    natural lead-in to additional content.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Last updated 3 mins ago
                                </small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://dummyimage.com/243x160/000/fff"
                            />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text
                                    below as a natural lead-in to additional
                                    content. This card has even longer content
                                    than the first to show that equal height
                                    action.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Last updated 3 mins ago
                                </small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
                </div>
            </div>
            <div>
                <h2>Card Deck</h2>
                <div>
                    <CardDeck>
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://dummyimage.com/243x160/000/fff"
                            />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text
                                    below as a natural lead-in to additional
                                    content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Last updated 3 mins ago
                                </small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://dummyimage.com/243x160/000/fff"
                            />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This card has supporting text below as a
                                    natural lead-in to additional content.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Last updated 3 mins ago
                                </small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://dummyimage.com/243x160/000/fff"
                            />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text
                                    below as a natural lead-in to additional
                                    content. This card has even longer content
                                    than the first to show that equal height
                                    action.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Last updated 3 mins ago
                                </small>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                </div>
            </div>
            <div>
                <h2>Card Columns</h2>
                <div>
                    <CardColumns>
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://dummyimage.com/249x160/000/fff"
                            />
                            <Card.Body>
                                <Card.Title>
                                    Card title that wraps to a new line
                                </Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text
                                    below as a natural lead-in to additional
                                    content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="p-3">
                            <blockquote className="blockquote mb-0 card-body">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Integer posuere erat a
                                    ante.
                                </p>
                                <footer className="blockquote-footer">
                                    <small className="text-muted">
                                        Someone famous in
{' '}
                                        <cite title="Source Title">
                                            Source Title
                                        </cite>
                                    </small>
                                </footer>
                            </blockquote>
                        </Card>
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://dummyimage.com/249x160/000/fff"
                            />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This card has supporting text below as a
                                    natural lead-in to additional content.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Last updated 3 mins ago
                                </small>
                            </Card.Footer>
                        </Card>
                        <Card
                            bg="primary"
                            text="white"
                            className="text-center p-3"
                        >
                            <blockquote className="blockquote mb-0 card-body">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Integer posuere erat a
                                    ante.
                                </p>
                                <footer className="blockquote-footer">
                                    <small className="text-muted">
                                        Someone famous in
{' '}
                                        <cite title="Source Title">
                                            Source Title
                                        </cite>
                                    </small>
                                </footer>
                            </blockquote>
                        </Card>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This card has supporting text below as a
                                    natural lead-in to additional content.
                                </Card.Text>
                                <Card.Text>
                                    <small className="text-muted">
                                        Last updated 3 mins ago
                                    </small>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img src="https://dummyimage.com/249x160/000/fff" />
                        </Card>
                        <Card className="text-right">
                            <blockquote className="blockquote mb-0 card-body">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Integer posuere erat a
                                    ante.
                                </p>
                                <footer className="blockquote-footer">
                                    <small className="text-muted">
                                        Someone famous in
{' '}
                                        <cite title="Source Title">
                                            Source Title
                                        </cite>
                                    </small>
                                </footer>
                            </blockquote>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text
                                    below as a natural lead-in to additional
                                    content. This card has even longer content
                                    than the first to show that equal height
                                    action.
                                </Card.Text>
                                <Card.Text>
                                    <small className="text-muted">
                                        Last updated 3 mins ago
                                    </small>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardColumns>
                </div>
            </div>
        </div>
    </div>
);
export default example;
