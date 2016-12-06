import React from 'react';
import FilteredList from '../../src/FilteredList/FilteredList';

/* Each element of this array is displayed as a post */
const animalData = [
    { name: 'Grover' },
    { name: 'Grover' },
    { name: 'Grover' },
    { name: 'Grover' },
    { name: 'Grover' },
    { name: 'Grover' },
    { name: 'Grover' },
    { name: 'Grover' },
];

/* Each element from the array is injected into this for display */
const ItemDisplay = (props) =>
    <li> { props.name } </li>;

export default <FilteredList
    itemDisplay={<ItemDisplay />}
    data={animalData}
    container={<ol className="lol" />}
/>;
