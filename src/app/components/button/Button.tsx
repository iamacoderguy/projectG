import React from 'react';
import './Button.css';

type ButtonProps = {
  children: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, disabled } = props;

  return (
    <button disabled={disabled}>{children}</button>
  );
};

export default Button;