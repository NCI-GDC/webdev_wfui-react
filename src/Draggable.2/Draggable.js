import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';
import DraggableHandle from './DraggableHandle';
import update from 'react/lib/update';
import classNames from 'classnames';

const style = {
    list: {
        border: '1px dotted #aaa',
        marginBottom: 10,
        padding: 10,
    },
    container: {
        listStyleType: 'none',
        paddingLeft: 0,
    },
};

@DragDropContext(HTML5Backend)
class Draggable extends React.Component {
    constructor() {
        super();
        this.state = { columnWidth: 300, indexes: [] }
        this.onHandleMoveItem = this.onHandleMoveItem.bind(this);
        this.onHandleEndDrag = this.onHandleEndDrag.bind(this);
    }
    componentWillMount() {
        // this.setItems(this.props);
        this.setState({ indexes: this.props.items.map((item,i) => (i))})
    }
    onHandleEndDrag() {
        const { onHandleEndDrag } = this.props;
        const { indexes } = this.state;
        this.props.onHandleEndDrag({ indexes });
    }
    onHandleMoveItem(dragIndex, hoverIndex) {
        const { indexes } = this.state;
        const dragItem = indexes[dragIndex];

        this.setState(update(this.state, {
            indexes: {
                $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragItem]
                ]
            }
        }));
    }
    render() {
        const { className, type, columnCount, items } = this.props;
        const { indexes } = this.state;

        return (
            <div className={classNames(className, 'wfui-draggable')} >
                <ul
                    style={
                        type==='grid' ?
                        {...style.container, columnCount } : {...style.container}
                    }
                >
                    {indexes.map((idx, i) => {
                        return (
                            <DraggableItem
                                moveItem={this.onHandleMoveItem}
                                endDrag={this.onHandleEndDrag}
                                key={i}
                                index={i}
                            >
                                {items[idx]}
                            </DraggableItem>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

Draggable.propTypes = {
    children: React.PropTypes.node,
    type: React.PropTypes.oneOf(['stack', 'grid']).isRequired,
    columnCount: React.PropTypes.number,
    onHandleEndDrag: React.PropTypes.func,
};

Draggable.defaultProps = {
    type: 'stack',
    onHandleEndDrag: () => undefined,
    columnCount: 3,
}

Draggable.Item = DraggableItem;
Draggable.Handle = DraggableHandle;

export default Draggable;
