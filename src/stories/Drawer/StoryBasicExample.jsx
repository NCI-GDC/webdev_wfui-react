/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import React from 'react';
import DrawerButton from '../../components/Drawer/DrawerButton';

const example = (
    <div>
        <DrawerButton
            variant="outline-primary"
            title="Type1"
            popoverTitle="PopOver"
        />
        <DrawerButton
            variant="outline-dark"
            title="Type2"
            placement="bottom"
            popoverTitle="Pop Pop"
        >
            <p>Hello Bye Hello Bye Hello Bye Hello Bye Hello Bye </p>
        </DrawerButton>
        <DrawerButton
            variant="outline-secondary"
            title="Type3"
            placement="right"
        >
            <h3 className="text-center">Title</h3>
            <p>Hello Bye Hello Bye Hello Bye Hello Bye Hello Bye </p>
        </DrawerButton>
        <DrawerButton variant="outline-info" isIcon icon="star" placement="top">
            <a href="#">Link</a>
            <button>Button</button>
        </DrawerButton>
    </div>
);

export default example;
