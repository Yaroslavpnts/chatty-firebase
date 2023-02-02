import { styled } from '@mui/material';

interface ModalProps {
  active: boolean;
}

export const ModalContainerStyled = styled('div')<ModalProps>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.active ? '1' : '0')};
  pointer-events: ${(props) => (props.active ? 'all' : 'none')};
  transition: 0.5s;

  > img {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
`;

export const ModalContentStyled = styled('div')<ModalProps>`
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(1)')};
  transform: 0.3s;
  max-height: 600px;

  img {
    max-width: 800px;
    max-height: 560px;
    object-fit: cover;
  }
`;
