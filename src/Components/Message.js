/**
 * @file Message - Displays message 
 */

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import '../sass/Message.scss';

const Message = props => {
  const {message, closeMessage} = props;
  const messagetype = classnames('message',{success: message.success}, {error: !message.success})

  setTimeout(()=>{
    closeMessage()
  }, 5000);
  
  return(
    <div data-testid={'message-bar'} className={messagetype} onClick={closeMessage}>
        <span className='message-text'>{message.name}</span>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  closeMessage: PropTypes.func
}

export default Message;