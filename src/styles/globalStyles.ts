import { Box, styled } from '@mui/material';

export const FormStyled = styled('form')`
  width: 100%;
  margin-bottom: 30px;
`;

export const RowStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;

  input[type='file'] {
    display: none;
  }

  label {
    cursor: pointer;
  }
`;

export const UserChatStyled = styled('div')<{ selected?: boolean }>`
  padding: 5px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${(props) => (props.selected ? '#9C795F' : 'rgba(92, 51, 21, 0.42)')};

  &:hover {
    background-color: #2f2d54;
  }

  > img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 19px;
      letter-spacing: 0.1em;
      color: #ffffff;
    }
  }
`;

export const UserChatInfoStyled = styled('div')`
  span {
    font-size: 18px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    color: bisque;
  }
`;

export const HeadingPageStyled = styled('h2')`
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 50px;
  letter-spacing: 0.05em;

  color: #dedede;
`;
