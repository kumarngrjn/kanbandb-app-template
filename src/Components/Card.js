import React, { Fragment } from 'react';

function Card (props) {
    return (
        <Fragment>
            <h4 className='card-title'>{props.name}</h4>
            <span className='card-description'>{props.description}</span>
        </Fragment>
    )
}

export default Card;