import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TabbedList from '../src/TabbedList/TabbedList';
import Tab from '../src/TabbedList/Tab';

storiesOf('TabbedList', module)
  .addWithInfo(
    'Basic',
    () => (
        <TabbedList className="Basic">
            <Tab className="Tab-Class" title="Tab 1">
                Tab content
            </Tab>
            <Tab className="Tab-Class-2" title="Tab 2">
                Second tab content
            </Tab>
        </TabbedList>
    ),
    { inline: true })
    .addWithInfo(
    'Different default tab',
    () => (
        <TabbedList className="Basic">
            <Tab className="Tab-Class" title="Tab 1">
                Tab content
            </Tab>
            <Tab active className="Tab-Class-2" title="Tab 2">
                Second tab content
            </Tab>
        </TabbedList>
    ),
    { inline: true })
    .addWithInfo(
    'With classes',
    () => (
        <TabbedList className="outer-class">
            <Tab className="tab-1-class" title="Tab 1">
                The div surrounding this tag will have the class tab-1-class,
            </Tab>
            <Tab className="tab-2-class" title="Tab 2">
                And the outer div wil have the class outer-class!
            </Tab>
        </TabbedList>
    ),
    { inline: true }
)
    .addWithInfo(
    'Styled example',
    () => (
        <div>
            <style>{`
            .outer-class a{
                border: 1px solid #dfdfdf;
                padding: 10px 15px 10px 15px;
                margin: 0 10px 0 0 ;
                font-weight: bold;
                font-family: sans-serif;
                border-radius: 10px 10px 0 0;
                font-size: 115%;
                display: inline-block;
                background: #f4f4f4;
            }
            .outer-class .active{
                border-bottom-color: #FFFFFF;
                background: #ffffff;
                color: grey;
            }
            .outer-class div{
                border: 1px solid #dfdfdf;
                position: relative;
                padding: 10px 15px 10px 15px;
                top: -1px;
            }
            `}</style>
            <TabbedList className="outer-class">
                <Tab className="tab-1-class" title="Styling Info I">
                    You should use this page to reference which types of tags this uses when styling.
                </Tab>
                <Tab className="tab-2-class" title="Styling Info II">
                    You are able to find the static markup (to apply classes) below or by using chrome inspector.
                </Tab>
            </TabbedList>
        </div>
    ),
    { inline: true, source: true, static: true }
);
