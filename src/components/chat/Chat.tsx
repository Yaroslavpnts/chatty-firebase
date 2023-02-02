import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { MessagesContainer, ChatInfo } from './Chat.styled';
import Messages from './messages/Messages';
import { ChatContext, ChatContextType } from '../../contexts/ChatContext';
import BubbleBg from '../../assets/png/bubble-bg.png';

const Chat: React.FC = () => {
  const { state } = useContext(ChatContext) as ChatContextType;

  const props = Object.assign({}, { bgimage: BubbleBg });

  return (
    <MessagesContainer {...props}>
      {state.user?.uid && (
        <>
          <ChatInfo>
            <img src={state.user.photoUrl} alt='' referrerPolicy='no-referrer' />
            <span>{state.user?.displayName}</span>
          </ChatInfo>
          <Messages />
        </>
      )}
    </MessagesContainer>
  );
};

export default Chat;
