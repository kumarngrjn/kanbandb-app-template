import React from 'react';
import classnames from 'classnames'
import '../sass/Message.scss';

function Message(props){
    const messagetype = classnames('message',{success: props.message.success}, {error: !props.message.success})
    return(
        <div className={messagetype} onClick={props.closeMessage}>
            <span className='message-text'>{props.message.name}</span>
        </div>
    )
}

export default Message;