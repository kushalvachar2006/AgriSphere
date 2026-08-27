
// pages/BuyerForecast.jsx — thin wrapper around the existing Demand
// Forecasting feature, scoped to this buyer's own procurement history
// (already seeded for "ABC Foods (Demo)" — see backend seed data).
import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import DemandForecastPanel from '../components/DemandForecastPanel.jsx';
import { BUYER_NAME } from './BuyerDashboard.jsx';

const CROPS = ['Tomato', 'Onion', 'Potato', 'Paddy'];

export default function BuyerForecast() {
  const [crop, setCrop] = useState('Tomato');
  const [forecast, setForecast] = useState(null);
  const [aiExplanation, setAiExplanation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getDemandForecast({ crop, buyerName: BUYER_NAME }).then((res) => {
      setForecast(res.forecast);
      setAiExplanation(res.aiExplanation);
      setMessage(res.message || '');
    });
  }, [crop]);

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">Procurement Forecast</h1>
        <select value={crop} onChange={(e) => setCrop(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm">
          {CROPS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <DemandForecastPanel forecast={forecast} aiExplanation={aiExplanation} message={message} />
    </div>
  );
}