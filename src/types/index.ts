export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "agent" | "user";
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  assignedTo?: User;
  createdBy: User;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  ticketId?: string; // Optional, if the notification is related to a ticket
  createdAt: Date;
  read: boolean;
}

export interface TicketStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}
