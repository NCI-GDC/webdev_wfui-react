import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FilteredList from '../src/FilteredTable/FilteredTable';

storiesOf('FilteredTable', module)
  .addWithInfo(
    'ICGC Testing',
    () => {
        const collaboratoryPubmedAPI = '/sample_icgc.json';

        const ItemDisplay = ({ data }) => {
            const { personid, email, role, cgp, dlp, added } = data;
            return (
                <hr>
                    <td>
                        { personid }
                    </td>
                    <td>
                        { email }
                    </td>
                    <td>
                        { role }
                    </td>
                    <td>
                        { cgp }
                    </td>
                    <td>
                        { dlp }
                    </td>
                    <td>
                        { added }
                    </td>
                </hr>
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
                    const CGP = item.project;
                    const DLP = item.project;
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
                            value={searchTerm} onChange={e => this.setState({ searchTerm: e.target.value })} 
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
                        <FilteredList
                            searchTerm={this.state.searchTerm}
                            filterList={this.getFilters()}
                            data={this.state.data}
                            itemDisplay={<ItemDisplay />}
                        />
                    </div>
                );
            }
        }

        return (
            <FilteredListContainer />
        );
    },
{ });

