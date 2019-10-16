import React, { Component } from 'react';
import PropTypes from 'prop-types'

class DefaultFooterItem extends Component {
    render() {
        const { title, link } = this.props;
        return (
            <li className="col-xs-6">
                <a href={link}>{title}</a>
            </li>
        );
    }
}

DefaultFooterItem.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
};

export default DefaultFooterItem;
