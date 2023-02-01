import { Box, styled } from '@mui/material';

export const MessagesContainer = styled(Box)<{ bgimage: string }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 65%;
  background: rgba(60, 36, 20, 0.38);
  background-image: url(${(props) => props.bgimage});
  background-position: 50% 50%;
  background-position: initial;
  background-size: cover;
`;

export const ChatInfo = styled('div')`
  height: 105px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.31);
  display: flex;
  align-items: center;
  gap: 15px;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  span {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.1em;

    color: #ffffff;
  }
`;
