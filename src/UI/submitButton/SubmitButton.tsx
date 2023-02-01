import React from 'react';
import { SumbitButtonStyled } from './SubmitButtos.styled';

interface SumbitButtonStyledProps {
  children: React.ReactNode;
  loading: boolean;
}

export const SubmitButton: React.FC<SumbitButtonStyledProps> = ({ children, loading }) => {
  return (
    <SumbitButtonStyled type='submit' loading={loading} disableRipple disableElevation>
      {children}
    </SumbitButtonStyled>
  );
};
