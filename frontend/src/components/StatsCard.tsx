import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: string; // Tailwind color class for icon
}

export const StatsCard = ({ title, value, icon, iconColor }: StatsCardProps) => {
  return (
    <div className="bg-neutral-900 rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-green-500/40 hover:scale-105 transition-shadow">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`${iconColor} text-2xl`}>
        {icon}
      </div>
    </div>
  );
};
