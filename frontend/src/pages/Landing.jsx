import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowRight, Landmark, Database, Brain, Target } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-agri-50 via-white to-white">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-agri-600 flex items-center justify-center">
          <Sprout size={20} className="text-white" />
        </div>
        <span className="font-extrabold text-lg text-slate-800">AgriSphere <span className="text-agri-600">AI</span></span>
      </header>

      <section className="max-w-4xl mx-auto px-6 text-center pt-10 pb-16">
        <span className="badge bg-intel-50 text-intel-700 mb-4">Smart India Hackathon 2026 · Prototype</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Right Price. Right Buyer.<br /> Right Time. Right Decision.
        </h1>
        <p className="text-slate-600 mt-5 text-lg max-w-2xl mx-auto">
          AgriSphere AI is an intelligence layer on top of existing agricultural infrastructure —
          it does not replace eNAM or AGMARKNET. It turns fragmented market, buyer, logistics and
          storage data into one clear, explainable recommendation for farmers and FPOs.
        </p>
        <button onClick={() => navigate('/demo/dashboard')} className="btn-primary mt-8 text-base px-6 py-3">
          Enter Demo Dashboard <ArrowRight size={18} />
        </button>
        <p className="text-xs text-slate-400 mt-3">Preconfigured demo farmer: Ramesh Kumar · Kolar, Karnataka · 10T Tomato</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16 grid sm:grid-cols-3 gap-4">
        {[
          { icon: Database, title: 'Understands', desc: 'Pulls fragmented market, buyer, logistics & storage data into one place.' },
          { icon: Brain, title: 'Analyzes & Optimizes', desc: 'Deterministic profit-maximizer finds the true best net realization.' },
          { icon: Target, title: 'Recommends & Enables Action', desc: 'Gemini explains the "why" in plain language, farmer decides and acts.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card text-left">
            <div className="w-10 h-10 rounded-xl bg-agri-50 flex items-center justify-center mb-3">
              <Icon size={20} className="text-agri-700" />
            </div>
            <h3 className="font-bold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
          <Landmark size={16} /> Complements eNAM, AGMARKNET, FPOs, logistics & storage networks — not a replacement.
        </div>
      </section>
    </div>
  );
}