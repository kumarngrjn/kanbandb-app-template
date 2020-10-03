// KanbanDB
    // .connect()
    // .then( db => {
    //   addInitialCards(db)
    //   db.getCards()
    //     .then(cards => {
    //       cards.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    //       const newTodoItems = cards.filter(card => card.status === 'TODO')
    //       const newInProgressItems = cards.filter(card => card.status === 'DOING')
    //       const newCompletedItems = cards.filter(card => card.status === 'DONE')

    //       setTodoItems(newTodoItems)
    //       setInProgressItems(newInProgressItems)
    //       setCompletedItems(newCompletedItems)

    //       // !isEqual(newTodoItems, todoItems) && setTodoItems(newTodoItems);
    //       // !isEqual(newInProgressItems, inProgressItems) && setInProgressItems(newInProgressItems);
    //       // !isEqual(newCompletedItems, completedItems) && setCompletedItems(newCompletedItems);
          
    //     })
    //   .catch(error => console.error(error.message));
    // })

    // <Cards cards ={todoItems} title={'To-do'}  droppableId = {'droppable1'} deleteCard = {deleteCard} className='todo'/>
    //         <Cards cards ={inProgressItems} title={'In progress'} droppableId = {'droppable2'} deleteCard = {deleteCard} className='inprogress'/>
    //         <Cards cards ={completedItems} title={'Complete'} droppableId = {'droppable3'} deleteCard = {deleteCard} className='done' />


    // const renderCards = () => {
    //     const mapObject = {
    //       TODO: {droppableId: droppable1, class: 'todo', title: 'to-do'},
    //       DOING: {droppableId: droppable2, class: 'todo', title: 'in progress'}, 
    //       DONE: {droppableId: droppable3, class: 'todo', title: 'done'}
    //     }
      
    //     for(const key in mapObject){
    //       const carddforthos = cards.map(card.STATUS === key);
    //       return <Cards cards={carddforthos} title={mapObject[key].title} droppableId ={mapObject[key].droppableId} deleteCard={deleteCard} className={mapObject[key].className}/>
    //     }  
    //   }