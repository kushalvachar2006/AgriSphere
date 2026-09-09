// controllers/farmerController.js
import { asyncHandler } from '../middleware/asyncHandler.js';
import Farmer from '../models/Farmer.js';
import { matchFarmersToBuyerRequirement } from '../services/matchingService.js';

// GET /api/farmers/demo — returns the preconfigured demo farmer (spec section 19)
export const getDemoFarmer = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findOne({ name: 'Ramesh Kumar' }).lean();
  if (!farmer) return res.status(404).json({ success: false, message: 'Demo farmer not seeded yet — run npm run seed' });
  res.json({ success: true, farmer });
});

// GET /api/farmers/:id — fetch a single farmer by their Mongo _id.
// This is what makes the Farmer dashboard work "per farmer" (like a
// cricket scorecard keyed by matchId) instead of always resolving to
// the one hardcoded demo farmer via getDemoFarmer above.
export const getFarmer = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findById(req.params.id).lean();
  if (!farmer) return res.status(404).json({ success: false, message: 'Farmer not found' });
  res.json({ success: true, farmer });
});

// GET /api/farmers?crop=Tomato — list individual farmers with produce for
// a crop. Added so the Buyer role can discover standalone farmer produce,
// not just FPO Smart Lots — previously there was no way to list farmers
// at all (only the single demo farmer via /demo).
export const listFarmers = asyncHandler(async (req, res) => {
  const { crop } = req.query;
  const query = crop ? { 'currentCrop.crop': crop } : {};
  const farmers = await Farmer.find(query).lean();
  res.json({ success: true, farmers });
});

// POST /api/farmers/match  { crop, quantityRequiredTonnes, gradeRequired }
// Buyer-side counterpart to POST /api/lots/match — ranks individual
// farmers' produce against a buyer's posted requirement using the same
// deterministic crop/quantity/grade compatibility approach (see
// services/matchingService.js: matchFarmersToBuyerRequirement).
export const matchFarmersForBuyer = asyncHandler(async (req, res) => {
  const { crop, quantityRequiredTonnes, gradeRequired } = req.body;
  if (!crop) {
    return res.status(400).json({ success: false, message: 'crop is required' });
  }

  const farmers = await Farmer.find({ 'currentCrop.crop': crop }).lean();
  if (!farmers.length) {
    return res.json({ success: true, matches: [], message: 'No individual farmer produce currently available for this crop.' });
  }

  const ranked = matchFarmersToBuyerRequirement({ crop, quantityRequiredTonnes, gradeRequired }, farmers);
  res.json({ success: true, matches: ranked });
});