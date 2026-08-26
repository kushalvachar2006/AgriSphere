// controllers/buyerController.js
import { asyncHandler } from '../middleware/asyncHandler.js';
import Buyer from '../models/Buyer.js';
import { calculateTrustScore } from '../services/trustScoreService.js';
import { matchBuyers } from '../services/matchingService.js';
import { explainBuyerMatch } from '../services/geminiService.js';

// GET /api/buyers?crop=Tomato
export const listBuyers = asyncHandler(async (req, res) => {
  const { crop } = req.query;
  const query = crop ? { cropRequired: crop } : {};
  const buyers = await Buyer.find(query).lean();

  const withTrust = buyers.map((b) => ({ ...b, trust: calculateTrustScore(b) }));
  res.json({ success: true, buyers: withTrust });
});

// POST /api/buyers/match  { crop, quantityTonnes, grade }
export const matchBuyersHandler = asyncHandler(async (req, res) => {
  const { crop, quantityTonnes, grade } = req.body;
  if (!crop || !quantityTonnes) {
    return res.status(400).json({ success: false, message: 'crop and quantityTonnes are required' });
  }

  const buyers = await Buyer.find({ cropRequired: crop }).lean();
  if (!buyers.length) {
    return res.json({ success: true, matches: [], message: 'No buyers currently seeking this crop.' });
  }

  const withTrust = buyers.map((b) => ({ ...b, trustScore: calculateTrustScore(b).score }));
  const maxOfferPrice = Math.max(...withTrust.map((b) => b.offerPricePerKg));

  const ranked = matchBuyers({ crop, quantityTonnes, grade }, withTrust, maxOfferPrice);
  const top3 = ranked.slice(0, 3);

  const aiExplanation = await explainBuyerMatch({
    farmerLot: { crop, quantityTonnes, grade },
    rankedBuyers: top3.map((r) => ({ name: r.buyer.name, matchPercent: r.matchPercent, offerPricePerKg: r.buyer.offerPricePerKg })),
  });

  res.json({ success: true, matches: ranked, aiExplanation });
});
