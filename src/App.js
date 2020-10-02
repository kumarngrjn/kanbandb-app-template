import React, { useEffect, useState } from 'react';
import './sass/default.scss';
import './sass/App.scss'
import {cards} from './variables'
import KanbanDB from 'kanbandb/dist/KanbanDB';
import Cards from './Components/Cards';
import AddCard from './Components/AddCard';
import { DragDropContext} from 'react-beautiful-dnd';


function App() {
  // Initialize DB communications.
  const [todoItems, setTodoItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const addInitialCards = db => {

    cards.forEach(card => {
      db.addCard(card)
        .then(cardId => console.log('card added with ID ' + cardId))
        .catch(err => console.error(err.message))
    })

  }

  useEffect(() => {
    KanbanDB
      .connect()
      .then( db => {
        addInitialCards(db)
        db.getCards()
          .then(cards => {
            const todoItems = cards.filter(card => card.status === 'TODO')
            const inProgressItems = cards.filter(card => card.status === 'DOING')
            const completedItems = cards.filter(card => card.status === 'DONE')

            setTodoItems(todoItems);
            setInProgressItems(inProgressItems);
            setCompletedItems(completedItems);
            
          })
        .catch(error => console.error(error.message));
      })
  },[]);

  const addTask = (name, status, callback) => {

      KanbanDB.addCard({name, status, descripton: ''})
        .then(cardId => console.log('card added with ID ' + cardId))
        .catch(error => console.error(error.message));
      
      KanbanDB.getCardsByStatusCodes([status])
      .then (cards => {
          console.log(cards);
          status === 'TODO' && setTodoItems(cards)
          status === 'DOING' && setInProgressItems(cards)
          status === 'DONE' && setCompletedItems(cards)
          callback && callback()
      })
      .catch(error => console.error(error.message));

  }

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
      console.log('hi');
        // const items = reorder(
        //     this.getList(source.droppableId),
        //     source.index,
        //     destination.index
        // );

        // let state = { items };

        // if (source.droppableId === 'droppable2') {
        //     state = { selected: items };
        // }

        // this.setState(state);
    } else {
        console.log('hello');
        // const result = move(
        //     this.getList(source.droppableId),
        //     this.getList(destination.droppableId),
        //     source,
        //     destination
        // );

        // this.setState({
        //     items: result.droppable,
        //     selected: result.droppable2
        // });
    }
};

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='content'>
        <AddCard addTask = {addTask} />
        <div className='card-board-wrapper'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Cards cards ={todoItems} title={'To-do'}  droppableId = {'droppable1'}/>
            <Cards cards ={inProgressItems} title={'In progress'} droppableId = {'droppable2'}/>
            <Cards cards ={completedItems} title={'Complete'} droppableId = {'droppable3'} />
          </DragDropContext>
        </div>
      </div>

    </div>
  );
}

export default App;
