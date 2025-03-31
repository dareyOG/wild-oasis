import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../services/apiBookings"

export function useTodayActivity() {
    const { isLoading, data: todayActivities
    } = useQuery({ queryKey: ['Today activity'], queryFn: getStaysTodayActivity });

    return { isLoading, todayActivities }
}

