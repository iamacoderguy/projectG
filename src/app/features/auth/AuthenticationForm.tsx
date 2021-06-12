import React, { useState } from 'react';
import Button from 'src/app/components/button/Button';
import Input from 'src/app/components/input/Input';
import './AuthenticationForm.css';
import * as Yup from 'yup';

type AuthenticationFormProps = {
  onLogin: () => void;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = (props) => {
  const {
    onLogin,
  } = props;

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailTouched, setEmailTouched ] = useState(false);
  const [ passwordTouched, setPasswordTouched ] = useState(false);
  const [ isEmailError, setIsEmailError ] = useState(false);
  const [ isPasswordError, setIsPasswordError ] = useState(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isEmailValid(email) && isPasswordValid(password)) {
      // Do login procedure
      onLogin();
    }
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (!emailTouched || isEmailValid(newValue)) {
      setIsEmailError(false);
    } else {
      setIsEmailError(true);
    }

    setEmail(newValue);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (!passwordTouched || isPasswordValid(newValue)) {
      setIsPasswordError(false);
    } else {
      setIsPasswordError(true);
    }

    setPassword(newValue);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const isEmailValid = (value: string) => (value !== '' && Yup.string().email().isValidSync(value));
  const isPasswordValid = (value: string) => value !== '';

  return (
    <form action='' className='form' id='form' onSubmit={handleFormSubmit}>
      <Input
        type='email'
        placeholder='email'
        id='email'
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        isError={isEmailError}
      />
      <Input 
        type='password'
        placeholder='password'
        id='password'
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        isError={isPasswordError}
      />
      <Button disabled={!isEmailValid(email) || !isPasswordValid(password)}>Login / Register</Button>
    </form>
  );
};

export default AuthenticationForm;