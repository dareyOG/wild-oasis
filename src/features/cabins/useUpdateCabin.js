import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createUpdateCabin(newCabin, id),

    onSuccess: () => {
      toast.success('cabin updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },

    onError: error => toast.error(error.message)
  });
  return { isUpdating, updateCabin };
}
