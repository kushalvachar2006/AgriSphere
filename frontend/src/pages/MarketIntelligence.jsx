import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Layers } from 'lucide-react';
import { api } from '../api/client.js';
import MarketTable from '../components/MarketTable.jsx';
import ArrivalVolumeChart from '../components/ArrivalVolumeChart.jsx';

const CROPS = ['Tomato', 'Onion', 'Potato', 'Paddy'];

// initialCrop lets a caller seed this with a specific crop — used by the
// Farmer role to open Market Intelligence already showing THAT farmer's
// harvest crop instead of always defaulting to Tomato. The dropdown
// still lets them browse other crops from there.
export default function MarketIntelligence({ initialCrop = 'Tomato' }) {
  const [crop, setCrop] = useState(initialCrop);
  const [markets, setMarkets] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  // Feature 1: Arrival Volume Intelligence
  const [arrivalSeries, setArrivalSeries] = useState([]);
  const [arrivalStats, setArrivalStats] = useState(null);
  const [arrivalInsight, setArrivalInsight] = useState(null);

  useEffect(() => {
    api.getMarkets({ crop }).then((res) => {
      setMarkets(res.markets);
      setMessage(res.message || '');
    });
    api.getMarketTrends({ crop }).then((res) => {
      const grouped = {};
      res.history.forEach((h) => {
        const d = new Date(h.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
        grouped[d] = grouped[d] || { date: d };
        grouped[d][h.market] = h.modalPrice;
      });
      setHistory(Object.values(grouped));
    });
    api.getArrivals({ crop }).then((res) => {
      setArrivalSeries(res.series || []);
      setArrivalStats(res.stats || null);
      setArrivalInsight(res.aiInsight || null);
    });
  }, [crop]);

  useEffect(() => {
    window.__agrisphereContext = {
      ...(window.__agrisphereContext || {}),
      marketComparison: markets,
      arrivalVolumeStats: arrivalStats,
    };
  }, [markets, arrivalStats]);

  const marketNames = [...new Set(history.flatMap((h) => Object.keys(h).filter((k) => k !== 'date')))];
  const colors = ['#1e8450', '#274bd1', '#ea580c', '#8bb0ff'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">Market Intelligence</h1>
        <select value={crop} onChange={(e) => setCrop(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm">
          {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {message && <p className="text-sm text-warn-700 bg-warn-50 rounded-lg px-3 py-2">{message}</p>}

      <div className="card">
        <h2 className="font-bold text-slate-800 mb-3">Market Comparison — {crop}</h2>
        <p className="text-xs text-slate-400 mb-3">Ranked by net realization, not raw price — this is the market AgriSphere recommends.</p>
        <MarketTable markets={markets} />
      </div>

      <div className="card">
        <h2 className="font-bold text-slate-800 mb-3">Price Trend (last 60 days, synthetic demo data)</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={6} />
            <YAxis tick={{ fontSize: 11 }} unit="₹" />
            <Tooltip />
            {marketNames.map((name, i) => (
              <Line key={name} type="monotone" dataKey={name} stroke={colors[i % colors.length]} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Layers size={18} className="text-intel-600" /> Arrival Volume Intelligence — {crop}</h2>
        <p className="text-xs text-slate-400 mb-3">Daily mandi arrival volumes and how they relate to the price trend above.</p>
        <ArrivalVolumeChart series={arrivalSeries} stats={arrivalStats} aiInsight={arrivalInsight} />
      </div>
    </div>
  );
}