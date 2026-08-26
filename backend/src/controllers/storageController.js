// controllers/storageController.js
import { asyncHandler } from '../middleware/asyncHandler.js';
import Storage from '../models/Storage.js';

// GET /api/storage
export const listStorage = asyncHandler(async (req, res) => {
  const facilities = await Storage.find({}).sort({ distanceKm: 1 }).lean();
  res.json({ success: true, facilities });
});
