import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getStaysAfterDate } from "../../services/apiBookings"
import { subDays } from "date-fns";

export function useRecentStays() {
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));

    const queryDate = subDays(new Date(), numDays).toISOString()

    const { data: recentStays, isLoading } = useQuery({ queryKey: ['Recent stays', `last ${numDays}`], queryFn: () => getStaysAfterDate(queryDate) })

    const confirmedRecentStays = recentStays?.filter(recentStay => recentStay.status !== 'unconfirmed')

    return { isLoading, recentStays, confirmedRecentStays, numDays }
}
