import React, { useEffect, useState } from 'react';
import './sass/normalize.css';
import './sass/default.scss';
import './sass/App.scss'
import {cards} from './variables'
import KanbanDB from 'kanbandb/dist/KanbanDB';
import Cards from './Components/Cards';
import AddCard from './Components/AddCard';
import { DragDropContext} from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import Message from './Components/Message';


function App() {
  // Initialize DB communications.
  const [gotCards, setGotCards] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({});

  const mapObject = {
    droppable1 : {key: 'TODO',value: todoItems},
    droppable2 : {key: 'DOING',value: inProgressItems},
    droppable3 : {key: 'DONE',value: completedItems},
  }

  const addInitialCards = db  => {

    cards.forEach(async (card) => {
      try{
        const cardId = await db.addCard(card);
        console.log('card added with '+ cardId)
      }
      catch(err){
        console.error(err.message);
      }
    })

  }

  const getCards = async () => {
    const connect = await KanbanDB.connect();
    await addInitialCards(connect);
    const cards = await connect.getCards()

    if(cards.length> 0){
      cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      const todoItems = cards.filter(card => card.status === 'TODO')
      const inProgressItems = cards.filter(card => card.status === 'DOING')
      const completedItems = cards.filter(card => card.status === 'DONE')

      setTodoItems(todoItems)
      setInProgressItems(inProgressItems)
      setCompletedItems(completedItems)
    }

    setGotCards(true)
  }

  useEffect(() => {
    getCards();
  },[gotCards]);

  const addTask = async ({name, status, description}, callback) => {
      try{
        await KanbanDB.addCard({name, status, description});
        setMessage({success: true, name: 'Card added: '+ name});
        KanbanDB.getCardsByStatusCodes([status])
          .then (cards => {
            console.log(cards);
            cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            status === 'TODO' && setTodoItems(cards)

            status === 'DOING' && setInProgressItems(cards)

            status === 'DONE' && setCompletedItems(cards)

            setShowAddTask(false);

            callback && callback()
        })
        .catch(error => {setMessage({success: false, name: error.message}); setShowMessage(true)});
      }
      catch(error){
        setMessage({success: false, name: error.message});
      } 
      console.info('called set show mess')
      
      setShowMessage(true);
  }

  

  const move = (sourceDroppableId, destinationDroppableId, sourceIndex) => {
    //let modifiedRemoveList  =  [];
    let removed = null;
    
    const modifiedRemoveList = cloneDeep(mapObject[sourceDroppableId].value);
    [removed]  = modifiedRemoveList.splice(sourceIndex, 1);
    removed.status = mapObject[destinationDroppableId].key

    const updateCard  = KanbanDB.updateCardById(removed.id, removed);
    console.log(updateCard);
    if(updateCard){
      KanbanDB.getCards()
        .then (cards => {
            console.log(cards);
            cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            const todoItems = cards.filter(card => card.status === 'TODO')
            const inProgressItems = cards.filter(card => card.status === 'DOING')
            const completedItems = cards.filter(card => card.status === 'DONE')

            setTodoItems(todoItems);
            setInProgressItems(inProgressItems);
            setCompletedItems(completedItems);
        })
        .catch(error => console.error(error.message));
    }

  }

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }
    
    if (source.droppableId === destination.droppableId) {
      return;
    } 
    else {   
      console.log("hello");
        move(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index
        );

    }
};

const deleteCard = async (cardId, droppableId) => {
  const deleteCardResponse = await KanbanDB.deleteCardById(cardId)
  let cards = [];
  if(deleteCardResponse){
  setMessage({success: true, name:'Card successfully deleted'});
  setShowMessage(true);
  switch(droppableId){
    case 'droppable1':
      cards = await KanbanDB.getCardsByStatusCodes(['TODO']);
      cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      setTodoItems(cards);
      break;
    
    case 'droppable2':
      cards = await KanbanDB.getCardsByStatusCodes(['DOING']);
      cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      setInProgressItems(cards);
      break;
    
    case 'droppable3':
      cards = await KanbanDB.getCardsByStatusCodes(['DONE']);
      cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      setCompletedItems(cards);

      break;
  }
  }

};

const resetMessage = () => {
  setMessage({})
  setShowMessage(false)
}

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='content'>
        {showMessage && <Message message={message} closeMessage ={resetMessage} />}
        <button className='primary' onClick={()=> setShowAddTask(true)}>Add Task</button>
        {showAddTask && <AddCard showModal={showAddTask} setShowModal ={setShowAddTask} addTask ={addTask} />}
        <div className='card-board-wrapper'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Cards cards ={todoItems} title={'To-do'}  droppableId = {'droppable1'} deleteCard = {deleteCard} className='todo'/>
            <Cards cards ={inProgressItems} title={'In progress'} droppableId = {'droppable2'} deleteCard = {deleteCard} className='inprogress'/>
            <Cards cards ={completedItems} title={'Complete'} droppableId = {'droppable3'} deleteCard = {deleteCard} className='done' />
          </DragDropContext>
        </div>
      </div>

    </div>
  );
}

export default App;
