import React from 'react';
import Chats from './userChats/userChats';
import Navbar from './navbar/Navbar';
import Search from './search/Search';
import { ResentChatsBlock, SectionStyled, UserChatBlock } from './Sidebar.styled';

const Sidebar: React.FC = () => {
  return (
    <SectionStyled>
      <Navbar />
      <UserChatBlock>
        <Search />
        <ResentChatsBlock>Resent chats</ResentChatsBlock>
        <Chats />
      </UserChatBlock>
    </SectionStyled>
  );
};

export default Sidebar;
