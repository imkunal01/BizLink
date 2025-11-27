import { Badge } from "./ui/badge";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

interface StatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
  processing: {
    label: "Processing",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  shipped: {
    label: "Shipped",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  refunded: {
    label: "Refunded",
    className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <Badge className={`${config.className} ${sizeClasses[size]} rounded-full`}>
      {config.label}
    </Badge>
  );
}
