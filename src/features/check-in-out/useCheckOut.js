import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: bookingId => updateBooking(bookingId, { status: 'checked-out' }),

    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully Checked in`);
      //   queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error('There was an error while checking out')
  });

  return { isCheckingOut, checkOut };
}
