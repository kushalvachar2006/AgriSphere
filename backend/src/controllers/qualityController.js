// controllers/qualityController.js
import { asyncHandler } from '../middleware/asyncHandler.js';
import { analyzeCropQuality } from '../services/geminiService.js';

// POST /api/quality/analyze  { imageBase64, mimeType, cropHint }
export const analyzeQuality = asyncHandler(async (req, res) => {
  const { imageBase64, mimeType, cropHint } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ success: false, message: 'imageBase64 is required' });
  }
  const result = await analyzeCropQuality(imageBase64, mimeType || 'image/jpeg', cropHint);
  res.json({ success: true, ...result });
});
