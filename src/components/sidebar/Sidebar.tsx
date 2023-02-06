import React, { useContext } from 'react';
import Chats from './userChats/userChats';
import Navbar from './navbar/Navbar';
import Search from './search/Search';
import { ResentChatsBlock, SidebarSectionStyled, UserChatBlock } from './Sidebar.styled';
import { useChatContext } from '../../hooks/useChat';

const Sidebar: React.FC = () => {
  const { state } = useChatContext();

  return (
    <SidebarSectionStyled isShowChat={!!state.chatId}>
      <Navbar />
      <UserChatBlock>
        <Search />
        <ResentChatsBlock>Resent chats</ResentChatsBlock>
        <Chats />
      </UserChatBlock>
    </SidebarSectionStyled>
  );
};

export default Sidebar;
