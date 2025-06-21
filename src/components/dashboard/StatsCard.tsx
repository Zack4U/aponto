import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TicketStats } from "@/types";
import {
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface StatsCardProps {
  stats: TicketStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const statItems = [
    {
      label: "Completados",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "En Progreso",
      value: stats.inProgress,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Pendientes",
      value: stats.pending,
      icon: AlertCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Cancelados",
      value: stats.cancelled,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <Card className="bg-theme-alt border-0 rounded-3xl">
      <CardHeader>
        <CardTitle className="text-theme flex items-center space-x-2">
          <BarChart3 size={20} />
          <span>Estadísticas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-theme mb-1">
            {stats.total}
          </div>
          <div className="text-theme-alt text-sm">Total de tickets</div>
        </div>

        <div className="space-y-3">
          {statItems.map((item) => {
            const Icon = item.icon;
            const percentage =
              stats.total > 0 ? (item.value / stats.total) * 100 : 0;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <Icon size={16} className={item.color} />
                  </div>
                  <div>
                    <div className="text-theme font-medium">{item.value}</div>
                    <div className="text-theme-alt text-sm">{item.label}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${item.color}`}>
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
