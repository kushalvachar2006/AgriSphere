import { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { api } from '../api/client.js';
import BuyerCard from '../components/BuyerCard.jsx';
import QualityGradeModal from '../components/QualityGradeModal.jsx';

const CROPS = ['Tomato', 'Onion', 'Potato', 'Paddy'];

export default function BuyerDiscovery() {
  const [crop, setCrop] = useState('Tomato');
  const [buyers, setBuyers] = useState([]);
  const [matches, setMatches] = useState(null);
  const [aiExplanation, setAiExplanation] = useState(null);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [qualityOpen, setQualityOpen] = useState(false);

  useEffect(() => {
    api.getBuyers({ crop }).then((res) => setBuyers(res.buyers));
    setMatches(null);
    setAiExplanation(null);
  }, [crop]);

  useEffect(() => {
    window.__agrisphereContext = { ...(window.__agrisphereContext || {}), buyerMatches: matches, aiExplanation };
  }, [matches, aiExplanation]);

  const runMatch = async () => {
    setLoadingMatch(true);
    try {
      const res = await api.matchBuyers({ crop, quantityTonnes: 10, grade: 'A' });
      setMatches(res.matches);
      setAiExplanation(res.aiExplanation);
    } finally {
      setLoadingMatch(false);
    }
  };

  const displayList = matches ? matches.map((m) => ({ ...m.buyer, matchPercent: m.matchPercent })) : buyers;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900">Buyer Discovery & Matching</h1>
        <div className="flex items-center gap-2">
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm">
            {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={runMatch} disabled={loadingMatch} className="btn-primary">
            {loadingMatch ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
            Run Smart Matching
          </button>
          <button onClick={() => setQualityOpen(true)} className="btn-secondary">Grade My Crop</button>
        </div>
      </div>

      {aiExplanation && (
        <div className="card bg-intel-50/50 border-intel-100">
          <p className="text-sm font-semibold text-intel-800 mb-1">AI Match Explanation</p>
          <p className="text-sm text-slate-700">{aiExplanation.summary}</p>
          {aiExplanation.topBuyerReasoning?.length > 0 && (
            <ul className="text-sm text-slate-600 mt-2 list-disc list-inside">
              {aiExplanation.topBuyerReasoning.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayList.map((b) => (
          <BuyerCard key={b._id || b.name} buyer={b} matchPercent={b.matchPercent} onViewMatch={() => {}} />
        ))}
        {!displayList.length && <p className="text-slate-500 text-sm">No buyers currently seeking {crop}.</p>}
      </div>

      <QualityGradeModal open={qualityOpen} onClose={() => setQualityOpen(false)} cropHint={crop} />
    </div>
  );
}
