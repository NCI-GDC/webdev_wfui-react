import React from 'react';

class TabbedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            injectedElements: this.injectOnClick(this.props.children),
        };
    }

    getActiveTagContents() {
        for (const tab of this.state.injectedElements) {
            if (tab.props.active) {
                return tab.props.children;
            }
        }

        /* Default.  This should never be returned. */
        return <div />;
    }

    handleTabClick(clickedTabIndex) {
        /* Clone the children */
        const tempChildren = this.state.injectedElements.slice(0);

        /* Remove active tags from others and inject 'active' class into ith element */
        for (let i = 0; i < this.state.injectedElements.length; i += 1) {
            const tab = this.state.injectedElements[i];
            if (i === clickedTabIndex) {
                tempChildren[i] = React.cloneElement(tab, { active: true });
            } else {
                tempChildren[i] = React.cloneElement(tab, { active: false });
            }
        }

        /* Update state with new elements */
        this.setState({ injectedElements: tempChildren });
    }

    injectOnClick() {
        const injectedElements = [];
        for (let i = 0; i < this.props.children.length; i += 1) {
            const tab = this.props.children[i];
            const injectedElem = React.cloneElement(tab, {
                 id: i,
                 onClick: () => this.handleTabClick(i),
            });
            injectedElements.push(injectedElem);
        }
        return injectedElements;
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.state.injectedElements}
                <div>
                    {this.getActiveTagContents()}
                </div>
            </div>
        );
    }
}

TabbedList.propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.arrayOf(React.PropTypes.element),
};

TabbedList.defaultProps = {
    className: '',
    children: {},
};


export default TabbedList;
