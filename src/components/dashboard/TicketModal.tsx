import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  User,
  Calendar,
  Tag,
  Flag,
} from "lucide-react";
import { Ticket } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statusIcons: Record<string, any> = {
  completed: CheckCircle,
  "in-progress": Clock,
  pending: AlertCircle,
  cancelled: XCircle,
};

const statusColors: Record<string, string> = {
  completed: "text-green-500",
  "in-progress": "text-blue-500",
  pending: "text-yellow-500",
  cancelled: "text-red-500",
};

const priorityColors: Record<string, string> = {
  urgent: "bg-red-500/20 border-red-500/30",
  high: "bg-orange-500/20 border-orange-500/30",
  medium: "bg-blue-500/20 border-blue-500/30",
  low: "bg-green-500/20 border-green-500/30",
};

export interface TicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  open,
  onOpenChange,
  ticket,
}) => {
  if (!ticket) return null;
  const StatusIcon = statusIcons[ticket.status] || AlertCircle;
  const statusColor = statusColors[ticket.status] || "text-theme";
  const priorityBg = priorityColors[ticket.priority] || "bg-theme-alt";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50 animate-fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-theme-alt p-6 shadow-2xl border border-theme-light animate-fade-in"
          style={{ outline: "none" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full p-1 bg-theme-light/20 ${statusColor}`}
                title={ticket.status}
              >
                <StatusIcon size={22} />
              </span>
              <span className="text-lg font-semibold text-theme">
                {ticket.title}
              </span>
            </div>
            <Dialog.Close asChild>
              <button
                className="rounded-full p-1 hover:bg-theme-light/20 transition-colors"
                aria-label="Cerrar"
              >
                <X size={22} />
              </button>
            </Dialog.Close>
          </div>
          <div
            className={`rounded-lg border px-3 py-2 mb-4 flex flex-col gap-2 ${priorityBg}`}
          >
            <div className="flex items-center gap-2 text-theme">
              <Flag size={16} />
              <span className="font-medium">Prioridad:</span>
              <span className="capitalize">{ticket.priority}</span>
            </div>
            <div className="flex items-center gap-2 text-theme">
              <Tag size={16} />
              <span className="font-medium">Categoría:</span>
              <span>{ticket.category}</span>
            </div>
            <div className="flex items-center gap-2 text-theme">
              <User size={16} />
              <span className="font-medium">Solicitante:</span>
              <span>{ticket.createdBy?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-theme">
              <Calendar size={16} />
              <span className="font-medium">Creado:</span>
              <span>
                {ticket.createdAt?.toLocaleString("es-ES", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-theme">
              <Calendar size={16} />
              <span className="font-medium">
                {ticket.status === "completed" || ticket.status === "cancelled"
                  ? "Finalizado:"
                  : "Vence:"}
              </span>
              <span>
                {(ticket.status === "completed" || ticket.status === "cancelled"
                  ? ticket.updatedAt
                  : ticket.dueDate
                )?.toLocaleString("es-ES", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-theme font-semibold mb-1">Descripción</div>
            <div className="text-theme-alt text-sm whitespace-pre-line">
              {ticket.description}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
