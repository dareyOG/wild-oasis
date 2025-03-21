import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogin({ email, password }) {
  const navigate = useNavigate();

  const { mutate: logIn, isLoading: isLogging } = useMutation({
    mutationFn: () => login({ email, password }),

    onSuccess: user => {
      console.log(user);

      toast.success('Logged In');
      navigate('/dashboard');
    },

    onError: err => {
      // console.log('Error👎', err);
      toast.error('Provided email or password is invalid');
    }
  });

  return { logIn, isLogging };
}
