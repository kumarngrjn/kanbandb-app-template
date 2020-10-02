import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';

function Cards (props){
    return (
        
        <Droppable droppableId={props.droppableId}>
            {(provided, snapshot) => (
                <div className='cards-list-wrapper' ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    <h3 className='cards-title'>{props.title}</h3>
                    <ul className='card-list'>
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
                                        <Card {...card} />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                </div>
            )}
        </Droppable>
    )
}

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#2185d0' : '',
    color: isDragging ? '#fff' : '',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#f3f3f3' : '',
    padding: '10px',
});

export default Cards;