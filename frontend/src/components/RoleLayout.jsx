// components/RoleLayout.jsx
// Shared chrome for the three role-based experiences (Farmer/FPO/Buyer).
// Deliberately mirrors Layout.jsx + Navbar.jsx (same header height, card
// styles, AI assistant widget) so the role pages feel like part of the
// same product, just with a role-specific nav and a "Switch Role" link
// back to "/" instead of the full all-in-one nav.
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Sprout, ArrowLeftRight } from 'lucide-react';
import AIAssistantWidget from './AIAssistantWidget.jsx';

const ROLE_BADGE = {
  farmer: { label: '🌾 Farmer', style: 'bg-agri-50 text-agri-700' },
  fpo: { label: '👥 FPO', style: 'bg-intel-50 text-intel-700' },
  buyer: { label: '🏭 Buyer', style: 'bg-warn-50 text-warn-700' },
};

export default function RoleLayout({ role, basePath, navItems }) {
  const badge = ROLE_BADGE[role];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <Link to={basePath} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-agri-600 flex items-center justify-center">
                <Sprout size={20} className="text-white" />
              </div>
              <span className="font-extrabold text-lg text-slate-800 tracking-tight hidden sm:inline">AgriSphere <span className="text-agri-600">AI</span></span>
            </Link>
            {badge && <span className={`badge ${badge.style}`}>{badge.label}</span>}
          </div>

          <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === basePath}
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

          <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 shrink-0">
            <ArrowLeftRight size={13} /> Switch Role
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
      <AIAssistantWidget />
    </div>
  );
}