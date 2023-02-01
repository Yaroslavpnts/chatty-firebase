import { styled } from '@mui/material';

type LabelProps = {
  order: number;
};

export const ChooseImageStyled = styled('img')`
  border-radius: 50%;
`;

export const LabelStyled = styled('label')<LabelProps>`
  order: ${(props) => props.order};
`;
