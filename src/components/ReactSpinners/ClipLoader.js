import React from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import createEmotion from 'create-emotion';

class Loader extends React.Component {
    constructor(props) {
        super();

        this.emotion = createEmotion(props.context);
        const { keyframes } = this.emotion;
        this.clip = keyframes`
            0% {transform: rotate(0deg) scale(1)} 
            50% {transform: rotate(180deg) scale(0.8)}
            100% {transform: rotate(360deg) scale(1)}
        `;
    }
    style() {
        const { size, sizeUnit, color, className } = this.props;
        const { css } = this.emotion;

        const style = css`
             {
                background: transparent !important;
                width: ${`${size}${sizeUnit}`};
                height: ${`${size}${sizeUnit}`};
                border-radius: 100%;
                border: 2px solid;
                border-color: ${color};
                border-bottom-color: transparent;
                display: inline-block;
                animation: ${this.clip} 0.75s 0s infinite linear;
                animation-fill-mode: both;
            }
        `;

        return className
            ? css`
                  ${style};
                  ${className}
              `
            : style;
    }

    render() {
        const { loading } = this.props;
        return loading ? <div className={this.style()} /> : null;
    }
}
Loader.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number,
    sizeUnit: PropTypes.string,
    className: PropTypes.string,
};

Loader.defaultProps = {
    loading: true,
    color: '#9B9B9B',
    size: 35,
    sizeUnit: 'px',
    className: '',
};

const Component = onlyUpdateForKeys([
    'loading',
    'color',
    'size',
    'sizeUnit',
    'className',
])(Loader);
Component.defaultProps = Loader.defaultProps;
export default Component;
