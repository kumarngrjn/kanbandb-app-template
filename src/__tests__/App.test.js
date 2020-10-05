import React from 'react';
import { render, act, fireEvent, waitFor} from '@testing-library/react';
import App from '../App'
import KanbanDB from 'kanbandb/dist/KanbanDB';
import sinon from 'sinon'

describe('App component', () => {
  const cards = [
    {
        id: 'card1',
        name: 'card 1',
        status: 'TODO',
        description: 'hello'
    },
    {
        id: 'card2',
        name: 'card 2',
        status: 'DOING',
        description: 'hello2'
    },
    {
        id: 'card3',
        name: 'card 3',
        status: 'DONE',
        description: 'hello3'
    }
]

  describe('Test Component render with cards', () => {

    beforeEach(() => {
        sinon.stub(KanbanDB, 'connect').resolves({test: 1})
        sinon.stub(KanbanDB, 'addCard').resolves(1);
    })

    afterEach(() => {
        sinon.restore();
    })

    test('component render with cards', async () => {
      
      sinon.stub(KanbanDB,'getCards').resolves(cards)

      let result;
      await act(async() => {
          result = render(<App />)
      })
      expect(result.queryByText(/card 1/).closest('div')).toHaveClass('todo');
      expect(result.queryByText(/card 1/)).toBeInTheDocument()
      expect(result.queryByText(/card 2/).closest('div')).toHaveClass('inprogress');
      expect(result.queryByText(/card 2/)).toBeInTheDocument();
      expect(result.queryByText(/card 3/).closest('div')).toHaveClass('done');
      expect(result.queryByText(/card 3/)).toBeInTheDocument();
    })

    test('component render with no cards',async () => {
      sinon.stub(KanbanDB,'getCards').resolves([])
      let result;
      await act(async() => {
          result = render(<App />)
      })
      expect(result.queryByText(/ToDo/)).toHaveClass('section-title');
      const noresultsElement = result.queryAllByText(/No more cards/);
      expect(noresultsElement[0].closest('div')).toHaveClass('todo');
      expect(noresultsElement[1].closest('div')).toHaveClass('inprogress');
      expect(noresultsElement[2].closest('div')).toHaveClass('done');
    })



    test('call add task', async () => {
      sinon.stub(KanbanDB,'getCards').resolves(cards)
      sinon.stub(KanbanDB, 'getCardById').resolves({id: 'card4', name: 'hello', status: 'DONE', description: 'this is a description'});
      let result;
      await act(async() => {
        result = render(<App />)
      })

      const {getByTestId,queryByTestId} = result;
      act(() => fireEvent.click(getByTestId('show-add-task-dialog')));
      act(() => fireEvent.change(getByTestId('card-status-select'), {target:{value:'DONE'}}));
      act(() => fireEvent.change(getByTestId('card-name-input'), {target:{value:'hello'}}));
      act(() => fireEvent.change(getByTestId('card-description-textarea'), {target:{value:'this is test description'}}));
      act(() => fireEvent.click(getByTestId('add-card')));

      await waitFor(()=> {
        expect(queryByTestId('message-bar')).toBeTruthy;
        expect(queryByTestId('message-bar')).toHaveClass('success');
        expect(getByTestId('droppable3-card-1')).toBeTruthy
        expect(getByTestId('droppable3-card-1').closest('div')).toHaveClass('done');
          
      });
    })

    test('call add task - cancel button', async () => {
      sinon.stub(KanbanDB,'getCards').resolves(cards)
      sinon.stub(KanbanDB, 'getCardById').resolves({id: 'card4', name: 'hello', status: 'DONE', description: 'this is a description'});
      let result;
      await act(async() => {
        result = render(<App />)
      })

      const {getByTestId,queryByTestId} = result;
      act(() => fireEvent.click(getByTestId('show-add-task-dialog')));
      act(() => fireEvent.change(getByTestId('card-status-select'), {target:{value:'DONE'}}));
      act(() => fireEvent.change(getByTestId('card-name-input'), {target:{value:'hello'}}));
      act(() => fireEvent.change(getByTestId('card-description-textarea'), {target:{value:'this is test description'}}));
      act(() => fireEvent.click(getByTestId('cancel-add-card')));
      expect(queryByTestId('add-task-modal')).toBeNull()

    })

    test('call delete  task', async () => {
      sinon.stub(KanbanDB,'getCards').resolves(cards)
      sinon.stub(KanbanDB, 'deleteCardById').resolves(true);
      let result;
      await act(async() => {
          result = render(<App />)
      })

      const {getByTestId,queryAllByText,queryByTestId} = result;
      act(() => fireEvent.click(getByTestId('delete-card-card1')));

      await waitFor(()=> {
        expect(queryByTestId('message-bar')).toBeTruthy;
        expect(queryByTestId('message-bar')).toHaveClass('success');
        const noresultsElement = queryAllByText(/No more cards/);
        expect(noresultsElement.length).toBe(1)
        expect(noresultsElement[0].closest('div')).toHaveClass('todo');
      });
      expect(queryByTestId('droppable1-card-0')).toBeNull()

    })
  })
})




