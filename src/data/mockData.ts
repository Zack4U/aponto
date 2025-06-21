import { User, Ticket, Notification, TicketStats } from "../types";

export const currentUser: User = {
  id: "1",
  name: "Jane Doe",
  email: "jane.doe@empresa.com",
  avatar:
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  role: "admin",
};

export const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Problema con el sistema de facturación",
    description:
      "El sistema no permite generar facturas correctamente desde ayer",
    status: "pending",
    priority: "urgent",
    createdAt: new Date("2025-01-15T09:00:00"),
    updatedAt: new Date("2025-01-15T14:30:00"),
    dueDate: new Date("2025-01-16T17:00:00"),
    createdBy: {
      id: "2",
      name: "Carlos Mendez",
      email: "carlos@empresa.com",
      role: "user",
    },
    category: "Técnico",
  },
  {
    id: "2",
    title: "Solicitud de nuevo usuario",
    description:
      "Necesito acceso al sistema para el nuevo empleado del departamento de ventas",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2025-01-14T11:00:00"),
    updatedAt: new Date("2025-01-15T10:00:00"),
    dueDate: new Date("2025-01-18T12:00:00"),
    assignedTo: currentUser,
    createdBy: {
      id: "3",
      name: "María López",
      email: "maria@empresa.com",
      role: "user",
    },
    category: "Acceso",
  },
  {
    id: "3",
    title: "Queja sobre el servicio de atención",
    description:
      "El tiempo de respuesta ha sido muy lento en las últimas semanas",
    status: "pending",
    priority: "high",
    createdAt: new Date("2025-01-13T16:00:00"),
    updatedAt: new Date("2025-01-13T16:00:00"),
    dueDate: new Date("2025-01-17T09:00:00"),
    createdBy: {
      id: "4",
      name: "Roberto Silva",
      email: "roberto@cliente.com",
      role: "user",
    },
    category: "Servicio",
  },
  {
    id: "4",
    title: "Actualización de software requerida",
    description:
      "Necesitamos actualizar el software de contabilidad a la última versión",
    status: "completed",
    priority: "low",
    createdAt: new Date("2025-01-10T08:00:00"),
    updatedAt: new Date("2025-01-13T15:00:00"),
    createdBy: {
      id: "5",
      name: "Laura Jiménez",
      email: "laura@empresa.com",
      role: "user",
    },
    category: "Mantenimiento",
  },
  {
    id: "5",
    title: "Error en la impresora de la oficina",
    description:
      "La impresora principal no responde a los comandos de impresión.",
    status: "pending",
    priority: "medium",
    createdAt: new Date("2025-01-12T09:00:00"),
    updatedAt: new Date("2025-01-12T10:00:00"),
    dueDate: new Date("2025-01-16T11:00:00"),
    createdBy: {
      id: "6",
      name: "Pedro Gómez",
      email: "pedro@empresa.com",
      role: "user",
    },
    category: "Técnico",
  },
  {
    id: "6",
    title: "Solicitud de cambio de contraseña",
    description: "El usuario solicita restablecer su contraseña.",
    status: "completed",
    priority: "low",
    createdAt: new Date("2025-01-11T08:00:00"),
    updatedAt: new Date("2025-01-11T09:00:00"),
    dueDate: new Date("2025-01-12T10:00:00"),
    createdBy: {
      id: "7",
      name: "Ana Torres",
      email: "ana@empresa.com",
      role: "user",
    },
    category: "Acceso",
  },
  {
    id: "7",
    title: "Capacitación en nuevo sistema",
    description: "Solicitar capacitación para el nuevo sistema de gestión.",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2025-01-13T10:00:00"),
    updatedAt: new Date("2025-01-14T09:00:00"),
    dueDate: new Date("2025-01-20T14:00:00"),
    createdBy: {
      id: "8",
      name: "Sofía Ruiz",
      email: "sofia@empresa.com",
      role: "user",
    },
    category: "Formación",
  },
  {
    id: "8",
    title: "Problema con acceso remoto",
    description: "No se puede acceder al servidor remoto desde la oficina.",
    status: "pending",
    priority: "urgent",
    createdAt: new Date("2025-01-15T07:00:00"),
    updatedAt: new Date("2025-01-15T08:00:00"),
    dueDate: new Date("2025-01-15T12:00:00"),
    createdBy: {
      id: "9",
      name: "Luis Pérez",
      email: "luis@empresa.com",
      role: "user",
    },
    category: "Técnico",
  },
  {
    id: "9",
    title: "Solicitud de licencia de software",
    description: "Se requiere una nueva licencia para Photoshop.",
    status: "pending",
    priority: "medium",
    createdAt: new Date("2025-01-10T09:00:00"),
    updatedAt: new Date("2025-01-10T10:00:00"),
    dueDate: new Date("2025-01-18T10:00:00"),
    createdBy: {
      id: "10",
      name: "Marta Sánchez",
      email: "marta@empresa.com",
      role: "user",
    },
    category: "Mantenimiento",
  },
  {
    id: "10",
    title: "Revisión de contrato de soporte",
    description: "Revisar y renovar el contrato de soporte anual.",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2025-01-09T11:00:00"),
    updatedAt: new Date("2025-01-10T12:00:00"),
    dueDate: new Date("2025-01-19T15:00:00"),
    createdBy: {
      id: "11",
      name: "Jorge Castillo",
      email: "jorge@empresa.com",
      role: "user",
    },
    category: "Administrativo",
  },
  {
    id: "11",
    title: "Problema con correo electrónico",
    description: "No se reciben correos externos desde ayer.",
    status: "pending",
    priority: "urgent",
    createdAt: new Date("2025-01-14T08:00:00"),
    updatedAt: new Date("2025-01-14T09:00:00"),
    dueDate: new Date("2025-01-15T10:00:00"),
    createdBy: {
      id: "12",
      name: "Elena Vargas",
      email: "elena@empresa.com",
      role: "user",
    },
    category: "Técnico",
  },
  {
    id: "12",
    title: "Solicitud de acceso a base de datos",
    description: "El usuario requiere acceso temporal a la base de datos.",
    status: "completed",
    priority: "medium",
    createdAt: new Date("2025-01-12T10:00:00"),
    updatedAt: new Date("2025-01-13T11:00:00"),
    dueDate: new Date("2025-01-13T12:00:00"),
    createdBy: {
      id: "13",
      name: "Gabriel Díaz",
      email: "gabriel@empresa.com",
      role: "user",
    },
    category: "Acceso",
  },
  {
    id: "13",
    title: "Actualización de políticas de seguridad",
    description: "Actualizar las políticas de seguridad de la empresa.",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2025-01-08T09:00:00"),
    updatedAt: new Date("2025-01-09T10:00:00"),
    dueDate: new Date("2025-01-20T16:00:00"),
    createdBy: {
      id: "14",
      name: "Patricia Romero",
      email: "patricia@empresa.com",
      role: "user",
    },
    category: "Administrativo",
  },
  {
    id: "14",
    title: "Reparación de proyector",
    description: "El proyector de la sala de reuniones no enciende.",
    status: "pending",
    priority: "medium",
    createdAt: new Date("2025-01-13T13:00:00"),
    updatedAt: new Date("2025-01-13T14:00:00"),
    dueDate: new Date("2025-01-17T11:00:00"),
    createdBy: {
      id: "15",
      name: "Raúl Ortega",
      email: "raul@empresa.com",
      role: "user",
    },
    category: "Mantenimiento",
  },
  {
    id: "15",
    title: "Solicitud de equipo nuevo",
    description: "Se solicita una laptop para nuevo ingreso.",
    status: "pending",
    priority: "high",
    createdAt: new Date("2025-01-12T15:00:00"),
    updatedAt: new Date("2025-01-12T16:00:00"),
    dueDate: new Date("2025-01-18T13:00:00"),
    createdBy: {
      id: "16",
      name: "Carmen López",
      email: "carmen@empresa.com",
      role: "user",
    },
    category: "Administrativo",
  },
  {
    id: "16",
    title: "Problema con VPN",
    description: "No se puede conectar a la VPN desde casa.",
    status: "pending",
    priority: "urgent",
    createdAt: new Date("2025-01-14T07:00:00"),
    updatedAt: new Date("2025-01-14T08:00:00"),
    dueDate: new Date("2025-01-15T09:00:00"),
    createdBy: {
      id: "17",
      name: "Esteban Morales",
      email: "esteban@empresa.com",
      role: "user",
    },
    category: "Técnico",
  },
  {
    id: "17",
    title: "Solicitud de capacitación en Excel",
    description: "El equipo de ventas solicita capacitación avanzada en Excel.",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2025-01-11T10:00:00"),
    updatedAt: new Date("2025-01-12T11:00:00"),
    dueDate: new Date("2025-01-21T10:00:00"),
    createdBy: {
      id: "18",
      name: "Silvia Ramos",
      email: "silvia@empresa.com",
      role: "user",
    },
    category: "Formación",
  },
  {
    id: "18",
    title: "Revisión de inventario",
    description: "Revisar el inventario de equipos de oficina.",
    status: "completed",
    priority: "low",
    createdAt: new Date("2025-01-09T09:00:00"),
    updatedAt: new Date("2025-01-10T10:00:00"),
    dueDate: new Date("2025-01-11T11:00:00"),
    createdBy: {
      id: "19",
      name: "Tomás Herrera",
      email: "tomas@empresa.com",
      role: "user",
    },
    category: "Administrativo",
  },
  {
    id: "19",
    title: "Problema con acceso a intranet",
    description: "No se puede acceder a la intranet desde la red interna.",
    status: "pending",
    priority: "urgent",
    createdAt: new Date("2025-01-15T08:00:00"),
    updatedAt: new Date("2025-01-15T09:00:00"),
    dueDate: new Date("2025-01-15T13:00:00"),
    createdBy: {
      id: "20",
      name: "Lucía Fernández",
      email: "lucia@empresa.com",
      role: "user",
    },
    category: "Técnico",
  },
  {
    id: "20",
    title: "Solicitud de actualización de datos personales",
    description: "Actualizar los datos personales en el sistema de RRHH.",
    status: "completed",
    priority: "low",
    createdAt: new Date("2025-01-10T10:00:00"),
    updatedAt: new Date("2025-01-11T11:00:00"),
    dueDate: new Date("2025-01-12T12:00:00"),
    createdBy: {
      id: "21",
      name: "Federico Castro",
      email: "federico@empresa.com",
      role: "user",
    },
    category: "Administrativo",
  },
  // add canceled tickets
  {
    id: "21",
    title: "Cancelación de servicio de internet",
    description: "El proveedor ha cancelado el servicio de internet.",
    status: "cancelled",
    priority: "high",
    createdAt: new Date("2025-01-14T10:00:00"),
    updatedAt: new Date("2025-01-14T11:00:00"),
    dueDate: new Date("2025-01-15T11:00:00"),
    createdBy: {
      id: "22",
      name: "Claudia Torres",
      email: "email@email.com",
      role: "user",
    },
    category: "Administrativo",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Ticket urgente asignado",
    message: "Se te ha asignado un ticket de alta prioridad",
    type: "warning",
    ticketId: "1",
    createdAt: new Date("2024-01-15T14:30:00"),
    read: false,
  },
  {
    id: "2",
    title: "Ticket completado",
    message: "El ticket #4 ha sido marcado como completado",
    type: "success",
    ticketId: "4",
    createdAt: new Date("2024-01-12T15:00:00"),
    read: true,
  },
  {
    id: "3",
    title: "Nuevo ticket creado",
    message: "Se ha creado un nuevo ticket en la categoría Servicio",
    type: "info",
    ticketId: "3",
    createdAt: new Date("2024-01-13T16:00:00"),
    read: false,
  },
  {
    id: "4",
    title: "Actualización de ticket",
    message: "El ticket #2 ha sido actualizado por el usuario María López",
    type: "info",
    ticketId: "2",
    createdAt: new Date("2024-01-15T10:00:00"),
    read: false,
  },
  {
    id: "5",
    title: "Recordatorio de ticket pendiente",
    message: "El ticket #1 está pendiente y debe ser atendido pronto",
    type: "warning",
    ticketId: "1",
    createdAt: new Date("2024-01-16T09:00:00"),
    read: false,
  },
  {
    id: "6",
    title: "Nuevo comentario en ticket",
    message: "Se ha añadido un nuevo comentario al ticket #3",
    type: "info",
    ticketId: "3",
    createdAt: new Date("2024-01-14T12:00:00"),
    read: true,
  },
  {
    id: "7",
    title: "Ticket cancelado",
    message: "El ticket #2 ha sido cancelado por el usuario Carlos Mendez",
    type: "error",
    ticketId: "2",
    createdAt: new Date("2024-01-15T11:00:00"),
    read: false,
  },
  {
    id: "8",
    title: "Nuevo ticket asignado",
    message: "Se te ha asignado un nuevo ticket en la categoría Acceso",
    type: "info",
    ticketId: "2",
    createdAt: new Date("2024-01-14T11:00:00"),
    read: false,
  },
  {
    id: "9",
    title: "Ticket actualizado",
    message: "El ticket #1 ha sido actualizado por el usuario Jane Doe",
    type: "info",
    ticketId: "1",
    createdAt: new Date("2024-01-15T09:00:00"),
    read: true,
  },
  {
    id: "10",
    title: "Nuevo ticket creado",
    message: "Se ha creado un nuevo ticket en la categoría Técnico",
    type: "info",
    ticketId: "1",
    createdAt: new Date("2024-01-15T09:00:00"),
    read: false,
  },
  {
    id: "11",
    title: "Ticket pendiente",
    message: "El ticket #3 está pendiente y debe ser atendido pronto",
    type: "warning",
    ticketId: "3",
    createdAt: new Date("2024-01-13T16:00:00"),
    read: false,
  },
  {
    id: "12",
    title: "Ticket asignado a otro usuario",
    message: "El ticket #4 ha sido reasignado a Laura Jiménez",
    type: "info",
    ticketId: "4",
    createdAt: new Date("2024-01-10T08:00:00"),
    read: true,
  },
];

export const getTicketStats = (): TicketStats => {
  const stats = mockTickets.reduce(
    (acc, ticket) => {
      acc.total++;
      switch (ticket.status) {
        case "pending":
          acc.pending++;
          break;
        case "in-progress":
          acc.inProgress++;
          break;
        case "completed":
          acc.completed++;
          break;
        case "cancelled":
          acc.cancelled++;
          break;
      }
      return acc;
    },
    {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
    }
  );

  return stats;
};

export const getUpcomingTicket = (): Ticket | null => {
  const upcomingTickets = mockTickets
    .filter(
      (ticket) =>
        ticket.dueDate &&
        ticket.status !== "completed" &&
        ticket.status !== "cancelled"
    )
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return a.dueDate.getTime() - b.dueDate.getTime();
    });

  return upcomingTickets[0] || null;
};
