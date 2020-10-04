import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import Card from '../../Components/Card';
import sinon from 'sinon'

describe('Card Component', () => {
  afterEach(()=> {
    sinon.restore();
  })
  
  test('renders card with values', () => {
    const props = {
      id: 'card-1',
      name: 'card name',
      description: 'card description',
      deleteCard: sinon.stub()
    }
    const result  = render(<Card {...props} />);
    const {getByTestId} = result;
    expect(getByTestId('card-title-'+props.id).innerHTML).toEqual(props.name);
    expect(getByTestId('card-description-'+props.id).innerHTML).toEqual(props.description);
  });
  
  test('calls delete method', () => {
    const props = {
      name: 'card name',
      description: 'card description',
      deleteCard: sinon.stub()
    }
    const result  = render(<Card {...props} />);
    const {getByTestId} = result;
    fireEvent.click(getByTestId('delete-card-'+props.id));
    expect(props.deleteCard.calledOnce).toBeTruthy;
  
  });
})


