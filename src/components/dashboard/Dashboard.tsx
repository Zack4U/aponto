"use client";
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { mockTickets } from "@/data/mockData";
import { TicketModal } from "@/components/dashboard/TicketModal";
import {
  Check,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";

const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 6 : d.getDay() - 1; // lunes = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

// MultiSelectRadix: select multiselección con checkboxes
function MultiSelectRadix({
  options,
  value,
  onChange,
  placeholder,
  labelMap = {},
}: {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
  labelMap?: Record<string, string>;
}) {
  return (
    <Select.Root
      open={undefined}
      onOpenChange={() => {}}
      value=""
      onValueChange={() => {}}
    >
      <Select.Trigger className="border rounded px-2 py-1 text-sm flex gap-2 items-center min-w-[120px] bg-theme-alt">
        <span>
          {value.length === options.length
            ? placeholder || "Todas"
            : value.length === 0
            ? "Ninguna"
            : value.map((v) => labelMap[v] || v).join(", ")}
        </span>
        <ChevronDown size={16} />
      </Select.Trigger>
      <Select.Content
        position="popper"
        className="bg-theme-alt border rounded shadow-lg z-50"
      >
        <div className="max-h-60 overflow-y-auto p-1">
          <div
            className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-theme-light/10 rounded"
            onClick={() =>
              value.length === options.length
                ? onChange([])
                : onChange([...options])
            }
          >
            <input
              type="checkbox"
              checked={value.length === options.length}
              readOnly
              className="accent-theme-primary"
            />
            <span className="text-sm font-medium">
              {value.length === options.length
                ? "Desmarcar todas"
                : "Marcar todas"}
            </span>
          </div>
          {options.map((opt) => {
            const checked = value.includes(opt);
            return (
              <div
                key={opt}
                className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-theme-light/10 rounded select-none transition-colors"
                onClick={() => {
                  if (checked) {
                    onChange(value.filter((v) => v !== opt));
                  } else {
                    onChange([...value, opt]);
                  }
                }}
              >
                {/* Icono animado al principio */}
                <span className="w-5 h-5 flex items-center justify-center">
                  <span className="relative block w-full h-full">
                    {/* Línea base */}
                    <span
                      className={`
              absolute left-1/2 top-1/2 w-3 h-0.5 bg-theme-text rounded
              transition-all duration-200
              ${checked ? "opacity-0 scale-x-50" : "opacity-80 scale-x-100"}
              -translate-x-1/2 -translate-y-1/2
            `}
                    />
                    {/* Check animado */}
                    <span
                      className={`
              absolute left-1/2 top-1/2 transition-all duration-200
              ${checked ? "opacity-100 scale-100" : "opacity-0 scale-75"}
              -translate-x-1/2 -translate-y-1/2
            `}
                    >
                      <Check size={18} className="text-theme-primary" />
                    </span>
                  </span>
                </span>
                <span className="text-sm">{labelMap[opt] || opt}</span>
              </div>
            );
          })}
        </div>
      </Select.Content>
    </Select.Root>
  );
}

export const Dashboard: React.FC = () => {
  // Semana inicial: la actual
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));
  const [startHour, setStartHour] = useState(8);
  const [endHour, setEndHour] = useState(19);

  // Opciones para filtros (sin "all")
  const statusOptions = ["pending", "in-progress", "completed", "cancelled"];
  const priorityOptions = ["urgent", "high", "medium", "low"];
  const categoryOptions = Array.from(
    new Set(mockTickets.map((t) => t.category).filter(Boolean))
  );

  // Ticket modal state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalTicket, setModalTicket] = useState<any>(null);

  // Multi-select states
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    statusOptions.filter((s) => s !== "completed" && s !== "cancelled")
  );
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    ...priorityOptions,
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    ...categoryOptions,
  ]);

  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );

  // Cambiar semana
  const changeWeek = (offset: number) => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + offset * 7);
    setWeekStart(newStart);
  };

  // Calcular rango de la semana visible
  const weekStartDate = new Date(weekStart);
  weekStartDate.setHours(0, 0, 0, 0);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 7);

  // Fechas de la semana
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  // Mostrar completados por updatedAt si está seleccionado "completed"
  const showCompletedByUpdate = selectedStatuses.includes("completed");

  // Solo tickets de la semana visible
  const weekTickets = mockTickets.filter((ticket) => {
    let relevantDate = ticket.dueDate;
    if (
      showCompletedByUpdate &&
      ticket.status === "completed" &&
      ticket.updatedAt
    ) {
      relevantDate = ticket.updatedAt;
    }
    if (!relevantDate) return false;
    return relevantDate >= weekStartDate && relevantDate < weekEndDate;
  });

  // Aplicar filtros solo sobre los tickets de la semana
  const filteredTickets = weekTickets.filter((ticket) => {
    if (!selectedStatuses.includes(ticket.status)) return false;
    if (!selectedPriorities.includes(ticket.priority)) return false;
    if (
      categoryOptions.length > 0 &&
      !selectedCategories.includes(ticket.category)
    )
      return false;
    return true;
  });

  // Agrupar tickets por día y hora
  const ticketsByDayHour: { [key: string]: typeof mockTickets } = {};
  filteredTickets.forEach((ticket) => {
    let relevantDate = ticket.dueDate;
    if (
      showCompletedByUpdate &&
      ticket.status === "completed" &&
      ticket.updatedAt
    ) {
      relevantDate = ticket.updatedAt;
    }
    if (!relevantDate) return;
    const dayKey = relevantDate.toDateString();
    const hourKey = relevantDate.getHours();
    const key = `${dayKey}-${hourKey}`;
    if (!ticketsByDayHour[key]) ticketsByDayHour[key] = [];
    ticketsByDayHour[key].push(ticket);
  });

  const statItems = [
    {
      status: "completed",
      label: "Completados",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      status: "in-progress",
      label: "En Progreso",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      status: "pending",
      label: "Pendientes",
      icon: AlertCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      status: "cancelled",
      label: "Cancelados",
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="flex-1 m-5 min-h-0 min-w-0">
      <div className="bg-theme-alt rounded-3xl h-full p-8 flex flex-col w-full">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-theme mb-2">Dashboard</h1>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <label className="flex items-center gap-1 text-sm">
              Desde
              <input
                type="number"
                min={0}
                max={23}
                value={startHour}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (isNaN(val)) val = 0;
                  val = Math.max(0, Math.min(val, 23, endHour - 1));
                  setStartHour(val);
                  if (val >= endHour) setEndHour(Math.min(val + 1, 23));
                }}
                className="border rounded px-1 py-0.5 w-14"
              />
            </label>
            <label className="flex items-center gap-1 text-sm">
              Hasta
              <input
                type="number"
                min={0}
                max={23}
                value={endHour}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (isNaN(val)) val = startHour + 1;
                  val = Math.max(startHour + 1, Math.min(val, 23));
                  setEndHour(val);
                  if (val <= startHour) setStartHour(Math.max(val - 1, 0));
                }}
                className="border rounded px-1 py-0.5 w-14"
              />
            </label>
            <MultiSelectRadix
              options={statusOptions}
              value={selectedStatuses}
              onChange={setSelectedStatuses}
              placeholder="Estados: Todos"
              labelMap={{
                pending: "Pendiente",
                "in-progress": "En progreso",
                completed: "Completado",
                cancelled: "Cancelado",
              }}
            />
            <MultiSelectRadix
              options={priorityOptions}
              value={selectedPriorities}
              onChange={setSelectedPriorities}
              placeholder="Prioridades: Todas"
              labelMap={{
                urgent: "Urgente",
                high: "Alta",
                medium: "Media",
                low: "Baja",
              }}
            />
            <MultiSelectRadix
              options={categoryOptions}
              value={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Categorías: Todas"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-theme">
            Vista Semanal{" - "}
          </h2>
          <span className="text-theme-alt text-xl">
            <span className="text-theme-primary font-semibold uppercase">
              {weekDates[0]
                .toLocaleString("default", { month: "long" })
                .toUpperCase()}{" "}
            </span>{" "}
            {weekDates[0].getDate()} al {weekDates[6].getDate()}
            {" de "}
            <span className="text-theme-primary font-semibold uppercase">
              {weekDates[0].getFullYear()}
            </span>
          </span>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 text-theme-light rounded bg-theme-primary hover:scale-105 cursor-pointer transition-transform"
              onClick={() => changeWeek(-1)}
            >
              ←
            </button>
            <button
              className="px-2 py-1 text-theme-light rounded bg-theme-primary hover:scale-105 cursor-pointer transition-transform"
              onClick={() => changeWeek(1)}
            >
              →
            </button>
          </div>
        </div>

        {/* Grid del calendario semanal */}
        <div className="grid grid-cols-8 gap-4 flex-1 min-w-0">
          {/* Columna de horas */}
          <div className="space-y-4">
            <div className="h-12"></div>
            {hours.map((h) => (
              <div key={h} className="h-16 flex items-center">
                <span className="text-theme-alt text-sm">
                  {String(h).padStart(2, "0")}:00
                </span>
              </div>
            ))}
          </div>
          {/* Columnas de días */}
          {weekDates.map((date, dayIdx) => (
            <div key={date.toDateString()} className="min-w-0">
              <div className="h-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-theme font-medium">
                    {daysOfWeek[dayIdx]}
                  </div>
                  <div className="text-theme-alt text-sm">{date.getDate()}</div>
                </div>
              </div>
              <div>
                {hours.map((h) => {
                  const key = `${date.toDateString()}-${h}`;
                  const tickets = ticketsByDayHour[key] || [];
                  return (
                    <div key={h} className="h-16 relative mb-2">
                      {tickets.length === 0
                        ? null
                        : tickets.map((ticket) => (
                            <div
                              key={ticket.id}
                              onClick={() => setModalTicket(ticket)}
                              className={`absolute left-0 right-0 top-1 rounded-lg p-2 border flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform
                              ${
                                ticket.priority === "urgent"
                                  ? "bg-red-500/20 border-red-500/30"
                                  : ticket.priority === "high"
                                  ? "bg-orange-500/20 border-orange-500/30"
                                  : ticket.priority === "medium"
                                  ? "bg-blue-500/20 border-blue-500/30"
                                  : "bg-green-500/20 border-green-500/30"
                              }
                            `}
                            >
                              {/* Icono según status */}
                              {(() => {
                                const stat = statItems.find(
                                  (s) =>
                                    (s.label === "Completados" &&
                                      ticket.status === "completed") ||
                                    (s.label === "En Progreso" &&
                                      ticket.status === "in-progress") ||
                                    (s.label === "Pendientes" &&
                                      ticket.status === "pending") ||
                                    (s.label === "Cancelados" &&
                                      ticket.status === "cancelled")
                                );
                                if (!stat) return null;
                                const Icon = stat.icon;
                                return (
                                  <span
                                    className={`flex items-center justify-center rounded-full ${stat.bgColor} ${stat.color} w-6 h-6`}
                                    title={stat.label}
                                  >
                                    <Icon size={18} />
                                  </span>
                                );
                              })()}
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium truncate">
                                  {ticket.title}
                                </div>
                                <div className="text-xs text-theme-alt">
                                  {showCompletedByUpdate &&
                                  (ticket.status === "completed" ||
                                    ticket.status === "cancelled")
                                    ? ticket.updatedAt?.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })
                                    : ticket.dueDate?.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                </div>
                              </div>
                            </div>
                          ))}
                      {tickets.length === 0 && (
                        <div className="text-theme-alt text-xs text-center opacity-40">
                          {/* Espacio vacío */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TicketModal
        open={!!modalTicket}
        onOpenChange={(open) => !open && setModalTicket(null)}
        ticket={modalTicket}
      />
    </div>
  );
};
