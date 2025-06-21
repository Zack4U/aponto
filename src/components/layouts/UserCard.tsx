import React from "react";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { LogOut } from "lucide-react";

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleLabel = (role: string) => {
    const roles = {
      admin: "Administrador",
      agent: "Agente",
      user: "Usuario",
    };
    return roles[role as keyof typeof roles] || role;
  };

  return (
    <Card className="bg-theme-alt border-0 rounded-3xl">
      <CardContent className="p-6 flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-theme text-theme text-lg font-semibold">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="text-theme font-semibold text-lg truncate">
            {user.name}
          </h3>
          <p className="text-theme-alt text-sm truncate">
            {getRoleLabel(user.role)}
          </p>
        </div>
        <button className="text-red-500 transition-colors cursor-pointer hover:scale-105">
          <LogOut size={20} />
        </button>
      </CardContent>
    </Card>
  );
};
