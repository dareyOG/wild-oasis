import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();

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
    queryKey: ['bookings', filter, sortBy, page + 1],
    queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
  });

  // pre-fetch data
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });

  return { bookings, count, isLoading, error };
}
