// controllers/lotController.js
import { asyncHandler } from '../middleware/asyncHandler.js';
import Lot from '../models/Lot.js';
import Buyer from '../models/Buyer.js';

// POST /api/lots  { crop, grade, contributions: [{farmerName, quantityTonnes}] }
export const createLot = asyncHandler(async (req, res) => {
  const { crop, grade, contributions } = req.body;
  if (!crop || !Array.isArray(contributions) || !contributions.length) {
    return res.status(400).json({ success: false, message: 'crop and contributions[] are required' });
  }
  const lot = await Lot.create({ crop, grade, contributions, status: 'FORMING' });
  res.status(201).json({ success: true, lot });
});

// GET /api/lots/:id
export const getLot = asyncHandler(async (req, res) => {
  const lot = await Lot.findById(req.params.id).lean();
  if (!lot) return res.status(404).json({ success: false, message: 'Lot not found' });

  // Show compatible buyer demand for this lot's crop, to demonstrate the
  // "fragmented quantities -> buyer-ready lot" story (spec section 11).
  const compatibleBuyers = await Buyer.find({
    cropRequired: lot.crop,
    quantityRequiredTonnes: { $lte: lot.totalQuantityTonnes },
  }).lean();

  res.json({ success: true, lot, compatibleBuyers });
});
