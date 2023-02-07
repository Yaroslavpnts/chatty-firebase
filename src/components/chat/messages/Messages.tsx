import dayjs from 'dayjs';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { DBMessageModel } from '../../../types/models';
import { db } from '../../../utils/init-firebase';
import SendMessage from './sendMessage/SendMessage';
import Message from './message/Message';
import { MessagesBlockstyled, SectionStyled } from './Messages.styled';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import CustomModal from '../../../UI/modal/CustomModal';
import { useChatContext } from '../../../hooks/useChat';

dayjs.extend(dayOfYear);

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<DBMessageModel[]>([]);
  const [img, setImg] = useState('');
  const scrollRef = useRef<HTMLSpanElement>(null);

  const dayYearRef = useRef(0);

  const { state } = useChatContext();

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
        scrollRef={scrollRef}
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

        <SendMessage scrollRef={scrollRef} />
        <span
          ref={scrollRef}
          style={{
            minHeight: '15px',
          }}
        />
      </SectionStyled>

      <CustomModal active={!!img} handleClose={() => setImg('')}>
        <img src={img} alt='' />
      </CustomModal>
    </>
  );
};

export default Messages;
