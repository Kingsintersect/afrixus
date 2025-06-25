import { apiCall } from "@/lib/api.utils";
import { DashboardStats, DashboardStatsResponse } from "@/types/dashboard-types";
import { auth } from "./auth";

export const fetchDashboardStatistics = async (): Promise<DashboardStats | null> => {
    const session = await auth();
    const res = await apiCall<undefined, DashboardStatsResponse>({
        url: `/reports`,
        method: "GET",
        accessToken: session?.user.access_token,
    });

    return (res?.data) ? res?.data : null;
};