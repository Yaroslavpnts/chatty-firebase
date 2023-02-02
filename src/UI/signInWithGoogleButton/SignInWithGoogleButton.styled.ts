import { styled } from '@mui/material';

export const SignInContainer = styled('div')`
  position: relative;
  display: flex;
  justify-content: end;
  border-radius: 47px;
  background: #f8f8f8;
  cursor: pointer;
  padding-right: 20px;

  img {
    position: absolute;
    left: 3px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const SignInBtnStyled = styled('button')`
  padding: 7px;
  background: #f8f8f8;
  border-radius: 47px;
  outline: none;
  border: none;
  cursor: pointer;

  font-family: 'Arima-Madurai';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 22px;
  letter-spacing: 0.05em;

  color: #5f391d;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 18px;
  }
`;
