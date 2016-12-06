import React from 'react';
import FilteredList from '../../src/FilteredList/FilteredList';

/* Each element of this array is displayed as a post */
const animalData = [
    {
        name: 'Grover',
        species: 'Cat',
        colour: 'White',
    },
    {
        name: 'Kermit',
        species: 'Bird',
        colour: 'Green',
    },
    {
        name: 'Molly',
        species: 'Dog',
        colour: 'Black',
    },
    {
        name: 'Hammy',
        species: 'Hamster',
        colour: 'Brown',
    },
    {
        name: 'Bojack',
        species: 'Dog',
        colour: 'Brown',
    },
    {
        name: 'Banana',
        species: 'Bird',
        colour: 'Yellow',
    },
    {
        name: 'Bird',
        species: 'Cat',
        colour: 'White',
    },
];

/* This filters out all items of species 'cat' */
const catFilter = (item) => {
    if (item.species !== 'Cat') {
        return true;
    }
    return false;
};
const filterList = [catFilter];

const style = {
    border: '1px solid #000000',
    padding: '10px 10px 10px 10px',
};

/* Paginator is injected with an additional prop 
    * which contains a method getOpenPage for generating
    * event handlers that change the page. */
const PaginatorDisplay = ({ currentPage, numPages, getOpenPage }) => {
    const events = [];
    for (let i = currentPage - 3; i < currentPage + 3; i += 1) {
        const handler = getOpenPage(i);
        if (i === currentPage) {
            events.push(
                <a key={i}> {i} </a>,
            );
        } else if (handler) {
            events.push(
                <button href="#" onClick={handler}>{ i }</button>,
            );
        }
    }
    return (
        <div>
            { events }
        </div>
    );
};

/* Each element from the array is injected into this for display */
const ItemDisplay = (props) => (
    <div style={style}>
        <h1>
            { props.name }
        </h1>
        <ul >
            <li>Species: { props.species }</li>
            <li>Colour: { props.colour }</li>
        </ul>
    </div>
);

class FilteredListContainer extends React.Component {
    constructor() {
        super();
        this.state = { numOfItems : 0, starting: 0, last: 0 }
    }
    render() {
        const { numOfItems, starting, last } = this.state;
        return (
            <div>
                <FilteredList
                    itemDisplay={<ItemDisplay />}
                    paginatorDisplay={<PaginatorDisplay />}
                    data={animalData}
                    pageSize={2}
                    filterList={filterList}
                    onNumOfListChange={(n)=>{ this.setState({numOfItems: n}) }}
                    onDisplay={({starting,last})=>{ this.setState({starting, last}) }}
                />
                <div>Showing: {numOfItems} ({starting}-{last})</div>
            </div>
        );
    }
}

export default <FilteredListContainer />