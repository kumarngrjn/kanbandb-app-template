import React from 'react';
import { render, act } from '@testing-library/react';
import {mount, shallow, configure} from 'enzyme';
import App from '../App'
import KanbanDB from 'kanbandb/dist/KanbanDB';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon'

configure({adapter: new Adapter()});

const mock = jest.fn();

mock.mockImplementation(KanbanDB.connect())

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



afterEach(() => {
    sinon.restore();
})

  test('component render with cards', async () => {
    
    sinon.stub(KanbanDB, 'connect').resolves({
        addCard: function(){}, 
        getCards: function(){return cards;}
    });
    sinon.stub(KanbanDB, 'addCard');

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
    sinon.stub(KanbanDB, 'connect').resolves({
        addCard: function(){}, 
        getCards: function(){return [];}
    });
    sinon.stub(KanbanDB, 'addCard');

    let result;
    await act(async() => {
        result = render(<App />)
    })
    expect(result.queryByText(/ToDo/)).toHaveClass('cards-title');
    const noresultsElement = result.queryAllByText(/No more cards/);
    expect(noresultsElement[0].closest('div')).toHaveClass('todo');
    expect(noresultsElement[1].closest('div')).toHaveClass('inprogress');
    expect(noresultsElement[2].closest('div')).toHaveClass('done');
  })


})
