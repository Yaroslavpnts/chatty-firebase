import dayjs from 'dayjs';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext, ChatContextType } from '../../../contexts/ChatContext';
import { DBMessageModel } from '../../../types/models';
import { db } from '../../../utils/init-firebase';
import SendMessage from '../../sendMessage/SendMessage';
import Message from './message/Message';
import { MessagesBlockstyled, ModalStyled, SectionStyled } from './Messages.styled';
import dayOfYear from 'dayjs/plugin/dayOfYear';

dayjs.extend(dayOfYear);

const Messages = () => {
  const [messages, setMessages] = useState<DBMessageModel[]>([]);
  const [img, setImg] = useState('');
  const scroll = useRef<HTMLSpanElement>(null);

  const dayYearRef = useRef(0);

  const { state } = useContext(ChatContext) as ChatContextType;

  const handleClickImg = (img: string) => {
    setImg(img);
  };

  const messageMapFn = (message: DBMessageModel) => {
    const messageDay = dayjs(message.date.toDate()).dayOfYear();
    let newDay = false;

    if (dayYearRef.current !== messageDay) {
      dayYearRef.current = messageDay;
      newDay = true;
    }

    return (
      <Message
        key={message.id}
        message={message}
        scroll={scroll}
        handleClick={handleClickImg}
        newDate={newDay}
      />
    );
  };

  useEffect(() => {
    const getMessages = () => {
      if (state.chatId) {
        const chatRef = doc(db, 'chats', state.chatId);

        const unsub = onSnapshot(chatRef, (doc) => {
          if (doc.exists()) {
            setMessages(doc.data().messages);
          }
        });

        dayYearRef.current = 0;

        return unsub;
      }
    };

    if (state.chatId) {
      getMessages();
    }
  }, [state.chatId]);

  return (
    <>
      <SectionStyled>
        <MessagesBlockstyled>
          {state.chatId && messages && messages.map(messageMapFn)}
        </MessagesBlockstyled>

        <span ref={scroll}></span>
      </SectionStyled>
      <SendMessage />
    </>
  );
};

export default Messages;
