import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';

export function useCabins() {
  const [bookingId] = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(bookingId),
    retry: false // prevent booking data from getting re-fetched in cases it doesn't exist
  });

  return { booking, isLoading };
}
