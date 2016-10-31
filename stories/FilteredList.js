import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FilteredList from '../src/FilteredList/FilteredList';
import Spinner from '../src/Spinner/Spinner';

storiesOf('Filtered List', module)
  .addWithInfo(
    'Basic Example',
    `
        Note:  React StoryBook messes up the source, look directly at the story file for an example.
    `,
    () => {
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

        const catFilter = (item) => {
            if (item.species === 'Cat') {
                return false;
            }
            return true;
        };

        const filterList = [catFilter];

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
    { source: true, inline: true }
);
