/**
 * definitio  of default / enum type variables
 */

/**
 * defaultCards - set of cards to load on initial page load.
 */
export const defaultCards = [
  {
      name: 'Update node modules',
      description: 'Need to update node modules to latest version',
      status: 'DONE'
  },
  {
      name: 'Start kanban db project',
    description: 'Start working on connecting kanban db template project',
      status: 'DOING'
  },
  {

    name: 'Write unit tests',
    description: 'Write unit tests for kanban db template functionality',
    status: 'TODO'
  },
  {
    name: 'Update node modules 2',
    description: 'Need to update node modules to latest version',
    status: 'DONE'
  },
  {
    name: 'Start kanban db project 2',
    description: 'Start working on connecting kanban db template project',
    status: 'DOING'
  },
  {

    name: 'Write unit tests 2',
    description: 'Write unit tests for kanban db template functionality',
    status: 'TODO'
  },
  {
    name: 'Update node modules 3',
    description: 'Need to update node modules to latest version',
    status: 'DONE'
  },
  {
    name: 'Start kanban db project 3',
    description: 'Start working on connecting kanban db template project',
    status: 'DOING'
  },
  {

    name: 'Write unit tests 3',
    description: 'Write unit tests for kanban db template functionality',
    status: 'TODO'
  },
  {
    name: 'Update node modules 4',
    description: 'Need to update node modules to latest version',
    status: 'DONE'
  },
  {
    name: 'Update node modules 5',
    description: 'Need to update node modules to latest version',
    status: 'DONE'
  }
]

/**
 * cardStatusOptions: used to display different status for the status dropdown in add task
 */
export const cardStatusOptions = [
  {value: 'TODO', label: 'Todo'},
  {value: 'DOING', label: 'In Progress',},
  {value: 'DONE', label: 'Done'}
]

/**
 * cardStatusObject - this contains the different status boards that are displayed 
 */

export const cardStatusObject = {
  TODO: {droppableId: 'droppable1', class: 'todo', title: 'ToDo'},
  DOING: {droppableId: 'droppable2', class: 'inprogress', title: 'In Progress'}, 
  DONE: {droppableId: 'droppable3', class: 'done', title: 'Done'}
}

/**
 * reverseCardStatusMapObject - reverse map of different boards to its own droppable object
 */
export const reverseCardStatusMapObject = {
  droppable1: 'TODO',
  droppable2: 'DOING',
  droppable3: 'DONE',
}


/**
 * customStyles - default styles for modal dialog displayed
 */

export const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '500px',
    border                : '1px solid #ccc'
  }
};

const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid*2}px 0`,

    // change background colour if dragging
    background: isDragging ? '#2185d0' : '',
    color: isDragging ? '#fff' : '',

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#f3f3f3' : '',
    padding: '10px 20px',
});


