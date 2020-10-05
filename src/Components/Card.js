import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../sass/Card.scss'
import Button from './Button';
import {truncateString} from '../helpers/helpers';

const Card = props => {
  const {id,name, description, deleteCard, editCard} = props
  
  return (
    <Fragment>
      <h4 aria-label={'Task name'} data-testid={'card-title-'+id} className='card-title' >{name}</h4>
      <span aria-label={'Task Description'} data-testid={'card-description-'+id} className='card-description'>{truncateString(description, 100)}</span>
      <div className='card-actions'>
        <Button name='Edit' type='primary' size='small' className='edit-card' testId={'edit-card-'+id} action={editCard} isTitle={false} />
        <Button name='Delete' type='danger' size='small' className='delete-card' testId={'delete-card-'+id} action={deleteCard} isTitle={false} />
      </div>
      
    </Fragment>
  )
}


Card.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  deleteCard: PropTypes.func,
  editCard: PropTypes.func
}

export default Card;