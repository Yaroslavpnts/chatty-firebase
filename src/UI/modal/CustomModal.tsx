import React from 'react';
import { ModalContainerStyled, ModalContentStyled } from './CustomModal.styled';
import CloseIcon from '../../assets/svg/close-icon.svg';

interface CustomModalProps {
  active: boolean;
  handleClose: () => void;
  children: JSX.Element;
}

const CustomModal: React.FC<CustomModalProps> = ({ active, handleClose, children }) => {
  return (
    <ModalContainerStyled onClick={handleClose} active={active}>
      <ModalContentStyled onClick={(e) => e.stopPropagation()} active={active}>
        {children}
      </ModalContentStyled>
      <img src={CloseIcon} alt='' onClick={handleClose} />
    </ModalContainerStyled>
  );
};

export default CustomModal;
