import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FilteredList from '../src/FilteredList/FilteredList';

storiesOf('FilteredList', module)
  .addWithInfo(
    'Basic Example',
    `
        Note:  React StoryBook messes up the source, look directly at the story file for an example.
    `,
    () => {
        /* Each element of this array is displayed as a post */
        const animalData = [
            {
                name: 'Grover',
                species: 'Cat',
                colour: 'White',
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
            'border': '1px solid #000000',
            'padding': '10px 10px 10px 10px',
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

        const PaginatorDisplay = () => (
            <div>Paginator</div>
        );

        return (<FilteredList
            itemDisplay={<ItemDisplay />}
            paginatorDisplay={<PaginatorDisplay />}
            data={animalData}
            filterList={filterList}
        />);
    },
    { source: false, inline: true }
);
