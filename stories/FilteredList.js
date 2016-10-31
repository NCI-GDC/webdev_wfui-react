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
                species: 'Cat',
                colour: 'Brown',
            },
            {
                species: 'Dog',
                colour: 'Brown',
            },
            {
                species: 'Zebra',
                colour: 'Green',
            },
            {
                species: 'Cat',
                colour: 'Green',
            },
        ];

        /* This filters out all items of species 'cat' */
        const catFilter = (item) => {
            if (item.species === 'Cat') {
                return false;
            }
            return true;
        };

        const filterList = [catFilter];

        /* Each element from the array is injected into this for display */
        const ItemDisplay = ({ data }) => (
            <div>
                <ul>
                    <li>Item:</li>
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
