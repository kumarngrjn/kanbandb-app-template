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
    description: 'Write unit tests for kanban db template functionality.This is long string that will be truncated somewhere around here',
    status: 'TODO'
  },
  
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




