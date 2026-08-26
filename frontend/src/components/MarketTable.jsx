import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendColor = { up: 'text-agri-600', down: 'text-red-500', stable: 'text-slate-400' };

export default function MarketTable({ markets }) {
  if (!markets?.length) return <p className="text-slate-500 text-sm">No market data available.</p>;
  const bestName = markets[0]?.name;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200">
            <th className="py-2 pr-4 font-medium">Market</th>
            <th className="py-2 pr-4 font-medium">Distance</th>
            <th className="py-2 pr-4 font-medium">Modal Price</th>
            <th className="py-2 pr-4 font-medium">Transport</th>
            <th className="py-2 pr-4 font-medium">Net Realisation</th>
            <th className="py-2 pr-4 font-medium">Trend</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => {
            const TrendIcon = trendIcon[m.trend] || Minus;
            const isBest = m.name === bestName;
            return (
              <tr key={m.name} className={`border-b border-slate-100 ${isBest ? 'bg-agri-50/60' : ''}`}>
                <td className="py-3 pr-4 font-medium text-slate-800">
                  {m.name} {isBest && <span className="badge bg-agri-100 text-agri-700 ml-1">Best</span>}
                </td>
                <td className="py-3 pr-4 text-slate-600">{m.distanceKm} km</td>
                <td className="py-3 pr-4 text-slate-600">₹{m.modalPrice}/kg</td>
                <td className="py-3 pr-4 text-slate-600">₹{m.transportCostPerKg?.toFixed(2)}/kg</td>
                <td className="py-3 pr-4 font-bold text-agri-700">₹{m.netRealization}/kg</td>
                <td className={`py-3 pr-4 ${trendColor[m.trend]}`}><TrendIcon size={16} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
