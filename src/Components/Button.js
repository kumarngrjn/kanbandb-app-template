/**
 * @file Button - Displays different types of button styles based on props provided.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const {action, name, className, type, size, isTitle, testId} = props

  const buttonType = type ? type: 'normal'
  const buttonSize = size ? size: ''
  const buttonTitle = isTitle ? 'title-button': ''
  return (
    <Fragment>
    {buttonType === 'primary' &&
        <button className={'primary '+ buttonSize + ' '+  buttonTitle + ' ' + className} data-testid={testId}  onClick={action}>{name}</button>
    }
    {buttonType === 'danger'&&
        <button className={'danger '+ buttonSize + ' '+  buttonTitle + ' ' + className} data-testid={testId}  onClick={action}>{name}</button>
    }
    {buttonType === 'normal' &&
      <button className={buttonSize + ' '+  buttonTitle + ' ' + className} data-testid={testId}  onClick={action}>{name}</button>
    }
    </Fragment>
  )
}

Button.propTypes = {
  action: PropTypes.func, 
  name: PropTypes.string, 
  className: PropTypes.string, 
  type: PropTypes.string, 
  size: PropTypes.string, 
  isTitle: PropTypes.bool, 
  testId: PropTypes.string
}

export default Button;