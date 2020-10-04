import React, {useState } from 'react';
import {cardStatusOptions, customStyles} from '../variables';
import Modal from 'react-modal';
import classnames from 'classnames'
import '../sass/Modal.scss';
import '../sass/AddCard.scss';
//Modal.setAppElement('#root')

function AddCard (props){
    const [status, setStatus] = useState(cardStatusOptions[0].value);
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [description, setDescripton] = useState('');

    const addTask = () => {
        //check for name lemgth
        if(name.trim().length > 0){
            setIsNameValid(true)
            console.log(description);
            props.addTask({name, status, description}, () => {
                resetModal();
            });
        }
        else {
            setIsNameValid(false)
        }
    }

    const checkIsNameValid = () => {
        !isNameValid && name.trim().length > 0 && setIsNameValid(true);
    }

    const resetModal = () => {
        setStatus(cardStatusOptions[0].value)
        setName('');
        setDescripton('');
    }

    const closeModal = () => {
        resetModal();
        props.setShowModal(false);
    }

    const cardNameClasses = classnames('card-name-input',{'input-error': !isNameValid})
    return (
        <Modal isOpen={props.showModal} style={customStyles} contentLabel={'Add Task'}>
            <div className='modal-header'>
                <h2>Add Task</h2>
            </div>
            <div className='modal-content'>
                <div className='add-card-wrapper'>
                    <label className='add-card-label'>Status:</label>
                    <select className='card-status-select' value={status} onChange={e => setStatus(e.target.value)}>
                        {cardStatusOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </div>
                <div className='add-card-wrapper'>
                    <label className='add-card-label'><em className='required'>*</em>Name:</label>
                    <input type='text' className={cardNameClasses} placeholder={'Type task name , Eg: Bug: Add new functionality'} value={name} onChange={(e) => setName(e.target.value)} onBlur={checkIsNameValid} />
                </div>
                <div className='add-card-wrapper'>
                    <label className='add-card-label'>Descripton:</label>
                    <textarea rows='5' cols='50' value={description} onChange={e => setDescripton(e.target.value)}></textarea>
                </div>
            </div>
            <div className='modal-actions'>
                <button type='button' className='primary' onClick={addTask}>Add new</button>
                <button type='button' onClick={closeModal}>Cancel</button>
            </div>
        </Modal>
    )
}

export default AddCard;