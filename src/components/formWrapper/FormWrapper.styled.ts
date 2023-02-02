import { Box, styled } from '@mui/material';

export const BoxStyled = styled(Box)`
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
  max-width: 386px;

  @media screen and (max-width: 768px) {
    max-width: 250px;
  }
`;
