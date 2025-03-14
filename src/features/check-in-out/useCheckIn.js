import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

export function useCheckIn() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast
      }),

    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully Checked in`);
      //   queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error('There was an error while checking in')
  });

  return { isCheckingIn, checkIn };
}
