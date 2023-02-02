import dayjs from 'dayjs';
import React, { useContext, useRef, useEffect } from 'react';
import { ChatContext, ChatContextType } from '../../../../contexts/ChatContext';
import { useAuth } from '../../../../hooks/useAuth';
import { DBMessageModel } from '../../../../types/models';
import { MessageInfoStyled, MessageStyled, NewDateStyled } from './Message.styled';

interface MessageProps {
  message: DBMessageModel;
  scroll: React.RefObject<HTMLSpanElement>;
  handleClick: (img: string) => void;
  newDate?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, scroll, handleClick, newDate }) => {
  const { currentUser } = useAuth();
  const { state } = useContext(ChatContext) as ChatContextType;

  const handleClickImg = () => {
    handleClick(message.image ? message.image : '');
  };

  useEffect(() => {
    // scroll.current?.scrollIntoView({ behavior: 'smooth' });
    // scroll.current?.scrollIntoView();
    scroll.current?.scrollIntoView(true);
    // scroll.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [message]);

  return (
    <>
      {newDate ? (
        <NewDateStyled>{dayjs(message.date.toDate()).format('MMMM D')}</NewDateStyled>
      ) : null}

      <MessageStyled owner={message.senderId === currentUser!.uid}>
        <MessageInfoStyled>
          <img
            src={
              currentUser?.photoURL && message.senderId === currentUser!.uid
                ? currentUser!.photoURL
                : state.user!.photoUrl
            }
            alt=''
            referrerPolicy='no-referrer'
          />
          <span>{dayjs(message.date.toDate()).format('HH:mm')}</span>
        </MessageInfoStyled>

        <div>
          {message.text && <p>{message.text}</p>}
          {message.image && <img src={message.image} alt='' onClick={handleClickImg} />}
        </div>
      </MessageStyled>
    </>
  );
};

export default Message;
