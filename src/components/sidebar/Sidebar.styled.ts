import { styled } from '@mui/material';

export const SectionStyled = styled('section')`
  height: 100%;
  width: 420px;
  /* border-right: 1px solid black; */
  display: flex;
  flex-direction: column;
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
