export type DashboardStats = {
    totalRevenue: string;
    totalProducts: number;
    totalPendingOrders: number;
    totalCustomers: number;
    totalTransaction: number;
};

export type DashboardStatsResponse = {
    status: boolean;
    data: DashboardStats;
};
