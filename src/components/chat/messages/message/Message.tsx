import dayjs from 'dayjs';
import React, { MouseEvent, useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { useChatContext } from '../../../../hooks/useChat';
import { DBMessageModel } from '../../../../types/models';
import { MessageContextMenu } from '../messageContextMenu/MessageContextMenu';
import {
  MessageContentStyled,
  MessageInfoStyled,
  MessageStyled,
  NewDateStyled,
} from './Message.styled';

interface MessageProps {
  message: DBMessageModel;
  scrollRef: React.RefObject<HTMLSpanElement>;
  handleClick: (img: string) => void;
  newDate?: boolean;
}

const getCoords = (elem: HTMLElement) => {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
};

const Message: React.FC<MessageProps> = ({ message, scrollRef, handleClick, newDate }) => {
  const { currentUser } = useAuth();
  const { state } = useChatContext();

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuCoords, setContextMenuCoords] = useState({ pageX: 0, pageY: 0 });
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleClickImg = () => {
    handleClick(message.image ? message.image : '');
  };

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const coords = getCoords(messageContainerRef.current as HTMLElement);

    setContextMenuCoords({
      pageX: Math.abs(e.pageX - coords.left),
      pageY: Math.abs(e.pageY - coords.top),
    });

    setShowContextMenu(true);
  };

  useEffect(() => {
    // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    scrollRef.current?.scrollIntoView(false);
  }, [message, scrollRef]);

  return (
    <>
      {newDate ? (
        <NewDateStyled>{dayjs(message.date.toDate()).format('MMMM D')}</NewDateStyled>
      ) : null}

      <MessageStyled
        owner={message.senderId === currentUser!.uid}
        onContextMenu={handleContextMenu}
        ref={messageContainerRef}
      >
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

        <MessageContentStyled owner={message.senderId === currentUser!.uid}>
          {message.image && (
            <img src={message.image} alt='' onClick={handleClickImg} referrerPolicy='no-referrer' />
          )}
          {message.text && <p>{message.text}</p>}
          {showContextMenu ? (
            <MessageContextMenu
              showContextMenu={showContextMenu}
              setShowContextMenu={setShowContextMenu}
              contextMenuCoords={contextMenuCoords}
              setContextMenuCoords={setContextMenuCoords}
              message={message}
            />
          ) : null}
        </MessageContentStyled>
      </MessageStyled>
    </>
  );
};

export default Message;
