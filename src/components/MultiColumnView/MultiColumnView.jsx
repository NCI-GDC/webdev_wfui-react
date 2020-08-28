import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SplitPane from 'react-split-pane';

import Column from './Column';

const COLUMN_ROLE = Column.role;

class MultiColumnView extends React.Component {
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

        const displayChild = [children[0]];

        let visibleColCount = 1;
        if (colTwoVisible) {
            visibleColCount++;
            displayChild.push(children[1])
        }
        if (colThreeVisible) {
            visibleColCount++;
            displayChild.push(children[2])
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
                    {React.cloneElement(displayChild[0], { key: 1 })}
                    {visibleColCount >= 2
                        ? React.cloneElement(displayChild[1], { key: 2 })
                        : null}
                    {visibleColCount >= 3 ? (
                        <SplitPane
                            className={classNames('split-pane', splitClassName)}
                            split="vertical"
                            minSize={minSize || 50}
                            defaultSize={defaultSize || 150}
                            primary="second"
                        >
                            <div>{React.cloneElement(displayChild[1], { key: 2 })}</div>
                            <div>{React.cloneElement(displayChild[2], { key: 3 })}</div>
                        </SplitPane>
                    ) : null}
                </div>
            );
        }

        return (
            <div
                id={id}
                className={classNames(
                    'three-column-view three-column-noresize-view',
                    className,
                    `${visibleColCount}-column-visible`,
                )}
            >
                {React.cloneElement(displayChild[0], { key: 1 })}
                {visibleColCount >= 2 ? React.cloneElement(displayChild[1], { key: 2 }) : null}
                {visibleColCount >= 3 ? React.cloneElement(displayChild[2], { key: 3 }) : null}
            </div>
        );
    }
}

MultiColumnView.Col = Column;

MultiColumnView.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    splitClassName: PropTypes.string,
    colTwoVisible: PropTypes.bool,
    colThreeVisible: PropTypes.bool,
    enableResize: PropTypes.bool,
    defaultSize: PropTypes.number,
    minSize: PropTypes.number,
    children: PropTypes.array,
};

MultiColumnView.defaultProps = {
    id: '',
    className: '',
    visibleColCount: 1,
    enableResize: false,
    colTwoVisible: false,
    colThreeVisible: false,
    defaultSize: 150,
    minSize: 50,
};

export default MultiColumnView;
