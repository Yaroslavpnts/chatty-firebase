import { styled } from '@mui/material';

export const SearchStyled = styled('div')`
  width: 100%;
  border-bottom: 1px solid gray;
`;

export const SearchFormStyled = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: 0.1em;
    color: #eddfd5;
  }
`;
