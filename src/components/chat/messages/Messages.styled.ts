import { styled } from '@mui/material';

export const SectionStyled = styled('section')`
  display: flex;
  padding: 10px 100px;
  position: relative;
  overflow-y: scroll;
  flex-direction: column;
  height: 60vh;
  flex-grow: 1;
  /* gap: 15px; */

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    width: 8px !important;
    background-color: #d9d9d9;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.33);
  }
`;

export const MessagesBlockstyled = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
