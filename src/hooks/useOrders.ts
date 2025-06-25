import { filterAllOrders, getCustomerOrders, getCustomerOrdersDetails } from "@/actions/ordersAction";
import { useQuery } from "@tanstack/react-query";

export function useFetchCustomerOrders() {
    return useQuery({
        queryKey: ["customerOrders"],
        queryFn: getCustomerOrders,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useFetchCustomerOrdersDetails(id: string) {
    return useQuery({
        queryKey: ["customerOrderDetails", id],
        queryFn: () => getCustomerOrdersDetails(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}


export function useAdminFetchCustomerOrders(query?: string) {
    return useQuery({
        queryKey: ["adminFetchOrders"],
        queryFn: () => filterAllOrders(query),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}