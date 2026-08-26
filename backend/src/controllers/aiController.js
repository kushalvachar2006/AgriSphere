// controllers/aiController.js
import { asyncHandler } from '../middleware/asyncHandler.js';
import { answerFarmerQuestion } from '../services/geminiService.js';

// POST /api/ai/ask  { question, context }
// `context` is application data the frontend already has on screen
// (market comparison, buyer matches, recommendation, etc.) — the
// assistant is only allowed to reason over this, never invent numbers.
export const askAssistant = asyncHandler(async (req, res) => {
  const { question, context } = req.body;
  if (!question) return res.status(400).json({ success: false, message: 'question is required' });

  const result = await answerFarmerQuestion(question, context || {});
  res.json({ success: true, ...result });
});
