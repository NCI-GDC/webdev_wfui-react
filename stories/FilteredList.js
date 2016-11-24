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
    { source: false, inline: true, static: true },
)
.addWithInfo(
    'Custom Container',
    () => {
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
        const ItemDisplay = ({ data }) =>
            <li> { data.name } </li>;

        return (<FilteredList
            itemDisplay={<ItemDisplay />}
            data={animalData}
            container={<ol className="lol" />}
        />);
    },
    { source: false, inline: true, static: true },
)
.addWithInfo(
    'Real Use Case',
    () => {
        const collaboratoryPubmedAPI = '/list_pub_pre.json';

        const ItemDisplay = ({ data }) => {
            const { type, title, body, date, pmid, link, topic, author, contributor } = data;
            const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
            const url = link || (pmid ? `https://www.ncbi.nlm.nih.gov/pubmed/${pmid}` : null);

            let authorStr = '';
            for (let i = 0; i < author.length; i += 1) {
                authorStr += author[i].text;
                if (i !== author.length - 1) {
                    authorStr += ', ';
                }
            }

            return (
                <div>
                    <p>{ capitalizedType }</p>
                    <p>{ authorStr } | { type === 'presentation' ? `Date : ${date}` : ''} </p>
                    {url ? <p><a href={url}>{title}</a></p> : null }
                    <p dangerouslySetInnerHTML={{ __html: body }} />
                </div>
            );
        };

        /* A container is needed to fetch from API */
        class FilteredListContainer extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    data: [],
                    searchTerm: '',
                    filteredContributor: '',
                    filteredTopic: '',
                    filteredType: '',
                };
            }
            componentDidMount() {
                this.mounted = true;
                fetch(collaboratoryPubmedAPI)
                    .then(response => response.json())
                    .then((response) => {
                        if (this.mounted) {
                            const data = response.pub_pre;
                            this.setState({ data });
                        }
                });
            }
            componentWillUnmount() {
                this.mounted = false;
            }
            getFilters() {
                const { filteredContributor, filteredTopic, filteredType } = this.state;
                return [
                    item => (!filteredContributor ||
                            (item.contributor.length > 0 && item.contributor[0].name === filteredContributor)),
                    item => (!filteredTopic ||
                            (item.topic.length > 0 && item.topic[0].gname === filteredTopic)),
                    item => (!filteredType || item.type === filteredType),
                ];
            }
            generateFilterUI() {
                const { filteredContributor, filteredTopic, filteredType, searchTerm } = this.state;
                const contributors = [];
                const topics = [];
                const types = [];
                for (const item of this.state.data) {
                    const contributor = item.contributor.length > 0 ? item.contributor[0].name : undefined;
                    const topic = item.topic.length > 0 ? item.topic[0].gname : undefined;
                    const type = item.type;
                    if (contributor && contributors.indexOf(contributor) === -1) {
                        contributors.push(contributor);
                    }
                    if (topic && topics.indexOf(topic) === -1) {
                        topics.push(topic);
                    }
                    if (type && types.indexOf(type) === -1) {
                        types.push(type);
                    }
                }
                const contributorOptions = contributors.map(
                    contributor => <option key={contributor} value={contributor}>{contributor}</option>,
                );
                const topicOptions = topics.map(
                    topic => <option key={topic} value={topic}>{topic}</option>,
                );
                const typeOptions = types.map(
                    type => <option key={type} value={type}>{type}</option>,
                );

                return (
                    <div>
                        <input type="text" value={searchTerm} onChange={e => this.setState({ searchTerm: e.target.value })} />
                        <select selected={filteredContributor} onChange={e => this.setState({ filteredContributor: e.target.value })}>
                            <option value="">All Contributors</option>
                            {contributorOptions}
                        </select>
                        <select selected={filteredTopic} onChange={e => this.setState({ filteredTopic: e.target.value })}>
                            <option value="">All Topics</option>
                            {topicOptions}
                        </select>
                        <select selected={filteredType} onChange={e => this.setState({ filteredType: e.target.value })}>
                            <option value="">All Types</option>
                            {typeOptions}
                        </select>
                    </div>
                );
            }
            render() {
                return (
                    <span>
                        {this.generateFilterUI()}
                        <FilteredList
                            searchTerm={this.state.searchTerm}
                            filterList={this.getFilters()}
                            data={this.state.data}
                            itemDisplay={<ItemDisplay />}
                        />
                    </span>
                );
            }
        }

        return (
            <FilteredListContainer />
        );
    },
    { },
);
