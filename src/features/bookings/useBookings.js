import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();

  //  server-side filtering
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

  /*   const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'gte' }; */

  // server-side sorting
  const sort = searchParams.get('sortBy') || 'startDate-desc';
  const [field, order] = sort.split('-');
  // console.log(field, order);
  const sortBy = { field, order };

  // pagination
  const page = searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { data: bookings, count } = {}, // default value when data is undefined
    isLoading,
    error
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  return { bookings, count, isLoading, error };
}
