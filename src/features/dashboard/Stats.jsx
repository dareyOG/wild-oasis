import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar
} from 'react-icons/hi2';

function Stats({ recentBookings, confirmedRecentStays, numDays, cabins }) {
  const totalBookings = recentBookings?.length;

  const totalSales = recentBookings?.reduce((acc, currBooking) => acc + currBooking.totalPrice, 0);

  const totalCheckIns = confirmedRecentStays?.length;

  const availableNights = cabins?.length * numDays;

  const occupancyRate = ((totalCheckIns / availableNights) * 100).toFixed(2) + '%';

  return (
    <>
      <Stat title={'Bookings'} color={'blue'} icon={<HiOutlineBriefcase />} value={totalBookings} />
      <Stat
        title={'Sales'}
        color={'green'}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title={'Check ins'}
        color={'indigo'}
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title={'Occupancy rate'}
        color={'yellow'}
        icon={<HiOutlineChartBar />}
        value={occupancyRate}
      />
    </>
  );
}

export default Stats;
