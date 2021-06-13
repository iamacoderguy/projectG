import React, { useContext, useState } from 'react';
import Button from 'src/app/components/button/Button';
import Input from 'src/app/components/input/Input';
import './AuthenticationForm.css';
import * as Yup from 'yup';
import { GlobalContext } from 'src/app/context/GlobalState';

const AuthenticationForm: React.FC = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailTouched, setEmailTouched ] = useState(false);
  const [ passwordTouched, setPasswordTouched ] = useState(false);
  const [ isEmailError, setIsEmailError ] = useState(false);
  const [ isPasswordError, setIsPasswordError ] = useState(false);

  const { loggedIn } = useContext(GlobalContext);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isEmailValid(email) && isPasswordValid(password)) {
      fetch(`${process.env.REACT_APP_HOST}/api/auth/login-or-register`, {
        method: 'POST',
        headers: new Headers({ 
          'content-type': 'application/json',
        }),
        mode: 'cors',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(async (res: Response) => {
          if (res.status === 401) {
            throw(await res.text());
          }
          
          const token = await res.text();
          loggedIn(token, email);
        })
        .catch((err) => {
          alert(err);
        });
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
    <form action='' className='authForm' id='authForm' onSubmit={handleFormSubmit}>
      <Input
        type='email'
        placeholder='Email'
        id='email'
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        isError={isEmailError}
      />
      <Input 
        type='password'
        placeholder='Password'
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