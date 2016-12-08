import React from 'react';
import FilteredTable from '../../src/FilteredTable/FilteredTable';

const icgcSampleDataAPI = '/sample_icgc.json';

const itemFormat = [
    {
        name: 'Person ID',
        display: data => data.personid,
    },
    {
        name: 'Email',
        display: data => data.email,
        sortingKey: data => data.email,
    },
    {
        name: 'Role',
        display: data => data.role,
    },
    {
        name: 'Project',
        display: data => data.cgp,
    },
    {
        name: 'Data Level Project',
        display: data => data.dlp,
    },
    {
        name: 'Added',
        display: data => ' ',
    },
    {
        name: 'Actions',
        display: data => ' ',
    },
];

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
        fetch(icgcSampleDataAPI)
            .then(response => response.json())
            .then((response) => {
                if (this.mounted) {
                    const data = response;
                    this.setState({ data });
                }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getFilters() {
        const { filteredCGP, filteredDLP } = this.state;
        return [
            item => (!filteredCGP ||
                    (item.cgp === filteredCGP)),
            item => (!filteredDLP ||
                    (item.dlp === filteredDLP)),
        ];
    }

    generateFilterUI() {
        const { filteredCGP, filteredDLP, searchTerm } = this.state;
        const CGPList = [];
        const DLPList = [];
        for (const item of this.state.data) {
            const CGP = item.cgp;
            const DLP = item.dlp;
            if (CGPList.indexOf(CGP) === -1) {
                CGPList.push(CGP);
            }
            if (DLPList.indexOf(DLP) === -1) {
                DLPList.push(DLP);
            }
        }
        const contributorOptions = CGPList.map(
            CGP => <option key={CGP} value={CGP}>{CGP}</option>,
        );
        const topicOptions = DLPList.map(
            DLP => <option key={DLP} value={DLP}>{DLP}</option>,
        );

        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter keywords"
                    value={searchTerm}
                    onChange={e => this.setState({ searchTerm: e.target.value })}
                />
                <select selected={filteredCGP} onChange={e => this.setState({ filteredCGP: e.target.value })}>
                    <option value="">All Projects</option>
                    {contributorOptions}
                </select>
                <select selected={filteredDLP} onChange={e => this.setState({ filteredDLP: e.target.value })}>
                    <option value="">All Data Level Projects</option>
                    {topicOptions}
                </select>
            </div>
        );
    }
    
    render() {
        return (
            <div>
                {this.generateFilterUI()}
                <FilteredTable
                    searchTerm={this.state.searchTerm}
                    filterList={this.getFilters()}
                    data={this.state.data}
                    itemFormat={itemFormat}
                    onResultsNumUpdate={count => console.log(count)}
                    selectable
                />
            </div>
        );
    }
}
export default <FilteredListContainer />;
