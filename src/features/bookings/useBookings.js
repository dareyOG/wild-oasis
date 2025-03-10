import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const [searchparams] = useSearchParams();

  //  server-side filtering
  const filterValue = searchparams.get('status');
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

  /*   const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'gte' }; */

  const {
    data: bookings,
    isLoading,
    error
  } = useQuery({ queryKey: ['bookings', filter], queryFn: () => getBookings({ filter }) });

  return { bookings, isLoading, error };
}
