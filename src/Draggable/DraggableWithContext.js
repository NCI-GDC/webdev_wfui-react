import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Draggable from './Draggable';

export default DragDropContext(HTML5Backend)(Draggable);
