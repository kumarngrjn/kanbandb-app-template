import React, { useState } from 'react';
import {cardStatusOptions} from '../variables';

function AddCard (props){
    const [status, setStatus] = useState(cardStatusOptions[0].value);
    const [name, setName] = useState('');
    //const [descripton, setDescripton] = useState('');

    const addTask = () => {
        //check for name lemgth
        if(name.trim().length > 0){
            props.addTask(name, status, () => {
                setStatus(cardStatusOptions[0].value)
                setName('');
            });
        }
    }

    return (
        <div className='add-card-wrapper'>
            <select className='card-status-select' value={status} onChange={(e) => setStatus(e.target.value)}>
                {cardStatusOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <input type='text' className='card-name-input' placeholder={'Type task name , Eg: Bug: Add new functionality'} value={name} onChange={(e) => setName(e.target.value)} />
            <button type='button' className='primary' onClick={addTask}>Add new</button>
        </div>
    )
}

export default AddCard;