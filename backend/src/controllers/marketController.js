// controllers/marketController.js
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getMarketPrices } from '../services/marketDataService.js';
import { calculateNetRealization } from '../services/profitCalculator.js';
import Logistics from '../models/Logistics.js';
import PriceHistory from '../models/PriceHistory.js';

// GET /api/markets?crop=Tomato&state=Karnataka
export const listMarkets = asyncHandler(async (req, res) => {
  const { crop, state, district } = req.query;
  const { markets, source, message } = await getMarketPrices({ crop, state, district });

  // Attach net realization per market using logistics cost if we have a
  // matching route on file (falls back to a flat estimate otherwise).
  const logisticsOptions = await Logistics.find({}).lean();

  const enriched = markets.map((m) => {
    const route = logisticsOptions.find((l) => l.destination === m.name) || null;
    const transportCostPerKg = route ? route.costPerKg : Math.max(0.3, m.distanceKm * 0.02);
    const breakdown = calculateNetRealization({
      sellingPricePerKg: m.modalPrice,
      transportCostPerKg,
    });
    return { ...m, transportCostPerKg, ...breakdown };
  }).sort((a, b) => b.netRealization - a.netRealization);

  res.json({ success: true, source, message, markets: enriched });
});

// GET /api/markets/trends?crop=Tomato&market=Kolar APMC
export const getMarketTrends = asyncHandler(async (req, res) => {
  const { crop, market } = req.query;
  if (!crop) return res.status(400).json({ success: false, message: 'crop is required' });

  const query = { crop };
  if (market) query.market = market;

  const history = await PriceHistory.find(query).sort({ date: 1 }).lean();
  res.json({ success: true, history });
});
