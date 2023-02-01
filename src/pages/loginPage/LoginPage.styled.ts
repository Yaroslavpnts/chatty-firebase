import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const LinkStyled = styled(Link)`
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  text-decoration-line: underline;
  margin-top: 10px;
  color: #faefe7;
`;

export const SignUpButton = styled('button')`
  font-family: 'Arima-Madurai';
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
  line-height: 21px;
  letter-spacing: 0.05em;
  height: 40px;

  color: #ffffff;

  border: 1px solid #5f391d;

  background: rgba(197, 162, 137, 0.38);
  border: 1px solid #5e381c;
  box-shadow: 3px 5px 11px #957359;
  border-radius: 47px;
  padding: 10px;
  width: 155px;
  cursor: pointer;

  &:hover {
    box-shadow: 7px 6px 12px #5d381b;
    background: rgba(131, 88, 56, 0.38);
  }

  &:active {
    box-shadow: inset -10px -9px 15px #886a54;
  }
`;
