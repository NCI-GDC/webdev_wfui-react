import React from 'react';
import FilteredList from '../../src/FilteredList/FilteredList';

const collaboratoryPubmedAPI = '/list_pub_pre.json';

const ItemDisplay = (props) => {
    const { type, title, body, date, pmid, link, topic, author, contributor } = props;
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

export default <FilteredListContainer />