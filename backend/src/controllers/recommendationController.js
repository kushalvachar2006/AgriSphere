// controllers/recommendationController.js
//
// Orchestrates the "wow moment" screen (spec section 28): pulls markets,
// buyers, storage and logistics; runs the deterministic profit maximizer
// to find the best net realization; then asks Gemini ONLY to reason
// about sale timing and explain the result.
import { asyncHandler } from '../middleware/asyncHandler.js';
import Market from '../models/Market.js';
import Buyer from '../models/Buyer.js';
import Storage from '../models/Storage.js';
import Logistics from '../models/Logistics.js';
import { calculateNetRealization, rankByNetRealization } from '../services/profitCalculator.js';
import { calculateTrustScore } from '../services/trustScoreService.js';
import { getSaleRecommendation } from '../services/geminiService.js';

// POST /api/recommendation  { crop, quantityTonnes, grade, location, storageAvailable }
export const generateRecommendation = asyncHandler(async (req, res) => {
  const { crop, quantityTonnes, grade, storageAvailable } = req.body;
  if (!crop || !quantityTonnes) {
    return res.status(400).json({ success: false, message: 'crop and quantityTonnes are required' });
  }

  const [markets, buyers, storageFacilities, logisticsOptions] = await Promise.all([
    Market.find({ crop }).lean(),
    Buyer.find({ cropRequired: crop }).lean(),
    Storage.find({}).lean(),
    Logistics.find({}).lean(),
  ]);

  // --- Rank markets by net realization ---
  const marketOptions = markets.map((m) => {
    const route = logisticsOptions.find((l) => l.destination === m.name);
    const transportCostPerKg = route ? route.costPerKg : Math.max(0.3, (m.distanceKm || 10) * 0.02);
    return { label: m.name, type: 'market', sellingPricePerKg: m.modalPrice, transportCostPerKg };
  });

  // --- Rank buyer offers by net realization ---
  const nearestStorage = storageFacilities.sort((a, b) => a.distanceKm - b.distanceKm)[0];
  const buyerOptions = buyers.map((b) => {
    const route = logisticsOptions.find((l) => l.destination === b.location);
    const transportCostPerKg = route ? route.costPerKg : Math.max(0.3, (b.distanceKm || 10) * 0.02);
    return { label: b.name, type: 'buyer', sellingPricePerKg: b.offerPricePerKg, transportCostPerKg, buyerRef: b };
  });

  const allOptions = rankByNetRealization([...marketOptions, ...buyerOptions]);
  const best = allOptions[0];

  if (!best) {
    return res.json({ success: true, message: `No market or buyer data available for ${crop} yet.` });
  }

  // --- Historical trend (very simple: compare last two seeded points) ---
  const trend = markets[0]?.trend || 'stable';

  // --- Gemini: sale timing recommendation + explanation ---
  const aiInput = {
    crop,
    quantityTonnes,
    grade,
    bestOption: best.label,
    bestNetRealization: best.breakdown.netRealization,
    trend,
    storageAvailable: !!storageAvailable,
    storageCostPerKgPerDay: nearestStorage?.costPerKgPerDay ?? 0.5,
    topAlternatives: allOptions.slice(1, 3).map((o) => ({ label: o.label, netRealization: o.breakdown.netRealization })),
  };
  const aiRecommendation = await getSaleRecommendation(aiInput);

  const bestBuyerTrust = best.buyerRef ? calculateTrustScore(best.buyerRef) : null;

  res.json({
    success: true,
    bestOption: {
      label: best.label,
      type: best.type,
      breakdown: best.breakdown,
      trust: bestBuyerTrust,
    },
    allOptions: allOptions.map((o) => ({ label: o.label, type: o.type, breakdown: o.breakdown })),
    logistics: logisticsOptions.find((l) => l.destination === best.label) || null,
    storage: nearestStorage || null,
    aiRecommendation,
    disclaimer: 'AI-assisted recommendation. Prices are indicative and not guaranteed.',
  });
});
