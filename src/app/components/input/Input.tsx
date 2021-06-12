import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import './Input.css';

type InputProps = {
  isError?: boolean;
  type: string;
  placeholder: string;
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = (props) => {
  const { 
    isError,
    ...otherProps
  } = props;
  const className = isError ? 'form-control error' : 'form-control';


  return (
    <div className={className}>
      <input {...otherProps} />
    </div>
  );
};

export default Input;