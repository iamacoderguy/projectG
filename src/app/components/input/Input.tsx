import React from 'react';
import './Input.css';

type InputProps = {
  isError?: boolean;
  errorMsg?: string;
  type: string;
  placeholder: string;
  id: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { 
    isError,
    errorMsg,
    type,
    placeholder,
    id,
  } = props;
  const className = isError ? 'form-control error' : 'form-control';

  return (
    <div className={className}>
      <input type={type} placeholder={placeholder} id={id}/>
      {isError && errorMsg && errorMsg !== '' && <small>{errorMsg}</small>}
    </div>
  );
};

export default Input;