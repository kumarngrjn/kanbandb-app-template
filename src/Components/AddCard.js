import React, {useState } from 'react';
import PropTypes from 'prop-types';
import {cardStatusOptions, customStyles} from '../variables';
import Modal from 'react-modal';
import classnames from 'classnames'
import '../sass/Modal.scss';
import '../sass/AddCard.scss';

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root')
}

const AddCard = props =>{

  const {setShowModal, addTask } = props;
  const [status, setStatus] = useState(cardStatusOptions[0].value);
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [description, setDescripton] = useState('');


  const updateName = event => {
    setName(event.target.value);
  }


  /**
   * addTask - validates whether name field is not empty and calls the parent task method.
   */
  const callParentAddTask = () => {
    //check for name lemgth
    if(name.trim().length > 0){
        setIsNameValid(true)
        addTask({name, status, description}, () => {
            resetModal();
        });
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
        <h2 data-testid='modal-title'>Add Task</h2>
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
        <button data-testid='add-card' id='add-card' type='button' className='primary' onClick={callParentAddTask}>Add new</button>
        <button data-testid='cancel-add-card' id='cancel-add-card' type='button' onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  )
};

AddCard.propTypes = {
  addTask: PropTypes.func,
  setShowModal: PropTypes.func
}

export default AddCard;