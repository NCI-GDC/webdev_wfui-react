import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const example = (
    <div>
        <h1>Breadcrumb Example</h1>
        <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
    </div>
);
export default example;
