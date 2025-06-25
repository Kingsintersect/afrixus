import { Badge } from '@/components/ui/badge';
import { OrderDetails } from '@/schemas/order-schema';

interface OrderStatusBadgeProps {
    status: OrderDetails['status'];
}

const statusConfig: Record<OrderDetails['status'], { label: string; variant: string; className: string }> = {
    PENDING: {
        label: 'PENDING',
        variant: 'secondary',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    PROCESSING: {
        label: 'PROCESSING',
        variant: 'default',
        className: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    SHIPPED: {
        label: 'SHIPPED',
        variant: 'default',
        className: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    DELIVERED: {
        label: 'DELIVERED',
        variant: 'default',
        className: 'bg-green-100 text-green-800 border-green-200'
    },
    DECLINED: {
        label: 'DECLINED',
        variant: 'destructive',
        className: 'bg-red-100 text-red-800 border-red-200'
    },
    REFUNDED: {
        label: 'REFUNDED',
        variant: 'destructive',
        className: 'bg-red-200 text-red-900 border-red-300'
    }
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <Badge className={config.className}>
            {config.label}
        </Badge>
    );
}