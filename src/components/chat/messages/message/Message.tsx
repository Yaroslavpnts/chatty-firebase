import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { useChatContext } from '../../../../hooks/useChat';
import { DBMessageModel } from '../../../../types/models';
import { MessageInfoStyled, MessageStyled, NewDateStyled } from './Message.styled';

interface MessageProps {
  message: DBMessageModel;
  scrollRef: React.RefObject<HTMLSpanElement>;
  handleClick: (img: string) => void;
  newDate?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, scrollRef, handleClick, newDate }) => {
  const { currentUser } = useAuth();
  const { state } = useChatContext();

  const handleClickImg = () => {
    handleClick(message.image ? message.image : '');
  };

  useEffect(() => {
    // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    scrollRef.current?.scrollIntoView(false);
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
          {message.image && <img src={message.image} alt='' onClick={handleClickImg} />}
          {message.text && <p>{message.text}</p>}
        </div>
      </MessageStyled>
    </>
  );
};

export default Message;
