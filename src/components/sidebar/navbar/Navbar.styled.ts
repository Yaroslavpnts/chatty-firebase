import { styled } from '@mui/material';

export const NavbarStyled = styled('div')`
  display: flex;
  align-items: center;
  height: 105px;
  padding: 10px;
  justify-content: space-between;

  > img {
    @media screen and (max-width: 300px) {
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
  }
`;

export const ProfileImg = styled('img')`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
`;
