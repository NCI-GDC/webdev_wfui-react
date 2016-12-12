import React from 'react';

class DashboardBox extends React.Component {
    render() {
        const { title, subtitle, buttons, href, iconURL, children } = this.props;
        return (
            { children }
        );
    }
}

DashboardBox.propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    iconURL: React.PropTypes.string,
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
        href: React.PropTypes.string,
        name: React.PropTypes.string,
        onClick: React.PropTypes.func,
    })),
    href: React.PropTypes.arrayOf(React.PropTypes.shape({
        href: React.PropTypes.string,
        name: React.PropTypes.string,
        onClick: React.PropTypes.func,
    })),
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
};


export default DashboardBox;
