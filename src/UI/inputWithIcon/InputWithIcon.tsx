import React from 'react';
import { InputStyledContainer } from './InputWithIcon.styled';

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ children, ...props }) => {
  return (
    <InputStyledContainer>
      <input {...props} />
      {children}
    </InputStyledContainer>
  );
};

export default InputWithIcon;
