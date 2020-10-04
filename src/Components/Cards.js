import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Card from './Card';
import '../sass/Cards.scss'
import { isEqual } from 'lodash';

const Cards = React.memo(props => {

  return (
              
    <div className={'cards-list-wrapper ' + props.className}  >
      <h3 className='cards-title'>{props.title}</h3>
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <ul className='card-list' ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {props.cards.map((card,index) => (
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
                            className='card'
                        >
                            <Card {...card} deleteCard = {() => props.deleteCard(card.id)}  />
                        </li>
                    )}
                </Draggable>
            ))}
            {props.cards.length === 0 &&  <h4 className='no-items-message'>No more cards.</h4>}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
        
            
    </div>
                  
          
  )
}, function (prevProps, nextProps){
    // console.log(prevProps.cards);
    // console.log(nextProps.cards);
    console.log(isEqual(prevProps.cards, nextProps.cards))
    return isEqual(prevProps.cards, nextProps.cards);
})


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid*2}px 0`,

    // change background colour if dragging
    background: isDragging ? '#2185d0' : '',
    color: isDragging ? '#fff' : '',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#f3f3f3' : '',
    padding: '10px 20px',
});

Cards.propTypes = {
  cards: PropTypes.array,
  className: PropTypes.string,
  title: PropTypes.string,
  droppableId: PropTypes.string,
  deleteCard: PropTypes.func

}

export default Cards;