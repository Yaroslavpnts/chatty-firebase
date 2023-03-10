import { styled } from '@mui/material';

export const ChatFormContainerStyled = styled('div')`
  padding: 24px 120px 0px;

  @media screen and (max-width: 1550px) {
    padding: 24px 85px 0px;
  }
  @media screen and (max-width: 1350px) {
    padding: 24px 30px 0px;
  }

  @media screen and (max-width: 1150px) {
    padding: 24px 0px 0px;
  }
`;

export const ChatFormStyled = styled('form')`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: flex-end;

  > div:first-of-type {
    position: relative;
    display: flex;
    width: 100%;
  }

  label {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

export const ButtonStyled = styled('button')`
  padding: 10px 15px;
  height: 50px;
  background: grey;
  font-size: 18px;
  border: none;
  color: #664023;
  background-color: azure;
  border-radius: 5px;
  cursor: pointer;
`;

export const TextareaMessageStyled = styled('textarea')`
  padding: 8px 45px 8px 10px;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.1em;
  color: #5c3315;
  outline: none;
  border: none;
  background-color: azure;
  border-radius: 5px 5px 5px 5px;
  color: black;
  width: 100%;
  height: 50px;
  cursor: inherit;
  resize: none;

  &::placeholder {
    color: #b48461;
  }

  &:is(:focus) {
    border: 1px solid black;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  /* &::-webkit-scrollbar {
    width: 0px;
  } */
`;

export const InputFileStyled = styled('input')`
  display: none;
`;

export const SendImageModalStyled = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 7px;

  > div {
    display: flex;
    gap: 10px;
    justify-content: space-between;

    input {
      border: none;
      outline: none;
    }

    button {
      background: rgb(136, 106, 84);
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
`;
