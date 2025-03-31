import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingRecentBookings, recentBookings } = useRecentBookings();
  const { isLoading: isLoadingRecentStays, confirmedRecentStays, numDays } = useRecentStays();
  const { isLoading: isLoadingCabins, cabins } = useCabins();

  if (isLoadingRecentBookings || isLoadingRecentStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedRecentStays={confirmedRecentStays}
        numDays={numDays}
        cabins={cabins}
      />

      <TodayActivity />

      <DurationChart confirmedRecentStays={confirmedRecentStays} />

      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
