import { styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const SumbitButtonStyled = styled(LoadingButton)`
  background: rgba(79, 39, 10, 0.8);
  border: 1px solid #7c5b43;
  box-shadow: 7px 6px 12px #5d381b;
  border-radius: 47px;
  padding: 10px;
  width: 240px;
  text-transform: none;

  font-family: 'Arima-Madurai';
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
  line-height: 21px;
  letter-spacing: 0.05em;

  color: #f0f0f0;

  &:hover {
    box-shadow: 7px 6px 12px #5d381b;
    background: #4f270a;
  }

  &:active {
    box-shadow: inset -10px -9px 15px #886a54;
    background: #4f270a;
  }

  &.loadingIndicator {
    color: white;
    background-color: white;
  }

  .MuiCircularProgress-root.MuiCircularProgress-indeterminate.MuiCircularProgress-colorInherit.MuiCircularProgress-root {
    width: 25px !important;
    height: 25px !important;

    .MuiCircularProgress-svg {
      color: white;
    }
  }

  @media screen and (max-width: 1000px) {
    padding: 5px;
    font-size: 18px;
    line-height: 20px;
  }

  @media screen and (max-width: 768px) {
    width: 140px;
  }
`;
