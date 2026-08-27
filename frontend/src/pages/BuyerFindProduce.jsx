// pages/BuyerFindProduce.jsx — buyer discovers existing FPO Smart Lots.
// Uses the new (but architecturally consistent) POST /api/lots/match,
// which reuses the same deterministic crop/quantity/grade compatibility
// approach as the farmer-side buyer matching — see
// backend/src/services/matchingService.js: matchLotsToBuyerRequirement.
import { useEffect, useState } from 'react';
import { Search, Boxes } from 'lucide-react';
import { api } from '../api/client.js';
import { BUYER_NAME } from './BuyerDashboard.jsx';

const CROPS = ['Tomato', 'Onion', 'Potato', 'Paddy'];

export default function BuyerFindProduce() {
  const [crop, setCrop] = useState('Tomato');
  const [quantityRequiredTonnes, setQuantityRequiredTonnes] = useState(10);
  const [gradeRequired, setGradeRequired] = useState('A');
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState('');

  const search = async () => {
    const res = await api.matchLotsForBuyer({ crop, quantityRequiredTonnes: Number(quantityRequiredTonnes), gradeRequired });
    setMatches(res.matches || []);
    setMessage(res.message || '');
  };

  useEffect(() => { search(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.__agrisphereContext = { ...(window.__agrisphereContext || {}), lotMatches: matches };
  }, [matches]);

  const makeOffer = async (lot) => {
    await api.createOffer({
      lotId: lot._id,
      farmerName: `FPO Lot (${lot._id.slice(-6)})`,
      buyerName: BUYER_NAME,
      crop: lot.crop,
      grade: lot.grade,
      quantityTonnes: Math.min(quantityRequiredTonnes, lot.totalQuantityTonnes),
      pricePerKg: 22, // buyer's own opening offer for this negotiation
    });
    alert('Offer created — check the Offers tab to negotiate it.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2"><Search size={22} className="text-warn-600" /> Find Produce</h1>
        <div className="flex items-center gap-2">
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm">
            {CROPS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input type="number" value={quantityRequiredTonnes} onChange={(e) => setQuantityRequiredTonnes(e.target.value)} className="w-20 border border-slate-200 rounded-xl px-2 py-2 text-sm" />
          <select value={gradeRequired} onChange={(e) => setGradeRequired(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm">
            {['A', 'B', 'C'].map((g) => <option key={g}>{g}</option>)}
          </select>
          <button onClick={search} className="btn-primary text-sm">Search</button>
        </div>
      </div>

      {message && <p className="text-sm text-slate-500">{message}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map(({ lot, matchPercent }) => (
          <div key={lot._id} className="card space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5"><Boxes size={16} className="text-agri-600" /> {lot.crop} Smart Lot</h3>
              <span className="badge bg-intel-50 text-intel-700 font-bold">{matchPercent}% match</span>
            </div>
            <p className="text-sm text-slate-500">{lot.totalQuantityTonnes}T · Grade {lot.grade} · {lot.contributions.length} contributing farmers</p>
            <button onClick={() => makeOffer(lot)} className="btn-secondary text-sm w-full justify-center mt-2">Make Offer</button>
          </div>
        ))}
        {!matches.length && !message && <p className="text-slate-500 text-sm">No Smart Lots matched your search.</p>}
      </div>
    </div>
  );
}
