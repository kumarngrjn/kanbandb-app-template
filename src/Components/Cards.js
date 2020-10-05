/**
 * @file Cards - Displays the different Kanban boards.
 */

import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Card from './Card';
import '../sass/Cards.scss'
import { getItemStyle, getListStyle } from '../helpers/helpers';

const Cards = props => {
  const {cards, className, title, droppableId, deleteCard, editCard} = props;
  return (
              
    <div className={'cards-list-wrapper ' + className}  >
      <h3 className='section-title'>{title}</h3>
      <Droppable data-testid={droppableId} droppableId={droppableId}>
        {(provided, snapshot) => (
          <ul className='card-list' data-testid={'card-list-ul-'+droppableId} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {cards.map((card,index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (

                        <li 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                            data-testid={droppableId + '-card-'+index}
                            className='card'
                        >
                            <Card {...card} deleteCard = {() => deleteCard(card.id, card.status)} editCard = {() => editCard(card)}  />
                        </li>
                    )}
                </Draggable>
            ))}
            {cards.length === 0 &&  <h4 className='no-items-message'>No more cards.</h4>}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
        
            
    </div>
                  
          
  )
}

Cards.propTypes = {
  cards: PropTypes.array,
  className: PropTypes.string,
  title: PropTypes.string,
  droppableId: PropTypes.string,
  deleteCard: PropTypes.func

}

export default Cards;