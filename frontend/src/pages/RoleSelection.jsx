// pages/RoleSelection.jsx — new default entry point ("/").
// Reuses the same visual language as the old Landing.jsx (gradient
// header, agri-green branding, card component styles) but replaces the
// single "Enter Demo" CTA with three role cards. The original all-in-one
// experience still exists, unchanged, at /demo (see App.jsx).
import { useNavigate } from 'react-router-dom';
import { Sprout, Wheat, Users2, Factory, ArrowRight, LayoutGrid } from 'lucide-react';

const ROLES = [
  {
    key: 'farmer',
    to: '/farmer/select',
    icon: Wheat,
    title: 'Farmer',
    description: 'Find the best selling opportunity for your produce.',
    cta: 'Continue as Farmer',
    tone: 'agri',
  },
  {
    key: 'fpo',
    to: '/fpo',
    icon: Users2,
    title: 'FPO / Producer Group',
    description: 'Aggregate produce, create Smart Lots and connect with suitable buyers.',
    cta: 'Continue as FPO',
    tone: 'intel',
  },
  {
    key: 'buyer',
    to: '/buyer',
    icon: Factory,
    title: 'Buyer',
    description: 'Find suitable produce, manage procurement and make digital offers.',
    cta: 'Continue as Buyer',
    tone: 'warn',
  },
];

const TONE_STYLES = {
  agri: { icon: 'bg-agri-50 text-agri-700', button: 'btn-primary' },
  intel: { icon: 'bg-intel-50 text-intel-700', button: 'bg-intel-600 hover:bg-intel-700 text-white font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-colors' },
  warn: { icon: 'bg-warn-50 text-warn-700', button: 'bg-warn-500 hover:bg-warn-600 text-white font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-colors' },
};

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-agri-50 via-white to-white">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-agri-600 flex items-center justify-center">
            <Sprout size={20} className="text-white" />
          </div>
          <span className="font-extrabold text-lg text-slate-800">AgriSphere <span className="text-agri-600">AI</span></span>
        </div>
        <button
          onClick={() => navigate('/demo')}
          className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5"
        >
          <LayoutGrid size={15} /> Full demo dashboard
        </button>
      </header>

      <section className="max-w-3xl mx-auto px-6 text-center pt-6 pb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          AgriSphere AI
        </h1>
        <p className="text-slate-600 mt-4 text-lg">
          Right Price. Right Buyer. Right Time. Right Decision.
        </p>
        <p className="text-slate-400 mt-2 text-sm">Choose how you'd like to use AgriSphere.</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-3 gap-5">
        {ROLES.map(({ key, to, icon: Icon, title, description, cta, tone }) => (
          <div key={key} className="card flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${TONE_STYLES[tone].icon}`}>
              <Icon size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-800">{title}</h2>
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            </div>
            <button onClick={() => navigate(to)} className={`${TONE_STYLES[tone].button} mt-auto w-full justify-center`}>
              {cta} <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}