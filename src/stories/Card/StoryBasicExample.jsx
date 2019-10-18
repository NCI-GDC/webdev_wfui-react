import React from 'react';
import Card from '../../components/Card/Card';
// import '../../components/Card/index.scss';

const example = (
    <div>
        <Card className="col-xs-4" cardStyle={{ border: '1px solid #000' }}>
            <Card.Body>
                <h1>Default</h1>
                <p>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum
                </p>
            </Card.Body>
            <Card.Hover>
                <h1>Hover</h1>
            </Card.Hover>
        </Card>
        <Card className="col-xs-4" cardStyle={{ border: '1px solid #000' }}>
            <Card.Body>
                <h1>fade</h1>
                <p>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum
                </p>
            </Card.Body>
            <Card.Hover animation="fade">
                <h1>Hover</h1>
            </Card.Hover>
        </Card>
        <Card className="col-xs-4" cardStyle={{ border: '1px solid #000' }}>
            <Card.Body>
                <h1>slide-in-top</h1>
                <p>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum
                </p>
            </Card.Body>
            <Card.Hover animation="slide-in-top">
                <h1>Hover</h1>
            </Card.Hover>
        </Card>
        <Card className="col-xs-4" cardStyle={{ border: '1px solid #000' }}>
            <Card.Body>
                <h1>slide-in-bottom</h1>
                <p>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum
                </p>
            </Card.Body>
            <Card.Hover animation="slide-in-bottom">
                <h1>Hover</h1>
            </Card.Hover>
        </Card>
        <Card className="col-xs-4" cardStyle={{ border: '1px solid #000' }}>
            <Card.Body>
                <h1>slide-in-right</h1>
                <p>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum
                </p>
            </Card.Body>
            <Card.Hover animation="slide-in-right">
                <h1>Hover</h1>
            </Card.Hover>
        </Card>
        <Card className="col-xs-4" cardStyle={{ border: '1px solid #000' }}>
            <Card.Body>
                <h1>slide-in-left</h1>
                <p>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum
                </p>
            </Card.Body>
            <Card.Hover animation="slide-in-left">
                <h1>Hover</h1>
            </Card.Hover>
        </Card>
        <Card className="col-xs-4" cardStyle={{ border: '1px solid #000' }}>
            <Card.Body>
                <h1>backgroundColor + middle</h1>
                <p>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum
                </p>
            </Card.Body>
            <Card.Hover
                backgroundColor="rgb(0, 0, 150)"
                hoverOpacity={0.8}
                middle
            >
                <h1 style={{ color: '#fff' }}>Hover</h1>
            </Card.Hover>
        </Card>
    </div>
);

export default example;
