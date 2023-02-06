import React from 'react';
import { changeUser } from '../../../contexts/ChatContext';
import { useAuth } from '../../../hooks/useAuth';
import { NavbarStyled, ProfileImg, UserSectionStyled } from './Navbar.styled';
import LogoNavbar from '../../../assets/svg/logo-sm.svg';
import Logout from '../../../assets/svg/logout.svg';
import { useChatContext } from '../../../hooks/useChat';

const Navbar = () => {
  const { logout, currentUser } = useAuth();

  const { dispatch } = useChatContext();

  const handleLogout = async () => {
    await logout();
    dispatch(changeUser(null));
  };

  return (
    <NavbarStyled>
      <img src={LogoNavbar} alt='' />
      <UserSectionStyled>
        <ProfileImg src={currentUser?.photoURL || undefined} alt='' referrerPolicy='no-referrer' />
        <span>{currentUser?.displayName}</span>
        <span onClick={handleLogout}>
          <img src={Logout} alt='' />
        </span>
      </UserSectionStyled>
    </NavbarStyled>
  );
};

export default Navbar;
