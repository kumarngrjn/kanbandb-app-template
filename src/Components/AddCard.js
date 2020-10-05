/**
 * @file AddCard - Displays Add and Edit Card box to add a new task or update an existing task
 */

import React, {useState } from 'react';
import PropTypes from 'prop-types';
import {cardStatusOptions, customStyles} from '../helpers/variables';
import Modal from 'react-modal';
import classnames from 'classnames'
import '../sass/Modal.scss';
import '../sass/AddCard.scss';
import Button from './Button';

// set the modal only for prod environment
if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root')
}

const AddCard = props =>{

  const {setShowModal, addTask, updateTask, card } = props;
  const [status, setStatus] = useState(card === null ? cardStatusOptions[0].value: card.status);
  const [name, setName] = useState(card === null ? '': card.name);
  const [isNameValid, setIsNameValid] = useState(true);
  const [description, setDescripton] = useState(card === null ?'': card.description);


  const updateName = event => {
    setName(event.target.value);
  }


  /**
   * addTask - validates whether name field is not empty and calls the parent task method.
   */
  const callParentTask = () => {
    //check for name lemgth
    if(name.trim().length > 0){
        setIsNameValid(true)
        if(card === null){
          addTask({name, status, description}, () => {
              resetModal();
          });
        }
        else {
          const updatedCard = {
            id: card.id,
            name,
            status,
            description
          }
          updateTask({...updatedCard}, () => {
            resetModal();
          });
        }
    }
    else {
        setIsNameValid(false)
    }
  }

  /**
   * checkIsNameValid : validates if name is not empty 
   */
  const checkIsNameValid = () => {
    !isNameValid && name.trim().length > 0 && setIsNameValid(true);
  }

  /**
   * resetModal - resets the status, name and description to initial values
   */
  const resetModal = () => {
    setStatus(cardStatusOptions[0].value)
    setName('');
    setDescripton('');
  }

  /**
   * closeModal - called when user clicks cancel , closes the add task modal and resets the values
   */
  const closeModal = () => {
    resetModal();
    setShowModal(false);
  }

  const cardNameClasses = classnames('card-name-input',{'input-error': !isNameValid})
  return (
    <Modal data-testid={'add-task-modal'} isOpen={true} style={customStyles} contentLabel={'Add Task'}>
      <div className='modal-header'>
        <h2 data-testid='modal-title'>{card === null ? 'Add Task' : 'Edit Task'}</h2>
      </div>
      <div className='modal-content'>
        <div className='add-card-wrapper'>
          <label className='add-card-label'>Status:</label>
          <select aria-label="Choose task status" data-testid='card-status-select' className='card-status-select' value={status} onChange={e => setStatus(e.target.value)}>
              {cardStatusOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div className='add-card-wrapper'>
          <label className='add-card-label'><em className='required'>*</em>Name:</label>
          <input aria-label="Task Name" data-testid={'card-name-input'}  type='text' className={cardNameClasses} placeholder={'Type task name , Eg: Bug: Add new functionality'} value={name} onChange={updateName} onBlur={checkIsNameValid} />
        </div>
        <div className='add-card-wrapper'>
          <label className='add-card-label'>Descripton:</label>
          <textarea aria-label="Task Description" data-testid='card-description-textarea'  className='card-description-textarea'rows='5' cols='50' value={description} onChange={e => setDescripton(e.target.value)}></textarea>
        </div>
      </div>
      <div className='modal-actions'>
        <Button name={card === null ? 'Add new' : 'Update'} type='primary' className='add-card' testId={'add-card'} action={callParentTask} isTitle={true} />
        <Button name={'Cancel'} className='cancel-add-card' testId={'cancel-add-card'} action={closeModal} isTitle={true} />
      </div>
    </Modal>
  )
};

AddCard.propTypes = {
  card: PropTypes.object,
  addTask: PropTypes.func,
  updateTask: PropTypes.func,
  setShowModal: PropTypes.func
}

export default AddCard;