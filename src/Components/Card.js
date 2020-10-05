import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../sass/Card.scss'

const Card = React.memo(props => {
  const {id,name, description, deleteCard} = props
  return (
    <Fragment>
      <h4 aria-label={'Task name'} data-testid={'card-title-'+id} className='card-title' >{name}</h4>
      <span aria-label={'Task Description'} data-testid={'card-description-'+id} className='card-description'>{description}</span>
      <span aria-label={'Delete Task Button'} data-testid={'delete-card-'+id} className='delete-card' onClick={deleteCard}>X</span>
    </Fragment>
  )
},(prevProps, nextProps) => prevProps.id === nextProps.id && prevProps.name === nextProps.name && prevProps.description === nextProps.description && prevProps.status === nextProps.status 
)

Card.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  deleteCard: PropTypes.func
}

export default Card;