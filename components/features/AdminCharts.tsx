'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const registrationData = [
  { month: 'Jan', registrations: 12 },
  { month: 'Feb', registrations: 19 },
  { month: 'Mar', registrations: 28 },
  { month: 'Apr', registrations: 35 },
  { month: 'May', registrations: 42 },
  { month: 'Jun', registrations: 38 },
  { month: 'Jul', registrations: 55 },
  { month: 'Aug', registrations: 63 },
  { month: 'Sep', registrations: 71 },
  { month: 'Oct', registrations: 48 },
  { month: 'Nov', registrations: 56 },
  { month: 'Dec', registrations: 68 },
];

const eventTypeData = [
  { name: 'Coding', value: 12, color: '#3b82f6' },
  { name: 'Hackathon', value: 8, color: '#8b5cf6' },
  { name: 'Workshop', value: 15, color: '#06b6d4' },
  { name: 'Seminar', value: 6, color: '#22d3ee' },
  { name: 'Quiz', value: 9, color: '#10b981' },
];

export function RegistrationsChart() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Registrations Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={registrationData}>
          <defs>
            <linearGradient id="registrationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
            }}
          />
          <Area
            type="monotone"
            dataKey="registrations"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#registrationGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EventsPieChart() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Events by Type
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={eventTypeData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {eventTypeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
            }}
          />
          <Legend
            wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
