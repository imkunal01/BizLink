import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  gradient?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  gradient = "from-blue-50 to-purple-50",
}: StatCardProps) {
  return (
    <div
      className="relative bg-white rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {/* Background Gradient Accent */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-30 -mr-16 -mt-16`}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <p className="text-muted-foreground text-sm">{title}</p>
          <div className="space-y-1">
            <h2 className="text-4xl">{value}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {trend && (
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                trend.isPositive
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white to-gray-50"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Icon className="w-7 h-7 text-gray-700" />
        </div>
      </div>
    </div>
  );
}
