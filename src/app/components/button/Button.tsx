import React from 'react';
import './Button.css';

type ButtonProps = {
  children: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children } = props;

  return (
    <button>{children}</button>
  );
};

export default Button;