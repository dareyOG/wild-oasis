import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/apiAuth';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      // remove all queries
      queryClient.removeQueries();

      navigate('/login', { replace: true });
    }
  });

  return { logOut, isLoading };
}
