import React from 'react';

class Tab extends React.Component {
   /* Renders the Tab (the tab part) */
    render() {
        const { className, onClick, active } = this.props;
        return (
            <a href="#openTab" className={`${className} ${active ? 'active' : ''}`} onClick={onClick} >
               {this.props.title}
            </a>
        );
    }
}

Tab.propTypes = {
    className: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    /* PropType are accessed by parent for rendering for user-friendliness */
    active: React.PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
};

Tab.defaultProps = {
    className: '',
    title: '',
    active: false,
};

export default Tab;
