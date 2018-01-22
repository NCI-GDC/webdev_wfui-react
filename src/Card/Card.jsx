import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CardBody from './CardBody';
import CardHover from './CardHover';

const BODY_ROLE = CardBody.defaultProps.role;
const HOVER_ROLE = CardHover.defaultProps.role;

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hover: false };
    }

    renderChild(child, key) {
        const { hover } = this.state;
        return cloneElement(child, {
            hover,
            key,
        });
    }

    render() {
        const { className, children, cardStyle } = this.props;

        return (
            <div
                className={classNames(className, 'wfui-card wfui-card-container')}
                onMouseOver={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
                style={cardStyle || {}}
            >
                {children &&
                    ((Array.isArray(children) &&
                        children.map((child, key) => {
                            switch (child.props.role) {
                                case BODY_ROLE:
                                case HOVER_ROLE:
                                    return this.renderChild(child, key);
                                default:
                                    return child;
                            }
                        })) ||
                        this.renderChild(children, 0))}
            </div>
        );
    }
}

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    cardStyle: PropTypes.object,
};

Card.Body = CardBody;
Card.Hover = CardHover;

export default Card;
