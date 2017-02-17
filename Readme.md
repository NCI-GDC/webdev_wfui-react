# Tutorial

## How to add your component into WFUI
1. Create a directory in ```src/``` and place your component. Your index file or component file has to **export** your module.
2. Add your component in ```src/index.js```
3. run ```npm run build``` to transpile src directory with babel

## How to add your component into Storybook
1. Create a directory in ```stories/``` and create ```index.js``` file.
2. You can copy other stories ( Test ) is simple one and easy to understand.
3. Create Story.src file which contains your example code how to use your component.
4. Load the .src file with using raw-loader like ```import Story from 'raw!./Story.src';```
5. Set story with the codes, names and title .etc. You have to pass your component in **scope**
```
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import Test from '../../src/Test';

storiesOf('Component Name', module)
  .addWithInfo(
    'Story Name',
    () => Story,
    { scope: { Test } }
);
```
6. Finally, you need to load your story into storybook by modifing ```.storybook/config.js```