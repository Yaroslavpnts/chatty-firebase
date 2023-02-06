import React from 'react';
import { MessagesContainer, ChatInfo, UserImg } from './Chat.styled';
import Messages from './messages/Messages';
import BubbleBg from '../../assets/png/bubble-bg.png';
import ArrowLeftSvg from '../../assets/svg/arrowLeft.svg';
import { useChatContext } from '../../hooks/useChat';
import { changeUser } from '../../contexts/ChatContext';

const Chat: React.FC = () => {
  const { state, dispatch } = useChatContext();

  const hideChat = () => {
    dispatch(changeUser(null));
  };

  const props = Object.assign({}, { bgimage: BubbleBg, isshowchat: !!state.chatId });

  return (
    <MessagesContainer {...props}>
      {state.user?.uid && (
        <>
          <ChatInfo>
            <button onClick={() => hideChat()}>
              <img src={ArrowLeftSvg} alt='' />
            </button>

            <UserImg src={state.user.photoUrl} alt='' referrerPolicy='no-referrer' />
            <span>{state.user?.displayName}</span>
          </ChatInfo>
          <Messages />
        </>
      )}
    </MessagesContainer>
  );
};

export default Chat;
