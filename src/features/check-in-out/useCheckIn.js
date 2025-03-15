import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true
      }),

    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully Checked in`);
      //   queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ active: true });

      //   navigate to dashboard
      navigate('/');
    },

    onError: () => toast.error('There was an error while checking in')
  });

  return { isCheckingIn, checkIn };
}
