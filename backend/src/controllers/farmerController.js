// controllers/farmerController.js
import { asyncHandler } from '../middleware/asyncHandler.js';
import Farmer from '../models/Farmer.js';

// GET /api/farmers/demo — returns the preconfigured demo farmer (spec section 19)
export const getDemoFarmer = asyncHandler(async (req, res) => {
  const farmer = await Farmer.findOne({ name: 'Ramesh Kumar' }).lean();
  if (!farmer) return res.status(404).json({ success: false, message: 'Demo farmer not seeded yet — run npm run seed' });
  res.json({ success: true, farmer });
});
