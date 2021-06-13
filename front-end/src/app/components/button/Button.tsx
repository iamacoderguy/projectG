import React, { MouseEventHandler } from 'react';
import './Button.css';

type ButtonProps = {
  children: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <button {...otherProps}>{children}</button>
  );
};

export default Button;