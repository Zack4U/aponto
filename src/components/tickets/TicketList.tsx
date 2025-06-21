import React, { useState } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Ticket } from "@/types";
import { mockTickets } from "@/data/mockData";

export const TicketList: React.FC = () => {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-neutral-500/20 text-neutral-400"
    );
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: "Pendiente",
      "in-progress": "En Progreso",
      completed: "Completado",
      cancelled: "Cancelado",
    };
    return labels[status as keyof typeof labels] || status;
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Lista de Tickets
          </h1>
          <p className="text-neutral-400">
            Gestiona todos los tickets del sistema
          </p>
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
          <Plus size={20} className="mr-2" />
          Nuevo Ticket
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="bg-neutral-800 border-0 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                placeholder="Buscar tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="in-progress">En Progreso</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
            <Button
              variant="outline"
              className="border-neutral-600 text-neutral-300 hover:bg-neutral-700"
            >
              <Filter size={20} className="mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de tickets */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="bg-neutral-800 border-0 rounded-2xl hover:bg-neutral-750 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {ticket.title}
                      </h3>
                      <p className="text-neutral-400 text-sm line-clamp-2">
                        {ticket.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-white"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {getStatusLabel(ticket.status)}
                      </span>
                      <span
                        className={`text-sm font-medium ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        Prioridad:{" "}
                        {ticket.priority.charAt(0).toUpperCase() +
                          ticket.priority.slice(1)}
                      </span>
                      <span className="text-neutral-400 text-sm">
                        #{ticket.id}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-neutral-400 text-sm">
                        Creado: {formatDate(ticket.createdAt)}
                      </div>
                      {ticket.dueDate && (
                        <div className="text-neutral-400 text-sm">
                          Vence: {formatDate(ticket.dueDate)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-700">
                    <div className="flex items-center space-x-4">
                      <span className="text-neutral-400 text-sm">
                        Creado por:{" "}
                        <span className="text-white">
                          {ticket.createdBy.name}
                        </span>
                      </span>
                      {ticket.assignedTo && (
                        <span className="text-neutral-400 text-sm">
                          Asignado a:{" "}
                          <span className="text-white">
                            {ticket.assignedTo.name}
                          </span>
                        </span>
                      )}
                    </div>
                    <span className="px-2 py-1 bg-neutral-700 rounded text-neutral-300 text-xs">
                      {ticket.category}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card className="bg-neutral-800 border-0 rounded-2xl">
          <CardContent className="p-12 text-center">
            <div className="text-neutral-400 text-lg mb-2">
              No se encontraron tickets
            </div>
            <p className="text-neutral-500">
              Intenta ajustar los filtros de búsqueda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
