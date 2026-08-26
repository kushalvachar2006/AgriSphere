// api/client.js — tiny fetch wrapper shared by all pages.
// Centralizing this makes it easy to add error handling or a base URL
// change in exactly one place.
const BASE = '/api';

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
  getMarkets: (params = {}) => request(`/markets?${new URLSearchParams(params)}`),
  getMarketTrends: (params = {}) => request(`/markets/trends?${new URLSearchParams(params)}`),
  getBuyers: (params = {}) => request(`/buyers?${new URLSearchParams(params)}`),
  matchBuyers: (body) => request('/buyers/match', { method: 'POST', body: JSON.stringify(body) }),
  getStorage: () => request('/storage'),
  getLogistics: (params = {}) => request(`/logistics?${new URLSearchParams(params)}`),
  getRecommendation: (body) => request('/recommendation', { method: 'POST', body: JSON.stringify(body) }),
  analyzeQuality: (body) => request('/quality/analyze', { method: 'POST', body: JSON.stringify(body) }),
  createLot: (body) => request('/lots', { method: 'POST', body: JSON.stringify(body) }),
  getLot: (id) => request(`/lots/${id}`),
  listTransactions: () => request('/transactions'),
  createTransaction: (body) => request('/transactions', { method: 'POST', body: JSON.stringify(body) }),
  updateTransactionStatus: (id, status) => request(`/transactions/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  createDispute: (body) => request('/disputes', { method: 'POST', body: JSON.stringify(body) }),
  listDisputes: () => request('/disputes'),
  askAssistant: (body) => request('/ai/ask', { method: 'POST', body: JSON.stringify(body) }),
};
