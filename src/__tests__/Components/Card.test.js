import React from 'react';
import { render } from '@testing-library/react';
import Card from '../../Components/Card';

let CardProps
beforeEach(() => {
    CardProps = {
        name: 'card name',
        description: 'card jsjsjs'
    }
})

test('renders learn react link', () => {

  const result  = render(<Card {...CardProps} />);
  // result.

});
