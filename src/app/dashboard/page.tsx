import type { Metadata } from 'next';
import {
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Demo organizer dashboard with sample data.',
  robots: { index: false, follow: false },
};

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(n);
}

const stats = [
  {
    icon: Calendar,
    label: 'Active Events',
    value: '12',
    trend: '+3 this month',
    color: 'text-blue-400',
    bg: 'from-blue-500/20',
  },
  {
    icon: Users,
    label: 'Total Guests',
    value: '1,842',
    trend: '+218 this week',
    color: 'text-purple-400',
    bg: 'from-purple-500/20',
  },
  {
    icon: DollarSign,
    label: 'Revenue YTD',
    value: fmt(248500),
    trend: '+22% vs last year',
    color: 'text-gold-400',
    bg: 'from-gold-500/20',
  },
  {
    icon: TrendingUp,
    label: 'Avg Event Size',
    value: '154',
    trend: 'guests per event',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/20',
  },
];

const events = [
  {
    name: 'Williams Wedding',
    date: 'Apr 19, 2026',
    guests: 180,
    venue: 'Marriott Syracuse',
    status: 'confirmed',
    revenue: 42000,
  },
  {
    name: 'TechCNY Annual Gala',
    date: 'Apr 24, 2026',
    guests: 320,
    venue: 'OnCenter',
    status: 'confirmed',
    revenue: 68000,
  },
  {
    name: 'Rodriguez Quinceanera',
    date: 'May 3, 2026',
    guests: 95,
    venue: 'Rosamond Gifford Zoo',
    status: 'planning',
    revenue: 18500,
  },
  {
    name: 'SU Alumni Reunion',
    date: 'May 10, 2026',
    guests: 450,
    venue: 'JMA Dome',
    status: 'pending',
    revenue: 85000,
  },
  {
    name: 'Chen Birthday Gala',
    date: 'May 15, 2026',
    guests: 60,
    venue: 'Lemon Grass',
    status: 'confirmed',
    revenue: 12000,
  },
];

const sc: Record<string, string> = {
  confirmed: 'text-emerald-400 bg-emerald-400/10',
  planning: 'text-gold-400 bg-gold-400/10',
  pending: 'text-orange-400 bg-orange-400/10',
};

export default function DashboardPage() {
  const today = format(new Date(), 'MMMM d, yyyy');
  return (
    <div className="pt-24 pb-16">
      <section className="section-padding bg-navy-950">
        <div className="container-max">
          <p className="mb-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
            Preview only: metrics and events are sample data until accounts and bookings are connected.
          </p>
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-gold-400 text-sm uppercase tracking-widest mb-1">Organizer Portal</p>
              <h1 className="font-display text-4xl font-bold text-white">Dashboard</h1>
            </div>
            <div className="text-right">
              <div className="text-white/40 text-sm">{today}</div>
              <div className="text-white font-medium">Welcome back, Alicia</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map(({ icon: Icon, label, value, trend, color, bg }) => (
              <div key={label} className="glass-card p-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bg} to-transparent flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div className="text-3xl font-display font-bold text-white mb-1">{value}</div>
                <div className="text-white/50 text-sm mb-1">{label}</div>
                <div className={`text-xs ${color}`}>{trend}</div>
              </div>
            ))}
          </div>
          <div className="glass-card overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display text-xl font-bold text-white">Upcoming Events</h2>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <BarChart3 className="w-4 h-4" /> Next 30 days
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Event', 'Date', 'Venue', 'Guests', 'Revenue', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 text-white/30 text-xs uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {events.map(({ name, date, guests, venue, status, revenue }) => (
                    <tr key={name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{name}</td>
                      <td className="px-6 py-4 text-white/50 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          {date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/50 text-sm">{venue}</td>
                      <td className="px-6 py-4 text-white/50 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {guests}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gold-400 font-semibold text-sm">{fmt(revenue)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${sc[status]}`}
                        >
                          {status === 'confirmed' && (
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                          )}
                          {status === 'pending' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                          {status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
