import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Clock } from "lucide-react";
import { mockNotifications } from "@/data/mockData";

// Colores según el tipo de notificación
const typeColor: Record<string, string> = {
  success: "bg-green-400",
  info: "bg-blue-400",
  warning: "bg-yellow-400",
  error: "bg-red-400",
};

function timeAgo(date: Date) {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `Hace ${diff} seg.`;
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min.`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`;
  return `Hace ${Math.floor(diff / 86400)} días`;
}

export const LastUpdates: React.FC = () => {
  return (
    <div>
      <Card className="bg-theme-alt border-0 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-theme flex items-center space-x-2">
            <Clock size={20} />
            <span>Últimas Actualizaciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            {mockNotifications
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .slice(0, 5)
              .map((notif) => (
                <div key={notif.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      typeColor[notif.type] || "bg-gray-400"
                    }`}
                  ></div>
                  <div>
                    <p className="text-theme text-sm font-medium">
                      {notif.title}
                    </p>

                    <p className="text-theme text-xs">
                      {timeAgo(new Date(notif.createdAt))}
                    </p>
                  </div>
                  <div className="mt-2  ml-auto">
                    <p className="text-theme-alt text-xs">#{notif.ticketId}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
