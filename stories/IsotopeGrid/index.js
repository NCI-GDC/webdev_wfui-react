import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import AnimateHeight from 'react-animate-height';
import thunk from 'redux-thunk';
import { storiesOf } from '@kadira/storybook';
import IsotopeGrid from '../../src/IsotopeGrid/IsotopeGrid';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import StoryAnimateExample from 'raw!./StoryAnimateExample.src';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { visibilityFilterReducer } from '../../src/util/visibilityFilter';
import DashboardCard from '../../src/DashboardCard/DashboardCard';
import '../../src/DashboardCard/index.scss';

const store = createStore(
    combineReducers({
        visibilityFilter: visibilityFilterReducer,
    }),
    {},
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);


storiesOf('IsotopeGrid', module)
    .addWithInfo('Basic Example', () => StoryBasicExample, {
        scope: { Provider, store, IsotopeGrid, DashboardCard, Button, ButtonGroup },
    })
    .addWithInfo('With Animated Height', () => StoryAnimateExample, {
        scope: { Provider, store, IsotopeGrid, DashboardCard, Button, ButtonGroup, AnimateHeight }
    });