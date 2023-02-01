import React from 'react';
import Chat from '../../components/chat/Chat';
import { ChatContainerStyled, MainPageContainer } from './MainPage.styled';
import ChatHeading from '../../components/sidebar/Sidebar';

const Mainpage: React.FC = () => {
  return (
    <MainPageContainer>
      <ChatContainerStyled>
        <ChatHeading />
        <Chat />
      </ChatContainerStyled>
    </MainPageContainer>
  );
};

export default Mainpage;
