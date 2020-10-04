import React, { useEffect, useState } from 'react';
import './sass/normalize.scss';
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
  const [gotCards, setGotCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({});

  /**
   * addInitialCards - adds the initial cards to populate the kanban board
   */
  const addInitialCards = async ()  => {
     defaultCards.forEach(async card => {
      try{
        await KanbanDB.addCard(card);
      }
      catch(err){
        console.error(err.message);
      }
    })
  }

  /**
   * getCards - gets the cards for all status on initial page load
   */

  const getCards = async () => {
    try {
      // connects the db
      const connect = await KanbanDB.connect();
      if(connect){
        // add initial cards
        await addInitialCards();
        //  get the list of cards
        const cards = await KanbanDB.getCards()
        // sort the cards by last updated
        if(cards.length> 0){
          cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
          setCards(cards);
        }
        // set got cards flage
        setGotCards(true)
      }
      else{
        setMessage({success: false, name: 'Error connecting tp database. Try again later.'});
        setShowMessage(true);
      }
    }
    catch(error){
      // show an error message if any of the operations fail.
      setMessage({success: false, name: 'Get Cards fail: '+ error.message});
      setShowMessage(true);
    }
  }
  /**
   * runs on initial page load and gets the list of cards
   */
  useEffect(() => {
    cards.length === 0 && !gotCards && getCards();
  },[gotCards]);

  /**
   * addtask - updates the db with the new card details and calls the callback function 
   * 
   * @param {string} name : name of the card 
   * @param {string} status : name of the card 
   * @param {string} description : name of the card 
   * @param {function} callback - callback function after add card is successful
   */
  const addTask = async ({name, status, description}, callback) => {
    try{
      // calls add card to add the card
      const cardId = await KanbanDB.addCard({name, status, description});
      // sets the message saying card added
      setMessage({success: true, name: 'Card added: '+ name});
      // get card details of the card addeed
      const addedCard = await KanbanDB.getCardById(cardId)
      // clone existing cards array and add the new card to the array
      const updatedCardList = cloneDeep(cards);
      updatedCardList.push(addedCard);
      updatedCardList.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      // update the kanban board
      setCards(updatedCardList);
      callback && callback()
      setShowMessage(true);
      setShowAddTask(false);
    }
    catch(error){
      setMessage({success: false, name: 'Add Task fail: '+ error.message});
      setShowMessage(true);
    } 
  }

  /**
   * move - method called when user drags the card to another board.
   * 
   * @param {string} cardId  - the id of the card that was dragged
   * @param {string} sourceDroppableId - the  dropppable id of the board from which the card was dragged
   * @param {string} destinationDroppableId - the  dropppable id  of the board where the card was dropped
   */
  const move = async(cardId, sourceDroppableId, destinationDroppableId) => {  
    // get the card and update the status of the card  
    const updatedCard = cards.find(card => card.id === cardId);
    if(updatedCard){
      updatedCard.status = reverseCardStatusMapObject[destinationDroppableId];
      try {
        // call update card method to update the status of the card
        const updateCard  = await KanbanDB.updateCardById(updatedCard.id, updatedCard);
        if(updateCard){
          // get the cards for both the boards the board where card was dragged and dropped
          const newCardsList = await KanbanDB.getCardsByStatusCodes([reverseCardStatusMapObject[sourceDroppableId], reverseCardStatusMapObject[destinationDroppableId]]);
          if(newCardsList){
            newCardsList.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            // call merge to merge the exisiting cards array with the new cards list
            merge(newCardsList, cards);
            // set the updated board
            setCards(newCardsList);
          }
        }
      }
      catch(error)  {
        setMessage({success: false,name:error.message}); 
        setShowMessage(true)
      };
    }
    else{
      setMessage({success: false,name:'Could not find card with id-'+ cardId}); 
      setShowMessage(true)
    }
  }

  /**
   * onDragEnd - method called after the card has been dropped,
   * @param {object} result - contains info on source , destination boards and also the card
   */
  const onDragEnd = result => {
    const { draggableId , source, destination} = result;

    // dropped outside the list
    if (!destination) {
        return;
    }
    // if dropped in the same list, dont do anything
    if (source.droppableId === destination.droppableId) {
      return;
    } 
    // call move method to update the full board
    else {   
      move(draggableId, source.droppableId, destination.droppableId);
    }
};

/**
 * deleteCard - method called when user deletes a card
 * 
 * @param {string} cardId - id of the card being deleted
 * @param {string} status - status of the card
 */
const deleteCard = async (cardId) => {
  try {
    // call delete card db method
    const deleteCardResponse = await KanbanDB.deleteCardById(cardId)
    // on success update the card list
    if(deleteCardResponse){
      // get the updated card array
      const updatedList = cards.filter(card => card.id !== cardId)
      //cards.splice(cardItemIndex,1);
      setCards(updatedList);

      setMessage({success: true, name:'Card successfully deleted'});
      setShowMessage(true);
    }
  }
  catch(error){
    setMessage({success: false, name:error.message});
    setShowMessage(true);
  }
};

/**
 * resetMessages - hide the message notificaton and empty the popup
 */
const resetMessage = () => {
  setMessage({})
  setShowMessage(false)
}
/**
 * renderCards - iterate the cardtstatusobject to get the cards for each status and render the,
 */
const renderCards = () => {
  const renderObject = [];
  for(const key in cardStatusObject){
    const cardsForCurrentStatus = cards.filter(card => card.status === key);
    renderObject.push(<Cards key={key} cards={cardsForCurrentStatus} title={cardStatusObject[key].title} droppableId ={cardStatusObject[key].droppableId} className={cardStatusObject[key].class} deleteCard={deleteCard}/>);
  } 
  return [...renderObject];
}

  return (
    <div className='App'>
      <header className='App-header'>
      </header>
      {gotCards &&<div className='content'>
        <div className={showMessage ? 'fadein': 'fadeout'}>
          {showMessage && <Message message={message} closeMessage ={resetMessage} />}
        </div>
        <button data-testid='show-add-task-dialog' id='show-add-task-dialog' className='primary' onClick={()=> setShowAddTask(true)}>Add Task</button>
        {showAddTask && <AddCard setShowModal={setShowAddTask} addTask ={addTask} />}
        <div className='card-board-wrapper'>
          <DragDropContext onDragEnd={onDragEnd}>
            {renderCards(cards)}
          </DragDropContext>
        </div>
      </div>}

    </div>
  );
}

export default App;
