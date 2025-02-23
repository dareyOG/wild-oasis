import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createUpdateCabin,

    onSuccess: () => {
      toast.success('New cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },

    onError: error => toast.error(error.message)
  });

  return { isCreating, createCabin };
}
