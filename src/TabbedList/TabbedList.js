import React from 'react';

class TabbedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            injectedElements: this.injectOnClick(this.props.children),
        };
    }

    getActiveTagContents() {
        const { injectedElements } = this.state;

        for (const tab of injectedElements) {
            if (tab.props.active) {
                return tab.props.children;
            }
        }

        /* If there is no active tab, then display the first tab */
        if (injectedElements.length > 0) {
            this.handleTabClick(0);
        }

        /* Return an empty div when there is no tab. */
        return <div />;
    }

    handleTabClick(clickedTabIndex) {
        const { injectedElements } = this.state;

        /* Clone the children */
        const tempChildren = injectedElements.slice(0);

        /* Remove active tags from others and inject 'active' class into ith element */
        for (let i = 0; i < injectedElements.length; i += 1) {
            const tab = injectedElements[i];
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
        const { injectedElements } = this.state;

        return (
            <div className={this.props.className}>
                { injectedElements }
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
