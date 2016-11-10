import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FilteredList from '../src/FilteredList/FilteredList';

storiesOf('FilteredList', module)
  .addWithInfo(
    'Basic Example',
    () => {
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
            if (item.species === 'Cat') {
                return true;
            }
            return true;
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
                if (handler) {
                    events.push(
                        <a href="#" onClick={handler}>{ i }</a>,
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
        const ItemDisplay = ({ data }) => (
            <div style={style}>
            <h1>
                { data.name }
            </h1>
            <ul >
                <li>Species: { data.species }</li>
                <li>Colour: { data.colour }</li>
            </ul>
            </div>
        );


        return (<FilteredList
            itemDisplay={<ItemDisplay />}
            paginatorDisplay={<PaginatorDisplay />}
            data={animalData}
            pageSize={2}
            filterList={filterList}
        />);
    },
    { source: false, inline: true, static: true }
);
