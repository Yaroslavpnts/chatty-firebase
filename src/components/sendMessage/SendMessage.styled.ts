import { styled } from '@mui/material';

export const ChatFormContainerStyled = styled('div')`
  padding: 24px 100px;
  background: rgba(0, 0, 0, 0.31);
`;

export const ChatFormStyled = styled('form')`
  display: flex;
  width: 100%;
  height: 50px;
  gap: 10px;

  label {
    width: 50px;
    height: 50px;
    background-color: azure;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const ButtonStyled = styled('button')`
  padding: 10px 15px;
  background: grey;
  font-size: 18px;
  border: none;
  color: #664023;
  background-color: azure;
  border-radius: 5px;
  cursor: pointer;
`;

export const TextareaMessageStyled = styled('textarea')`
  padding: 8px 10px;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.1em;
  color: #5c3315;
  outline: none;
  border: none;
  background-color: azure;
  border-radius: 5px 5px 0 5px;
  color: black;
  width: 500px;
  cursor: inherit;
  resize: none;

  &::placeholder {
    color: #b48461;
  }
`;

export const InputFileStyled = styled('input')`
  display: none;
`;
