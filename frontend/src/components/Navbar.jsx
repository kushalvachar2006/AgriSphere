import { NavLink } from 'react-router-dom';
import { Sprout, LayoutDashboard, LineChart, Users, Boxes, Truck, MessagesSquare } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/market', label: 'Market Intelligence', icon: LineChart },
  { to: '/buyers', label: 'Buyers', icon: Users },
  { to: '/lot', label: 'FPO Smart Lot', icon: Boxes },
  { to: '/transaction', label: 'Transactions', icon: Truck },
  { to: '/assistant', label: 'Assistant', icon: MessagesSquare },
];

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <NavLink to="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-agri-600 flex items-center justify-center">
            <Sprout size={20} className="text-white" />
          </div>
          <span className="font-extrabold text-lg text-slate-800 tracking-tight">AgriSphere <span className="text-agri-600">AI</span></span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `pill-nav flex items-center gap-1.5 whitespace-nowrap ${
                  isActive ? 'bg-agri-50 text-agri-700' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
