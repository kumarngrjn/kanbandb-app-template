import React from 'react';
import { render, fireEvent, act} from '@testing-library/react';
import AddCard from '../../Components/AddCard';
import sinon from 'sinon'

let props = {
  addTask: sinon.stub(),
  updateTask: sinon.stub(),
  card: null,
  description: sinon.stub()
}
describe('Add Card', () => {

  afterEach(() => {
      sinon.restore(); 
  })

  test('update status', () => {
    const result  = render(<AddCard {...props} />);
    const {getByTestId} = result;
    act(() => fireEvent.change(getByTestId('card-status-select'), {target:{value:'DONE'}}));
    expect(getByTestId('card-status-select').value).toEqual('DONE');
  });

  test('update name', () => {
    const result  = render(<AddCard {...props} />);
    const {getByTestId} = result;
    act(() => fireEvent.change(getByTestId('card-name-input'), {target:{value:'hello'}}));
    expect(getByTestId('card-name-input').value).toEqual('hello');
  });

  test('update description', () => {
    const result  = render(<AddCard {...props} />);
    const {getByTestId} = result;
    act(() => fireEvent.change(getByTestId('card-description-textarea'), {target:{value:'this is a description'}}));
    expect(getByTestId('card-description-textarea').value).toEqual('this is a description');
  });

  test('call add task with empty name', () => {
    const result  = render(<AddCard {...props} />);
    const {getByTestId} = result;
    fireEvent.click(getByTestId('add-card'));
    expect(getByTestId('card-name-input')).toHaveClass('input-error');
  })

  test('add task dialog loads with task detail when card prop is null', () => {
    const card = {
      name: 'test',
      status: 'TODO',
      description: 'This is test'
    }
    const result  = render(<AddCard {...props} />);
    const {getByTestId} = result;
    expect(getByTestId('card-status-select').value).toEqual('TODO');
    expect(getByTestId('card-name-input').value).toEqual('');
    expect(getByTestId('card-description-textarea').value).toEqual('');
    expect(getByTestId('add-card').innerHTML).toEqual('Add new');

  })

  test('add task dialog loads with task detail when supplied card prop', () => {
    const card = {
      name: 'test',
      status: 'TODO',
      description: 'This is test'
    }
    const result  = render(<AddCard {...props} card={card} />);
    const {getByTestId} = result;
    expect(getByTestId('card-status-select').value).toEqual(card.status);
    expect(getByTestId('card-name-input').value).toEqual(card.name);
    expect(getByTestId('card-description-textarea').value).toEqual(card.description);
    expect(getByTestId('add-card').innerHTML).toEqual('Update');

  })


})

