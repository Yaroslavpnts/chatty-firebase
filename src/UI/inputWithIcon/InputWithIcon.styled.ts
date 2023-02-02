import { styled } from '@mui/material';

export const InputStyledContainer = styled('div')`
  width: 100%;
  position: relative;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #fafafa inset;
    box-shadow: 0 0 0px 1000px #fafafa inset;
    color: #5f3a1e;
  }

  input:-webkit-autofill::first-line {
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    color: #5f3a1e;
  }

  input {
    padding: 8px 50px 8px 10px;
    width: 100%;
    /* height: 35px; */

    background: #fafafa;
    color: #5f3a1e;
    border: 1px solid #329082;
    border-radius: 5px;

    font-family: 'Arima-Madurai';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.05em;
    outline: none;

    &::placeholder {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      letter-spacing: 0.05em;
      color: rgba(0, 0, 0, 0.38);
    }

    @media screen and (max-width: 1000px) {
      padding: 5px 50px 5px 10px;
      font-size: 16px;
      line-height: 18px;
    }
  }

  img {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
