import React from 'react';
import { render, fireEvent, act} from '@testing-library/react';
import AddCard from '../../Components/AddCard';
import sinon from 'sinon'

let actionProps = {
  addTask: sinon.stub(),
  description: sinon.stub()
}
describe('Add Card', () => {

  afterEach(() => {
      sinon.restore(); 
  })

  test('update status', () => {
    const result  = render(<AddCard {...actionProps} />);
    const {getByTestId} = result;
    act(() => fireEvent.change(getByTestId('card-status-select'), {target:{value:'DONE'}}));
    expect(getByTestId('card-status-select').value).toEqual('DONE');
  });

  test('update name', () => {
    const result  = render(<AddCard {...actionProps} />);
    const {getByTestId} = result;
    act(() => fireEvent.change(getByTestId('card-name-input'), {target:{value:'hello'}}));
    expect(getByTestId('card-name-input').value).toEqual('hello');
  });

  test('update description', () => {
    const result  = render(<AddCard {...actionProps} />);
    const {getByTestId} = result;
    act(() => fireEvent.change(getByTestId('card-description-textarea'), {target:{value:'this is a description'}}));
    expect(getByTestId('card-description-textarea').value).toEqual('this is a description');
  });

  test('call add task with empty name', () => {
    const result  = render(<AddCard {...actionProps} />);
    const {getByTestId} = result;
    fireEvent.click(getByTestId('add-card'));
    expect(getByTestId('card-name-input')).toHaveClass('input-error');
  })


})

