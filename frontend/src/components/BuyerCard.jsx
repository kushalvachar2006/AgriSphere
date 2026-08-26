import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export default function BuyerCard({ buyer, matchPercent, onViewMatch }) {
  const trust = buyer.trust?.score ?? buyer.trustScore;
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-slate-800">{buyer.name}</h3>
          <p className="text-sm text-slate-500">{buyer.cropRequired} — Grade {buyer.gradeRequired}</p>
        </div>
        {matchPercent != null && (
          <span className="badge bg-intel-50 text-intel-700 font-bold">{matchPercent}% match</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div><span className="text-slate-400">Quantity: </span><span className="font-medium text-slate-700">{buyer.quantityRequiredTonnes} t</span></div>
        <div><span className="text-slate-400">Offer: </span><span className="font-bold text-agri-700">₹{buyer.offerPricePerKg}/kg</span></div>
        <div className="flex items-center gap-1 text-slate-500"><MapPin size={14} />{buyer.location}</div>
        <div><span className="text-slate-400">Required by: </span>{buyer.requiredByDate ? new Date(buyer.requiredByDate).toLocaleDateString() : '—'}</div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {buyer.verified && <span className="badge bg-agri-50 text-agri-700"><ShieldCheck size={12} /> Verified</span>}
          {trust != null && <span className="badge bg-slate-100 text-slate-600">Trust {trust}/100</span>}
        </div>
        <button onClick={() => onViewMatch?.(buyer)} className="text-sm font-semibold text-intel-700 flex items-center gap-1 hover:underline">
          View Match <ArrowRight size={14} />
        </button>
      </div>
      <p className="text-[11px] text-slate-400">Demo buyer for prototype purposes — not a real company.</p>
    </div>
  );
}
