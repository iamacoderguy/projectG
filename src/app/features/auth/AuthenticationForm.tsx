import React from 'react';
import Button from 'src/app/components/button/Button';
import Input from 'src/app/components/input/Input';

type AuthenticationFormProps = {
  onLogin: () => void;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = (props) => {
  const handleFormSubmit = () => {
    
  };

  return (
    <form action="" className="form" id="form" onSubmit={handleFormSubmit}>
      <Input type='email' placeholder='email' id='email' isError errorMsg={'error message'}/>
      <Input type='password' placeholder='password' id='password' />
      <Button>Login / Register</Button>
    </form>
  );
};

export default AuthenticationForm;