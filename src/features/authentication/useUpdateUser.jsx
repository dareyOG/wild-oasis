import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser({ fullName, password, avatar }) {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: () => updateUserData({ fullName, password, avatar }),

    onSuccess: () => {
      toast.success('user updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },

    onError: err => toast.error(err.message)
  });

  return { isUpdating, update };
}
