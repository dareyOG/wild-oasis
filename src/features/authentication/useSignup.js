import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signup,

    onSuccess: user => {
      console.log(user);
      toast.success('Account successfully created; kindly verify your account with the link sent to your mail.');
    }
  });

  return { signUp, isLoading };
}
