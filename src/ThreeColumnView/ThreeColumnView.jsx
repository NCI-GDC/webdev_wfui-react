import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SplitPane from 'react-split-pane';

import Column from './Column';

const COLUMN_ROLE = Column.role;

class ThreeColumnView extends React.Component {
    render() {
        const {
            className,
            splitClassName,
            children,
            enableResize,
            defaultSize,
            minSize,
            colTwoVisible,
            colThreeVisible,
            id,
        } = this.props;
        let visibleColCount = 1;
        if (colTwoVisible) {
            visibleColCount = 2;
            if (colThreeVisible) {
                visibleColCount = 3;
            }
        }

        if (enableResize) {
            return (
                <div
                    id={id}
                    className={classNames(
                        'three-column-view three-column-resize-view',
                        className,
                        `${visibleColCount}-column-visible`,
                    )}
                >
                    {React.cloneElement(children[0], { key: 1 })}
                    {colTwoVisible && !colThreeVisible
                        ? React.cloneElement(children[1], { key: 2 })
                        : null}
                    {colThreeVisible && colTwoVisible ? (
                        <SplitPane
                            className={classNames('split-pane', splitClassName)}
                            split="vertical"
                            minSize={minSize || 50}
                            defaultSize={defaultSize || 150}
                        >
                            <div>{React.cloneElement(children[1], { key: 2 })}</div>
                            <div>{React.cloneElement(children[2], { key: 3 })}</div>
                        </SplitPane>
                    ) : null}
                </div>
            );
        }

        return (
            <div
                className={classNames(
                    'three-column-view three-column-noresize-view',
                    className,
                    `${visibleColCount}-column-visible`,
                )}
            >
                {React.cloneElement(children[0], { key: 1 })}
                {colTwoVisible ? React.cloneElement(children[1], { key: 2 }) : null}
                {colTwoVisible && colThreeVisible
                    ? React.cloneElement(children[2], { key: 3 })
                    : null}
            </div>
        );
    }
}

ThreeColumnView.Col = Column;

ThreeColumnView.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    splitClassName: PropTypes.string,
    colTwoVisible: PropTypes.bool,
    colThreeVisible: PropTypes.bool,
    enableResize: PropTypes.bool,
    defaultSize: PropTypes.number,
    minSize: PropTypes.number,
    children: PropTypes.arrayOf((propValue) => {
        if (propValue.length !== 3 || propValue.every(child => child.props.role === COLUMN_ROLE)) {
            return new Error('ThreeColumnView requires exactly three Column components as child');
        }
        return true;
    }).isRequired,
};

ThreeColumnView.defaultProps = {
    id: '',
    className: '',
    visibleColCount: 1,
    enableResize: false,
    colTwoVisible: false,
    colThreeVisible: false,
    defaultSize: 150,
    minSize: 50,
};

export default ThreeColumnView;
