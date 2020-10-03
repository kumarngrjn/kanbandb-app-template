import React, { Fragment } from 'react';
import '../sass/Card.scss'


function Card (props) {
    return (
        <Fragment>
            
            <h4 className='card-title'>{props.name}</h4>
            <span className='card-description'>{props.description}</span>

            <span className='delete-card' onClick={props.deleteCard}>X</span>

        </Fragment>
    )
}

export default Card;