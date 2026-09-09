// api/client.js — tiny fetch wrapper shared by all pages.
// Centralizing this makes it easy to add error handling or a base URL
// change in exactly one place.
const BASE = import.meta.env.VITE_API_URL||'/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request to ${path} failed`);
  }
  return data;
}

export const api = {
  getDemoFarmer: () => request('/farmers/demo'),
  getFarmer: (id) => request(`/farmers/${id}`),
  listFarmers: (params = {}) => request(`/farmers?${new URLSearchParams(params)}`),
  matchFarmersForBuyer: (body) => request('/farmers/match', { method: 'POST', body: JSON.stringify(body) }),
  getMarkets: (params = {}) => request(`/markets?${new URLSearchParams(params)}`),
  getMarketTrends: (params = {}) => request(`/markets/trends?${new URLSearchParams(params)}`),
  getBuyers: (params = {}) => request(`/buyers?${new URLSearchParams(params)}`),
  createBuyerRequirement: (body) => request('/buyers', { method: 'POST', body: JSON.stringify(body) }),
  matchBuyers: (body) => request('/buyers/match', { method: 'POST', body: JSON.stringify(body) }),
  getStorage: () => request('/storage'),
  getLogistics: (params = {}) => request(`/logistics?${new URLSearchParams(params)}`),
  getRecommendation: (body) => request('/recommendation', { method: 'POST', body: JSON.stringify(body) }),
  analyzeQuality: (body) => request('/quality/analyze', { method: 'POST', body: JSON.stringify(body) }),
  createLot: (body) => request('/lots', { method: 'POST', body: JSON.stringify(body) }),
  listLots: (params = {}) => request(`/lots?${new URLSearchParams(params)}`),
  getLot: (id) => request(`/lots/${id}`),
  matchLotsForBuyer: (body) => request('/lots/match', { method: 'POST', body: JSON.stringify(body) }),
  listTransactions: () => request('/transactions'),
  createTransaction: (body) => request('/transactions', { method: 'POST', body: JSON.stringify(body) }),
  updateTransactionStatus: (id, status) => request(`/transactions/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  createDispute: (body) => request('/disputes', { method: 'POST', body: JSON.stringify(body) }),
  listDisputes: () => request('/disputes'),
  askAssistant: (body) => request('/ai/ask', { method: 'POST', body: JSON.stringify(body) }),

  // --- Feature 1: Arrival Volume Intelligence ---
  getArrivals: (params = {}) => request(`/arrivals?${new URLSearchParams(params)}`),

  // --- Feature 2: Buyer Demand Forecasting ---
  getDemandForecast: (params = {}) => request(`/demand-forecast?${new URLSearchParams(params)}`),

  // --- Feature 3: Digital Offer & Negotiation System ---
  createOffer: (body) => request('/offers', { method: 'POST', body: JSON.stringify(body) }),
  listOffers: (params = {}) => request(`/offers?${new URLSearchParams(params)}`),
  getOffer: (id) => request(`/offers/${id}`),
  counterOffer: (id, body) => request(`/offers/${id}/counter`, { method: 'POST', body: JSON.stringify(body) }),
  acceptOffer: (id) => request(`/offers/${id}/accept`, { method: 'PATCH' }),
  rejectOffer: (id) => request(`/offers/${id}/reject`, { method: 'PATCH' }),
  withdrawOffer: (id) => request(`/offers/${id}/withdraw`, { method: 'PATCH' }),

  // --- Feature 5: Multi-Channel Market Comparison ---
  compareChannels: (params = {}) => request(`/channels/compare?${new URLSearchParams(params)}`),
};