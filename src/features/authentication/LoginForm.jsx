import { useState } from 'react';
import { useLogin } from './useLogin';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const [email, setEmail] = useState('damilare@instance.com');
  const [password, setPassword] = useState('password');

  const { logIn, isLogging } = useLogin({ email, password });

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    logIn(
      { email, password },

      // clear log in details
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        }
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLogging}
          onChange={e => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLogging}
          onChange={e => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogging}>
          {isLogging ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
