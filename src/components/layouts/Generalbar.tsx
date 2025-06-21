import React from "react";
import { UserCard } from "@/components/layouts/UserCard";
import { UpcomingTicket } from "@/components/dashboard/UpcomingTicket";
import { StatsCard } from "@/components/dashboard/StatsCard";
import {
  currentUser,
  getTicketStats,
  getUpcomingTicket,
} from "../../data/mockData";
import { LastUpdates } from "@/components/dashboard/LastUpdates";

export const Generalbar: React.FC = ({}) => {
  const stats = getTicketStats();
  const upcomingTicket = getUpcomingTicket();

  return (
    <div className="w-80 p-6 space-y-6">
      <UserCard user={currentUser} />
      <UpcomingTicket ticket={upcomingTicket} />
      <LastUpdates />
      <StatsCard stats={stats} />
    </div>
  );
};
