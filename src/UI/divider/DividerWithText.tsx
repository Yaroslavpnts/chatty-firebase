import React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { StackContainer, DividerStyled } from './DividerWithText.styled';

interface DividerProps {
  children: React.ReactNode;
}

export const DividerWithText: React.FC<DividerProps> = ({ children }) => {
  return (
    <StackContainer direction='row' justifyContent='center' alignItems='center' spacing={2}>
      <DividerStyled />
      <Typography>{children}</Typography>
      <DividerStyled />
    </StackContainer>
  );
};
