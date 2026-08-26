// services/trustScoreService.js
//
// Deterministic "AgriSphere Buyer Trust Score" (spec section 8).
// This is explicitly NOT a credit score — it is a simple weighted
// blend of demo/seeded reliability signals, shown with an explanation
// of what feeds into it.
//
//   completedTransactions   -> capped contribution, more history = more trust
//   paymentReliabilityPct   -> heaviest weight
//   disputedTransactionsPct -> penalty
//   verified                -> flat bonus

export function calculateTrustScore(buyer) {
  const {
    completedTransactions = 0,
    paymentReliabilityPct = 0,
    disputedTransactionsPct = 0,
    verified = false,
  } = buyer;

  const historyScore = Math.min(completedTransactions, 50) / 50 * 20; // up to 20 pts
  const reliabilityScore = (paymentReliabilityPct / 100) * 50;         // up to 50 pts
  const disputePenalty = (disputedTransactionsPct / 100) * 20;         // up to -20 pts
  const verifiedBonus = verified ? 10 : 0;                             // 10 pts flat

  const raw = historyScore + reliabilityScore + verifiedBonus - disputePenalty + 20; // +20 base
  const score = Math.max(0, Math.min(100, Math.round(raw)));

  return {
    score,
    label: 'AgriSphere Buyer Trust Score',
    factors: [
      `${completedTransactions} completed transactions on record`,
      `${paymentReliabilityPct}% on-time payment rate`,
      `${disputedTransactionsPct}% of past transactions disputed`,
      verified ? 'Identity verified on AgriSphere' : 'Not yet verified',
    ],
    disclaimer: 'This is not an official credit score. It is derived from demo/seeded reliability data for this prototype.',
  };
}
