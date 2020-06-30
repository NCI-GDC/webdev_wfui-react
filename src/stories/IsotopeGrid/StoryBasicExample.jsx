import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import AnimateHeight from 'react-animate-height';
import thunk from 'redux-thunk';
import IsotopeGrid from '../../components/IsotopeGrid/IsotopeGrid';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { visibilityFilterReducer } from '../../components/util/visibilityFilter';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
// import '../../components/DashboardCard/index.scss';

const store = createStore(
    combineReducers({
        visibilityFilter: visibilityFilterReducer,
    }),
    {},
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = { extend: false };
    }
    componentDidUpdate(prevProps, prevState) {
        const { extend } = this.state;
        if (extend !== prevState.extend) {
            this.props.isotope.arrange();
        }
    }
    render() {
        const { item, isotope } = this.props;
        if (this.state.extend) {
            return (
                <DashboardCard>
                    <DashboardCard.Body>
                        <div>
                            <div>
                                <h1 className="title">{item}</h1>
                                <p>Testing</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <button onClick={() => this.setState({ extend: false })}>click</button>
                        </div>
                    </DashboardCard.Body>
                </DashboardCard>
            );
        }
        return (
            <DashboardCard>
                <DashboardCard.Body>
                    <div>
                        <div>
                            <h1 className="title">{item}</h1>
                            <p>Testing</p>
                        </div>
                        <button onClick={() => this.setState({ extend: true })}>click</button>
                    </div>
                </DashboardCard.Body>
            </DashboardCard>
        );
    }
}
class IsotopeGridContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={ data: [], sortBy: '', seconds: 0, searchTerm: '' };
    }

    componentDidMount() {
        this.interval = setInterval(() => {this.tick();}, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        if (this.state.seconds === 6) {
            this.setState(prevState => ({
                seconds: prevState.seconds + 1,
                sortBy: 'title'
            }));
        } else if (this.state.seconds === 4) {
            this.setState(prevState => ({
                seconds: prevState.seconds + 1,
                data: ['labs', 'labs-ls', 'labs-pb', 'proj', 'proj-bg', 'jira', 'labs-pa', 'labs-webdev', 'proj-ms', 'proj-vhs', 'wiki', 'email'],
            }));
        } else if (this.state.seconds === 2) {
            this.setState(prevState => ({
                seconds: prevState.seconds + 1,
                data: ['labs', 'labs-ls', 'proj', 'proj-bg', 'jira'],
            }));
        }else if (this.state.seconds < 6) {
            this.setState(prevState => ({
                seconds: prevState.seconds + 1,
            }));
        }
    }

    render() {
        const { searchTerm, data, sortBy } = this.state;
        return (
            <div>
                <IsotopeGrid id="tester" searchTerm={searchTerm} sortBy={sortBy} getSortData={{title: '.title'}}>
                    {data && data.map((item, index) => (
                        <IsotopeGrid.Item key={index} item={item} itemDisplay={<Item />} />
                    ))}
                </IsotopeGrid>
            </div>
        );
    }
}

const example = (
    <Provider store={store}>
        <IsotopeGridContainer />
    </Provider>
);
export default example;
