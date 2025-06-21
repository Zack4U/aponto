import React from "react";
import { UserCard } from "@/components/layouts/UserCard";
import { UpcomingTicket } from "@/components/dashboard/UpcomingTicket";
import { TicketList } from "@/components/tickets/TicketList";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
  currentUser,
  getUpcomingTicket,
  mockNotifications,
} from "@/data/mockData";
import { Clock, Bell } from "lucide-react";

export const TicketsSection: React.FC = () => {
  const upcomingTicket = getUpcomingTicket();
  const recentNotifications = mockNotifications.slice(0, 3);

  return (
    <div className="flex-1 flex">
      {/* Sección de información lateral */}
      <div className="w-80 p-6 space-y-6">
        <UserCard user={currentUser} />

        {/* Historial de últimas actualizaciones */}
        <Card className="bg-neutral-800 border-0 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Clock size={20} />
              <span>Últimas Actualizaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm font-medium">
                    Ticket #4 completado
                  </p>
                  <p className="text-neutral-400 text-xs">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm font-medium">
                    Ticket #2 en progreso
                  </p>
                  <p className="text-neutral-400 text-xs">Hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm font-medium">
                    Nuevo ticket creado
                  </p>
                  <p className="text-neutral-400 text-xs">Hace 6 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <UpcomingTicket ticket={upcomingTicket} />

        {/* Notificaciones */}
        <Card className="bg-neutral-800 border-0 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Bell size={20} />
              <span>Notificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === "warning"
                      ? "bg-yellow-400"
                      : notification.type === "success"
                      ? "bg-green-400"
                      : notification.type === "error"
                      ? "bg-red-400"
                      : "bg-blue-400"
                  }`}
                ></div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {notification.title}
                  </p>
                  <p className="text-neutral-400 text-xs">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sección principal - Lista de tickets */}
      <div className="flex-1 p-6">
        <div className="bg-neutral-800 rounded-3xl h-full p-8">
          <TicketList />
        </div>
      </div>
    </div>
  );
};
