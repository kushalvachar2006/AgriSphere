// pages/FarmerDashboard.jsx — Farmer role home screen.
//
// Deliberately simple: the farmer's only question is "I have produce
// ready — what should I do?". All numbers shown here come straight from
// existing deterministic endpoints (POST /api/recommendation, which
// already runs the net-realization profit maximizer — see
// backend/src/controllers/recommendationController.js). This page adds
// NO new calculations; it only translates the existing response into
// plain-language cards and badges instead of raw tables.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Loader2, ShieldCheck, Truck, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { api } from '../api/client.js';
import { useFarmer } from '../context/FarmerContext.jsx';

const PRESSURE_BADGE = {
  up: { icon: TrendingUp, text: 'Higher expected arrivals', tone: 'bg-warn-50 text-warn-700' },
  down: { icon: TrendingDown, text: 'Low market pressure', tone: 'bg-agri-50 text-agri-700' },
  stable: { icon: Minus, text: 'Stable supply', tone: 'bg-slate-100 text-slate-600' },
};

export default function FarmerDashboard() {
  const navigate = useNavigate();
  // farmer here comes from the URL's :farmerId (see App.jsx / FarmerProvider) —
  // this is what makes the dashboard "one template, many farmers", the
  // same way a scorecard component is keyed by matchId instead of
  // hardcoding a single match.
  const { farmer, loading: farmerLoading, error: farmerError } = useFarmer();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { recommended, alternatives, why }
  const [error, setError] = useState('');

  // Reset any previous farmer's recommendation when switching farmers.
  useEffect(() => { setResult(null); setError(''); }, [farmer?._id]);

  useEffect(() => {
    window.__agrisphereContext = { ...(window.__agrisphereContext || {}), farmer, farmerRecommendation: result };
  }, [farmer, result]);

  const findBestOption = async () => {
    if (!farmer) return;
    setLoading(true); setError('');
    try {
      const { crop, quantityTonnes, grade, storageAvailable } = farmer.currentCrop;

      // Existing deterministic endpoints — reused as-is, not reimplemented.
      const [recRes, marketsRes, buyersRes] = await Promise.all([
        api.getRecommendation({ crop, quantityTonnes, grade, storageAvailable }),
        api.getMarkets({ crop }),
        api.getBuyers({ crop }),
      ]);

      if (!recRes.bestOption) {
        setError(recRes.message || 'No selling options found yet.');
        setResult(null);
        return;
      }

      // Enrich each ranked option (label/type/net realization only, from
      // the recommendation endpoint) with the extra display details
      // (distance, verified, trend) already present on the matching
      // market/buyer document — no new backend logic, just a lookup.
      const enrich = (opt) => {
        if (opt.type === 'market') {
          const m = marketsRes.markets.find((x) => x.name === opt.label);
          return { ...opt, meta: m, kind: 'market' };
        }
        const b = buyersRes.buyers.find((x) => x.name === opt.label);
        return { ...opt, meta: b, kind: 'buyer' };
      };

      const recommended = enrich({ label: recRes.bestOption.label, type: recRes.bestOption.type, breakdown: recRes.bestOption.breakdown, trust: recRes.bestOption.trust });
      const alternatives = recRes.allOptions.slice(1, 4).map(enrich);

      setResult({ recommended, alternatives, aiRecommendation: recRes.aiRecommendation });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (farmerError) return <p className="text-sm text-red-500">{farmerError}</p>;
  if (farmerLoading || !farmer) return <p className="text-slate-500">Loading your dashboard…</p>;

  const { crop, quantityTonnes, grade } = farmer.currentCrop;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Welcome, {farmer.name.split(' ')[0]}</h1>
        <p className="text-slate-500 flex items-center gap-1 text-sm mt-1">
          <MapPin size={14} /> {farmer.location.district}, {farmer.location.state}
        </p>
      </div>

      <div className="card flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Current Crop</p>
          <p className="text-2xl font-extrabold text-slate-800">{crop}</p>
          <p className="text-sm text-slate-500">{quantityTonnes}T · Grade {grade}</p>
        </div>
        <button onClick={findBestOption} disabled={loading} className="btn-primary text-base px-6 py-3">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          Find My Best Selling Option
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {result && (
        <>
          <OptionCard option={result.recommended} highlight onDetails={() => navigate(result.recommended.kind === 'market' ? '/farmer/market' : '/farmer/buyers')} />

          {result.aiRecommendation && (
            <div className="card bg-intel-50/40 border-intel-100">
              <p className="text-sm font-semibold text-intel-800 mb-2">Why this is recommended</p>
              <ul className="text-sm text-slate-700 space-y-1">
                {result.aiRecommendation.reasoning?.map((r, i) => <li key={i}>• {r}</li>)}
              </ul>
              <p className="text-[11px] text-slate-400 mt-3">AI-assisted explanation. Prices are indicative and not guaranteed.</p>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-slate-600 mb-2">Other Options</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {result.alternatives.map((opt) => (
                <OptionCard key={opt.label} option={opt} compact onDetails={() => navigate(opt.kind === 'market' ? '/farmer/market' : '/farmer/buyers')} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function OptionCard({ option, highlight, compact, onDetails }) {
  const { label, breakdown, meta, kind, trust } = option;
  const pressure = kind === 'market' && meta ? PRESSURE_BADGE[meta.trend] : null;
  const PressureIcon = pressure?.icon;

  return (
    <div className={`card ${highlight ? 'border-2 border-agri-200' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          {highlight && <p className="text-xs font-semibold text-agri-600 mb-1">Recommended Selling Option</p>}
          <h3 className={`font-bold text-slate-800 ${compact ? 'text-sm' : 'text-lg'}`}>{label}</h3>
          <p className={`font-extrabold text-agri-700 ${compact ? 'text-lg' : 'text-2xl'}`}>₹{breakdown.netRealization}/kg <span className="text-xs font-normal text-slate-400">estimated net realization</span></p>
        </div>
      </div>

      <ul className={`mt-2 space-y-1 ${compact ? 'text-xs' : 'text-sm'} text-slate-600`}>
        {meta?.distanceKm != null && <li className="flex items-center gap-1"><MapPin size={12} /> {meta.distanceKm} km away</li>}
        {kind === 'buyer' && meta?.verified && <li className="flex items-center gap-1"><ShieldCheck size={12} /> Verified buyer</li>}
        {kind === 'buyer' && meta?.gradeRequired && <li>Grade {meta.gradeRequired} accepted</li>}
        {kind === 'buyer' && <li className="flex items-center gap-1"><Truck size={12} /> {meta?.distanceKm <= 50 ? 'Immediate pickup available' : 'Pickup scheduling required'}</li>}
        {pressure && <li className={`inline-flex items-center gap-1 badge ${pressure.tone} mt-1`}><PressureIcon size={12} /> {pressure.text}</li>}
        {trust && !compact && <li className="text-xs text-slate-400 mt-1">{trust.label}: {trust.score}/100</li>}
      </ul>

      {onDetails && (
        <button onClick={onDetails} className="text-sm font-semibold text-intel-700 hover:underline mt-3">
          View Details →
        </button>
      )}
    </div>
  );
}