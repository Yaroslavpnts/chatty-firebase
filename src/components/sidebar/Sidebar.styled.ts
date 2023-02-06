import { styled } from '@mui/material';

interface SidebarSectionProps {
  isShowChat: boolean;
}

export const SidebarSectionStyled = styled('section')<SidebarSectionProps>`
  height: 100%;
  width: 420px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media screen and (max-width: 800px) {
    display: ${(props) => (props.isShowChat ? 'none' : 'block')};
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const UserChatBlock = styled('div')`
  background: rgba(219, 199, 185, 0.19);
  flex-grow: 1;
`;

export const ResentChatsBlock = styled('div')`
  padding: 5px 15px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;

  letter-spacing: 0.1em;

  color: #ffffff;
`;
