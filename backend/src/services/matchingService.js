// services/matchingService.js
//
// Deterministic buyer matching (spec section 9). Gemini is only used
// afterwards to explain the ranked list in plain language — it never
// decides the ranking itself.

const WEIGHTS = {
  cropCompatibility: 0.25,
  quantityCompatibility: 0.20,
  offerPrice: 0.20,
  distance: 0.10,
  qualityCompatibility: 0.10,
  trustScore: 0.10,
  requiredByDate: 0.05,
};

/**
 * @param {Object} farmerLot - { crop, quantityTonnes, grade }
 * @param {Array} buyers - buyer docs, each already carrying a `trustScore` (0-100)
 * @param {number} maxOfferPrice - highest offer among candidates, used to normalize price score
 */
export function matchBuyers(farmerLot, buyers, maxOfferPrice) {
  const scored = buyers.map((buyer) => {
    const cropCompatibility = buyer.cropRequired?.toLowerCase() === farmerLot.crop?.toLowerCase() ? 100 : 0;

    const quantityCompatibility = scoreRatio(farmerLot.quantityTonnes, buyer.quantityRequiredTonnes);

    const offerPrice = maxOfferPrice > 0
      ? Math.min(100, (buyer.offerPricePerKg / maxOfferPrice) * 100)
      : 0;

    const distance = scoreDistance(buyer.distanceKm);

    const qualityCompatibility = gradeScore(farmerLot.grade, buyer.gradeRequired);

    const trustScore = buyer.trustScore ?? 50;

    const requiredByDate = dateUrgencyScore(buyer.requiredByDate);

    const matchPercent = Math.round(
      cropCompatibility * WEIGHTS.cropCompatibility +
      quantityCompatibility * WEIGHTS.quantityCompatibility +
      offerPrice * WEIGHTS.offerPrice +
      distance * WEIGHTS.distance +
      qualityCompatibility * WEIGHTS.qualityCompatibility +
      trustScore * WEIGHTS.trustScore +
      requiredByDate * WEIGHTS.requiredByDate,
    );

    return { buyer, matchPercent };
  });

  return scored.sort((a, b) => b.matchPercent - a.matchPercent);
}

function scoreRatio(have, want) {
  if (!want) return 50;
  const ratio = have / want;
  if (ratio >= 1) return 100;         // buyer needs less than or equal to what farmer has
  return Math.max(0, Math.round(ratio * 100));
}

function scoreDistance(distanceKm = 0) {
  // 0km -> 100, 200km+ -> 0, linear in between
  return Math.max(0, Math.round(100 - Math.min(distanceKm, 200) / 2));
}

function gradeScore(farmerGrade, requiredGrade) {
  if (!requiredGrade) return 100;
  if (farmerGrade === requiredGrade) return 100;
  const order = ['C', 'B', 'A'];
  const diff = Math.abs(order.indexOf(farmerGrade) - order.indexOf(requiredGrade));
  return Math.max(0, 100 - diff * 40);
}

function dateUrgencyScore(requiredByDate) {
  if (!requiredByDate) return 50;
  const days = (new Date(requiredByDate) - new Date()) / (1000 * 60 * 60 * 24);
  if (days <= 3) return 100;   // urgent demand = good for a farmer who wants to sell now
  if (days <= 10) return 70;
  return 40;
}
