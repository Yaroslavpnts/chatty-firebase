import { Box, styled } from '@mui/material';

interface SidebarSectionProps {
  isshowchat: boolean;
  bgimage: string;
}

export const MessagesContainer = styled(Box)<SidebarSectionProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 62%;
  background: rgba(60, 36, 20, 0.38);
  background-image: url(${(props) => props.bgimage});
  background-position: 50% 50%;
  background-position: initial;
  background-size: cover;

  @media screen and (max-width: 800px) {
    display: ${(props) => (props.isshowchat ? 'flex' : 'none')};
  }
`;

export const ChatInfo = styled('div')`
  height: 105px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.31);
  display: flex;
  align-items: center;
  gap: 15px;

  span {
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.1em;

    color: #ffffff;
  }

  button {
    width: 36px;
    height: 36px;
    background-color: rgb(204, 177, 157, 0.15);
    border-radius: 50%;
    border: none;
    position: relative;
    cursor: pointer;
    display: none;

    &:hover {
      background-color: rgb(204, 177, 157, 0.25);
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      /* display: none; */
    }

    @media screen and (max-width: 800px) {
      display: inline;
    }
  }
`;

// export const ArrowLeft = styled('img')`
//   display: none;

//   @media screen and (max-width: 860px) {
//     display: inline;
//   }
// `;

export const UserImg = styled('img')`
  margin-left: 51px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;

  @media screen and (max-width: 800px) {
    margin: 0;
  }
`;
