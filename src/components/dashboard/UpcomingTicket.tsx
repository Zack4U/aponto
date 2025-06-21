import React from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Ticket } from "@/types";

interface UpcomingTicketProps {
  ticket: Ticket | null;
}

export const UpcomingTicket: React.FC<UpcomingTicketProps> = ({ ticket }) => {
  if (!ticket) {
    return (
      <Card className="bg-theme-alt border-0 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-theme flex items-center space-x-2">
            <Clock size={20} />
            <span>Próximo Vencimiento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-theme-alt">No hay tickets próximos a vencer</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "text-green-400",
      medium: "text-yellow-400",
      high: "text-orange-400",
      urgent: "text-red-400",
    };
    return colors[priority as keyof typeof colors] || "text-neutral-400";
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      low: "Baja",
      medium: "Media",
      high: "Alta",
      urgent: "Urgente",
    };
    return labels[priority as keyof typeof labels] || priority;
  };

  return (
    <Card className="bg-theme-alt border-0 rounded-3xl">
      <CardHeader>
        <CardTitle className="text-theme flex items-center space-x-2">
          <Clock size={20} />
          <span>Próximo Vencimiento</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-theme font-medium text-lg mb-2 line-clamp-2">
            {ticket.title}
          </h4>
          <p className="text-theme-alt text-sm line-clamp-2">
            {ticket.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle
              size={16}
              className={getPriorityColor(ticket.priority)}
            />
            <span
              className={`text-sm font-medium ${getPriorityColor(
                ticket.priority
              )}`}
            >
              {getPriorityLabel(ticket.priority)}
            </span>
          </div>
          <span className="text-theme-alt text-sm">#{ticket.id}</span>
        </div>

        {ticket.dueDate && (
          <div className="bg-theme-alt rounded-lg p-3">
            <p className="text-theme-alt text-sm">
              <strong>Vence:</strong> {formatDate(ticket.dueDate)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
