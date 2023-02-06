import { styled } from '@mui/material';

export const SectionStyled = styled('section')`
  display: flex;
  padding: 10px 100px 15px;
  padding: 10px 100px 45px;
  position: relative;
  overflow-y: scroll;
  flex-direction: column;
  /* justify-content: flex-end; */
  height: 70%;
  /* height: 400px; */
  flex-grow: 1;
  /* gap: 15px; */

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    /* width: 8px !important; */
    background-color: #d9d9d9;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.33);
  }

  @media screen and (max-width: 1200px) {
    padding-left: 50px;
    padding-right: 50px;
  }
`;

export const MessagesBlockstyled = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
  /* overflow-y: scroll; */

  /* > div:last-of-type {
    margin-bottom: 25px;
  } */
`;
