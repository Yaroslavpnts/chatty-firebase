import React, { useContext } from 'react';
import { changeUser, ChatContext, ChatContextType } from '../../../contexts/ChatContext';
import { useAuth } from '../../../hooks/useAuth';
import { NavbarStyled, ProfileImg, UserSectionStyled } from './Navbar.styled';
import LogoNavbar from '../../../assets/svg/logo-sm.svg';
import Logout from '../../../assets/svg/logout.svg';

const Navbar = () => {
  const { logout, currentUser } = useAuth();

  const { dispatch } = useContext(ChatContext) as ChatContextType;

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
