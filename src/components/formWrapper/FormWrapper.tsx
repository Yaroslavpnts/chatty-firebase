import * as React from 'react';
import { BoxStyled } from './FormWrapper.styled';

interface WrapperProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <BoxStyled component='div' maxWidth='386px'>
    {children}
  </BoxStyled>
);
