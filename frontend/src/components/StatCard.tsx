import React from 'react';

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  gradient: string;
}

export function StatCard({ icon, title, value, gradient }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 text-white" style={{ boxShadow: 'var(--shadow-lg)' }}>
      <div className={`absolute inset-0 ${gradient}`} />
      <div className="relative space-y-2">
        <div className="text-3xl">{icon}</div>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  );
}
