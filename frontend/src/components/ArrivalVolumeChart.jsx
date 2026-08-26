// components/ArrivalVolumeChart.jsx — Feature 1: Arrival Volume Intelligence.
// Renders the deterministically-computed arrival trend + stats, plus the
// short Gemini-generated insight sentence (with its own fallback label).
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Sparkles, TrendingUp, TrendingDown, ShieldAlert } from 'lucide-react';

export default function ArrivalVolumeChart({ series, stats, aiInsight }) {
  if (!series?.length) return <p className="text-slate-500 text-sm">No arrival volume data available.</p>;

  const chartData = series.map((s) => ({
    date: new Date(s.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    arrivals: s.arrivalQuantityTonnes,
  }));

  const changeUp = stats?.arrivalChangePct >= 0;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-xs text-slate-500">Recent Avg Arrivals</p>
          <p className="text-xl font-extrabold text-slate-800">{stats.recentAvgArrivalTonnes} T/day</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-xs text-slate-500">Change vs Prior Period</p>
          <p className={`text-xl font-extrabold flex items-center gap-1 ${changeUp ? 'text-warn-600' : 'text-agri-700'}`}>
            {changeUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            {stats.arrivalChangePct}%
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-xs text-slate-500">Pattern Detected</p>
          <p className="text-sm font-semibold text-slate-700 mt-1">{stats.priceTrendLabel}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={6} />
          <YAxis tick={{ fontSize: 10 }} unit="T" />
          <Tooltip />
          <Bar dataKey="arrivals" fill="#274bd1" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {aiInsight && (
        <div className="bg-intel-50/50 border border-intel-100 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-intel-800 flex items-center gap-1"><Sparkles size={12} /> AI Insight</p>
            {!aiInsight.aiAvailable && <span className="badge bg-warn-50 text-warn-700 text-[10px]"><ShieldAlert size={10} /> fallback</span>}
          </div>
          <p className="text-sm text-slate-700">{aiInsight.insight}</p>
          <p className="text-xs text-slate-500 mt-1">{aiInsight.sellTimingHint}</p>
        </div>
      )}
    </div>
  );
}