import React, { useEffect, useState } from 'react';
import './sass/normalize.css';
import './sass/default.scss';
import './sass/App.scss'
import {defaultCards, cardStatusObject,reverseCardStatusMapObject} from './variables'
import KanbanDB from 'kanbandb/dist/KanbanDB';
import Cards from './Components/Cards';
import AddCard from './Components/AddCard';
import { DragDropContext} from 'react-beautiful-dnd';
import { cloneDeep, merge } from 'lodash';
import Message from './Components/Message';


function App() {
  // Initialize DB communications.
  const [gotCards, setGotCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({});


  const addInitialCards = db  => {
    defaultCards.forEach(async (card) => {
      try{
        await db.addCard(card);
      }
      catch(err){
        console.error(err.message);
      }
    })

  }

  const getCards = async () => {
    try {
      const connect = await KanbanDB.connect();
      await addInitialCards(connect);
      const cards = await connect.getCards()

      if(cards.length> 0){
        cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        setCards(cards);
      }

      setGotCards(true)
    }
    catch(error){
      setMessage({success: false, name: error.message});
      setShowMessage(true);
    }
  }

  useEffect(() => {
    cards.length === 0 && getCards();
  },[gotCards]);

  const addTask = async ({name, status, description}, callback) => {
    try{
      const cardId = await KanbanDB.addCard({name, status, description});
      setMessage({success: true, name: 'Card added: '+ name});
      const addedCard = await KanbanDB.getCardById(cardId)
      const updatedCardList = cloneDeep(cards);
      updatedCardList.push(addedCard);
      updatedCardList.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      console.log(updatedCardList);
      setCards(updatedCardList);
      setShowAddTask(false);
      callback && callback()
      setShowMessage(true);
    }
    catch(error){
      setMessage({success: false, name: error.message});
      setShowMessage(true);
    } 
    console.info('called set show mess')
    
  }

  const move = async(cardId, sourceDroppableId, destinationDroppableId) => {    
    const updatedCard = cards.find(card => card.id === cardId);
    updatedCard.status = reverseCardStatusMapObject[destinationDroppableId];
    console.log(updatedCard);
    try {
      const updateCard  = await KanbanDB.updateCardById(updatedCard.id, updatedCard);
  
      if(updateCard){
        const newCardsList = await KanbanDB.getCardsByStatusCodes([reverseCardStatusMapObject[sourceDroppableId], reverseCardStatusMapObject[destinationDroppableId]]);
        if(newCardsList){
          console.log(newCardsList);
          newCardsList.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
          console.log(cards);
          merge(newCardsList, cards);
          console.log(newCardsList)
          setCards(newCardsList);
        }
      }
    }
    catch(error)  {
      setMessage({success: false,name:error.message}); 
      setShowMessage(true)
    };
    

  }

  const onDragEnd = result => {
    console.log(result);
    const { draggableId , source, destination} = result;

    // dropped outside the list
    if (!destination) {
        return;
    }
    
    if (source.droppableId === destination.droppableId) {
      return;
    } 
    else {   
      console.log("hello");
        move(draggableId, source.droppableId, destination.droppableId);

    }
};

const deleteCard = async (cardId) => {
  try {
    const deleteCardResponse = await KanbanDB.deleteCardById(cardId)
    console.log(deleteCardResponse)
    if(deleteCardResponse){
      setMessage({success: true, name:'Card successfully deleted'});
      setShowMessage(true);
      const newCardsList = cards.filter(card => card.id !== cardId)
      setCards(newCardsList);
    }
  }
  catch(error){
    setMessage({success: false, name:error.message});
    setShowMessage(true);
  }
};



const resetMessage = () => {
  setMessage({})
  setShowMessage(false)
}

const renderCards = () => {
  const renderObject = []
  for(const key in cardStatusObject){
    const cardsForCurrentStatus = cards.filter(card => card.status === key);
    renderObject.push(<Cards data-testid={key} cards={cardsForCurrentStatus} title={cardStatusObject[key].title} droppableId ={cardStatusObject[key].droppableId} className={cardStatusObject[key].class} deleteCard={deleteCard}/>);
  } 
  return [...renderObject];
}

  return (
    <div className="App">
      <header className="App-header">
      </header>
      {gotCards &&<div className='content'>
        {showMessage && <Message message={message} closeMessage ={resetMessage} />}
        <button className='primary' onClick={()=> setShowAddTask(true)}>Add Task</button>
        {showAddTask && <AddCard showModal={showAddTask} setShowModal ={setShowAddTask} addTask ={addTask} />}
        <div className='card-board-wrapper'>
          <DragDropContext onDragEnd={onDragEnd}>
            {renderCards()}
          </DragDropContext>
        </div>
      </div>}

    </div>
  );
}

export default App;
