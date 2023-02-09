import React, { useEffect, useRef } from 'react';
import { ContextMenuStyled } from './messageContextMenu.styled';
import DeleteMsgIcon from '../../../../assets/svg/deleteMessage.svg';
import { useOutsideClick } from '../../../../hooks/useClickOutside';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../utils/init-firebase';
import { DBMessageModel } from '../../../../types/models';
import { useChatContext } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

export type Coords = {
  pageX: number;
  pageY: number;
};

interface MessageContextMenuProps {
  showContextMenu: boolean;
  setShowContextMenu: (show: boolean) => void;
  contextMenuCoords: Coords;
  setContextMenuCoords: (coords: Coords) => void;
  message: DBMessageModel;
}

export const MessageContextMenu: React.FC<MessageContextMenuProps> = ({
  showContextMenu,
  setShowContextMenu,
  contextMenuCoords,
  setContextMenuCoords,
  message,
}) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  const { state } = useChatContext();

  useOutsideClick(contextRef, () => {
    if (showContextMenu) {
      setShowContextMenu(false);
    }
  });

  const deleteMessage = async () => {
    const chatsLink = doc(db, 'chats', state.chatId as string);

    try {
      await updateDoc(chatsLink, {
        messages: arrayRemove(message),
      });

      const currentUserChatsLink = doc(db, 'userChats', currentUser!.uid);
      const userChatsRef = doc(db, 'userChats', state.user!.uid);

      const docSnap = await getDoc(chatsLink);

      if (docSnap.exists()) {
        const messages = docSnap.data().messages;
        const lastMessage = messages[messages.length - 1];

        await updateDoc(currentUserChatsLink, {
          [`${state.chatId}.lastMessage`]: {
            text: lastMessage.text,
          },
          [`${state.chatId}.lastImg`]: {
            url: lastMessage.image || '',
          },
          [`${state.chatId}.date`]: lastMessage.date,
        });

        await updateDoc(userChatsRef, {
          [`${state.chatId}.lastMessage`]: {
            text: lastMessage.text,
          },
          [`${state.chatId}.lastImg`]: {
            url: lastMessage.image || '',
          },
          [`${state.chatId}.date`]: lastMessage.date,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ref = contextRef.current;

    const handler = (e: MouseEvent) => {
      setShowContextMenu(false);
    };

    ref?.addEventListener('mouseleave', handler);

    return () => ref?.removeEventListener('mouseleave', handler);
    // eslint-disable-next-line
  }, []);

  return (
    <ContextMenuStyled ref={contextRef} coords={contextMenuCoords} onClick={deleteMessage}>
      <img src={DeleteMsgIcon} alt='' />
      <span>delete</span>
    </ContextMenuStyled>
  );
};
