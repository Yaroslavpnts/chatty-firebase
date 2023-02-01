import { styled } from '@mui/material';

export const NavbarStyled = styled('div')`
  display: flex;
  align-items: center;
  height: 105px;
  padding: 10px;
  justify-content: space-between;

  > img {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export const UserSectionStyled = styled('div')`
  display: flex;
  gap: 10px;
  align-items: center;

  > span:last-of-type {
    cursor: pointer;

    @media screen and (max-width: 768px) {
      position: absolute;
      bottom: 10px;
    }
  }
`;

export const ProfileImg = styled('img')`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
`;
