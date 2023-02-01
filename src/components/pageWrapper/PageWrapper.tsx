import React from 'react';
import { PageStyled, TopCircle, BotCircle } from './PageWrapper.styled';
import Logo from '../../assets/svg/logo-lg.svg';

interface PageWrapperProps {
  children: React.ReactNode | React.ReactNode[];
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <PageStyled>
      <TopCircle />
      <BotCircle />
      <div>
        <img src={Logo} alt='' />
      </div>
      {children}
    </PageStyled>
  );
};
