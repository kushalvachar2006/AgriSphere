// pages/FarmerSelect.jsx — "which farmer's dashboard am I viewing?"
//
// Sits in front of the Farmer role the way a match list sits in front of
// a cricket scorecard: pick one, then every tab (Dashboard, Buyers,
// Offers, Transactions) is scoped to that farmer via FarmerContext,
// instead of the whole role being hardcoded to a single farmer.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, MapPin, Wheat } from 'lucide-react';
import { api } from '../api/client.js';

export default function FarmerSelect() {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.listFarmers()
      .then((res) => setFarmers(res.farmers))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!farmers) return <p className="text-slate-500 flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Loading farmers…</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Whose dashboard?</h1>
        <p className="text-slate-500 text-sm mt-1">Select a farmer to view their selling dashboard.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {farmers.map((f) => (
          <button
            key={f._id}
            onClick={() => navigate(`/farmer/${f._id}`)}
            className="card text-left hover:shadow-md hover:border-agri-200 transition-shadow"
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-agri-50 text-agri-700 flex items-center justify-center shrink-0">
                <Wheat size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-800">{f.name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin size={11} /> {f.location?.district}, {f.location?.state}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              {f.currentCrop?.crop} · {f.currentCrop?.quantityTonnes}T · Grade {f.currentCrop?.grade}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
