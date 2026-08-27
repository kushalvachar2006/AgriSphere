// pages/FPODashboard.jsx — FPO role home screen.
//
// Aggregation-oriented: "how can we combine and sell our produce?".
// Overview numbers are derived from real Lot/Offer documents already
// returned by existing endpoints (GET /api/lots, GET /api/offers) — not
// invented — so the dashboard stays honest even before an FPO has any
// activity yet (it will simply show zeros).
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Boxes, Users2, Package, Handshake, ArrowRight, Receipt } from 'lucide-react';
import { api } from '../api/client.js';
import StatCard from '../components/StatCard.jsx';

export const FPO_NAME = 'Kolar Tomato Producers FPO';
const CROP = 'Tomato'; // demo FPO deals primarily in Tomato, matching the seeded Smart Lot story

export default function FPODashboard() {
  const navigate = useNavigate();
  const [lots, setLots] = useState([]);
  const [offers, setOffers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [settlementTxId, setSettlementTxId] = useState('');

  const load = () => {
    api.listLots({ crop: CROP }).then((res) => setLots(res.lots || []));
    api.listOffers({ farmerName: FPO_NAME }).then((res) => setOffers(res.offers || []));
    api.listTransactions().then((res) => setTransactions((res.transactions || []).filter((t) => t.farmerName === FPO_NAME)));
  };
  useEffect(() => { load(); }, []);

  useEffect(() => {
    window.__agrisphereContext = { ...(window.__agrisphereContext || {}), fpoLots: lots, fpoOffers: offers };
  }, [lots, offers]);

  const activeFarmers = new Set(lots.flatMap((l) => l.contributions.map((c) => c.farmerName))).size;
  const produceAvailable = lots.reduce((sum, l) => sum + (l.totalQuantityTonnes || 0), 0);
  const activeLots = lots.length;
  const pendingOffers = offers.filter((o) => o.status === 'PENDING' || o.status === 'COUNTERED').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{FPO_NAME}</h1>
          <p className="text-slate-500 text-sm mt-1">Aggregate produce, form Smart Lots, and connect with the right buyers.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Farmers" value={activeFarmers} sub="contributing to current lots" icon={Users2} tone="agri" />
        <StatCard label="Produce Available" value={`${produceAvailable} T`} sub={CROP} icon={Package} tone="intel" />
        <StatCard label="Active Smart Lots" value={activeLots} icon={Boxes} tone="agri" />
        <StatCard label="Pending Offers" value={pendingOffers} icon={Handshake} tone="warn" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <ActionCard
          title="Create / View Smart Lots"
          desc="Pool farmer contributions into one buyer-ready lot."
          onClick={() => navigate('/fpo/lot')}
        />
        <ActionCard
          title="Buyer Matches"
          desc="See which buyers are the best fit for your produce."
          onClick={() => navigate('/fpo/buyers')}
        />
        <ActionCard
          title="Offers & Negotiation"
          desc="Review incoming offers and counter-negotiate terms."
          onClick={() => navigate('/fpo/offers')}
        />
      </div>

      {lots.length > 0 && (
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-3">Current Smart Lots</h2>
          <ul className="divide-y divide-slate-100">
            {lots.map((l) => (
              <li key={l._id} className="py-2 flex items-center justify-between text-sm">
                <span>{l.crop} · {l.totalQuantityTonnes}T · Grade {l.grade} · {l.contributions.length} farmers</span>
                <span className="badge bg-slate-100 text-slate-600">{l.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {transactions.length > 0 && (
        <SettlementView
          transactions={transactions}
          lots={lots}
          selectedId={settlementTxId}
          onSelect={setSettlementTxId}
        />
      )}
    </div>
  );
}

// Settlement is computed purely from fields the Transaction model already
// stores (quantityTonnes, agreedPricePerKg, netRealizationPerKg) — no new
// backend calculation is added. Per-farmer share is a simple proportional
// split against a matching Lot's real contribution ratios, shown only
// when a lot with the same quantity is available to link against.
function SettlementView({ transactions, lots, selectedId, onSelect }) {
  const tx = transactions.find((t) => t._id === selectedId) || transactions[0];
  const matchingLot = lots.find((l) => l.totalQuantityTonnes === tx.quantityTonnes && l.crop === tx.crop);

  const totalSaleValue = Math.round(tx.quantityTonnes * 1000 * tx.agreedPricePerKg);
  const netSettlement = Math.round(tx.quantityTonnes * 1000 * tx.netRealizationPerKg);
  const costsDeducted = totalSaleValue - netSettlement;

  return (
    <div className="card">
      <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Receipt size={18} className="text-intel-600" /> Settlement Summary</h2>
      <select value={tx._id} onChange={(e) => onSelect(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm mb-4">
        {transactions.map((t) => (
          <option key={t._id} value={t._id}>{t.crop} — {t.quantityTonnes}T → {t.buyerName} ({t.status})</option>
        ))}
      </select>

      <div className="space-y-1 text-sm max-w-sm">
        <Row label="Total Sale Value" value={`₹${totalSaleValue.toLocaleString('en-IN')}`} />
        <Row label="Transport, Storage & Transaction Costs" value={`-₹${costsDeducted.toLocaleString('en-IN')}`} negative />
        <div className="border-t border-slate-200 pt-1">
          <Row label="Net Settlement" value={`₹${netSettlement.toLocaleString('en-IN')}`} bold />
        </div>
      </div>

      {matchingLot ? (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2">Farmer Contributions & Expected Share</p>
          <ul className="text-sm space-y-1">
            {matchingLot.contributions.map((c) => {
              const share = c.quantityTonnes / matchingLot.totalQuantityTonnes;
              return (
                <li key={c.farmerName} className="flex justify-between">
                  <span>{c.farmerName} ({c.quantityTonnes}T)</span>
                  <span className="font-semibold text-agri-700">₹{Math.round(netSettlement * share).toLocaleString('en-IN')}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="text-xs text-slate-400 mt-3">No matching Smart Lot found for this transaction's quantity — farmer-wise share is unavailable.</p>
      )}
    </div>
  );
}

function Row({ label, value, negative, bold }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={`${bold ? 'font-extrabold text-agri-700' : 'font-medium'} ${negative ? 'text-red-500' : 'text-slate-800'}`}>{value}</span>
    </div>
  );
}

function ActionCard({ title, desc, onClick }) {
  return (
    <button onClick={onClick} className="card text-left hover:shadow-md transition-shadow">
      <h3 className="font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
      <span className="text-sm font-semibold text-intel-700 flex items-center gap-1 mt-3">Open <ArrowRight size={14} /></span>
    </button>
  );
}