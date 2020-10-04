import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../sass/Card.scss'


function Card (props) {
    const {name, description, deleteCard} = props
    return (
        <Fragment>
            <h4 className='card-title'>{name}</h4>
            <span className='card-description'>{description}</span>
            <span className='delete-card' onClick={deleteCard}>X</span>
        </Fragment>
    )
}


Card.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    deleteCard: PropTypes.func
}

export default Card;