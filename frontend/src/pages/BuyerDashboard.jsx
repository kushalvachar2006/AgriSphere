// pages/BuyerDashboard.jsx — Buyer role home screen.
//
// Procurement-oriented: "how do I source the right produce at the right
// price?". Reuses GET /api/buyers (filtered by this buyer's name), GET
// /api/offers, and GET /api/transactions — no new backend calculations.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Handshake, Boxes, Truck, ArrowRight } from 'lucide-react';
import { api } from '../api/client.js';
import StatCard from '../components/StatCard.jsx';

export const BUYER_NAME = 'ABC Foods (Demo)'; // the demo buyer identity this role represents

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState([]);
  const [offers, setOffers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [lotsSeen, setLotsSeen] = useState(0);

  useEffect(() => {
    api.getBuyers({ name: BUYER_NAME }).then((res) => setRequirements(res.buyers || []));
    api.listOffers({ buyerName: BUYER_NAME }).then((res) => setOffers(res.offers || []));
    api.listTransactions().then((res) => setTransactions((res.transactions || []).filter((t) => t.buyerName === BUYER_NAME)));
    api.listLots({}).then((res) => setLotsSeen((res.lots || []).length));
  }, []);

  useEffect(() => {
    window.__agrisphereContext = { ...(window.__agrisphereContext || {}), buyerRequirements: requirements, buyerOffers: offers };
  }, [requirements, offers]);

  const pendingOffers = offers.filter((o) => o.status === 'PENDING' || o.status === 'COUNTERED').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Welcome, {BUYER_NAME}</h1>
        <p className="text-slate-500 text-sm mt-1">Procure the right quantity and quality at the right price.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Requirements" value={requirements.length} icon={ClipboardList} tone="warn" />
        <StatCard label="Pending Offers" value={pendingOffers} icon={Handshake} tone="intel" />
        <StatCard label="Smart Lots Available" value={lotsSeen} icon={Boxes} tone="agri" />
        <StatCard label="Active Transactions" value={transactions.length} icon={Truck} tone="agri" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <ActionCard title="Post a Requirement" desc="Tell the market what you need to procure." onClick={() => navigate('/buyer/requirements')} />
        <ActionCard title="Find Produce" desc="Discover Smart Lots that match your requirements." onClick={() => navigate('/buyer/find-produce')} />
        <ActionCard title="Demand Forecast" desc="See your projected procurement for next period." onClick={() => navigate('/buyer/forecast')} />
      </div>

      <div className="card">
        <h2 className="font-bold text-slate-800 mb-3">Procurement Requirements</h2>
        {requirements.length ? (
          <ul className="divide-y divide-slate-100">
            {requirements.map((r) => {
              const received = transactions
                .filter((t) => t.crop === r.cropRequired)
                .reduce((sum, t) => sum + t.quantityTonnes, 0);
              const remaining = Math.max(0, r.quantityRequiredTonnes - received);
              return (
                <li key={r._id} className="py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{r.cropRequired} — Grade {r.gradeRequired}</span>
                    <span className="text-xs text-slate-400">Required by {r.requiredByDate ? new Date(r.requiredByDate).toLocaleDateString() : '—'}</span>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    Required: {r.quantityRequiredTonnes}T · Received: {received}T · Remaining: {remaining}T · Target: ₹{r.offerPricePerKg}/kg
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No requirements posted yet — click "Post a Requirement" above to add one.</p>
        )}
      </div>
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