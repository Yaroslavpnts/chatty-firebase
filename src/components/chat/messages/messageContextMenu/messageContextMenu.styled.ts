import { styled } from '@mui/material';
import { Coords } from './MessageContextMenu';

interface ContextMenuStyledProps {
  coords: Coords;
}

export const ContextMenuStyled = styled('div')<ContextMenuStyledProps>`
  width: 100px;
  /* height: 26px; */
  padding: 10px;
  margin-top: 5px;
  border-radius: 7px;
  background-color: rgba(207, 208, 197, 0.9);
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: ${(props) => props.coords.pageY - 10}px;
  left: ${(props) => props.coords.pageX - 10}px;

  opacity: 0;
  transition: all 0.15s;

  z-index: 100;

  &:hover {
    opacity: 1;
    /* transition: all 1; */
  }

  /* width: 50px;
  height: 26px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  border-radius: 7px; */
`;
