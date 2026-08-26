// services/geminiService.js
//
// The ONLY file that talks to Gemini. Centralizes:
//   - the official @google/genai client
//   - structured-JSON parsing (with a safety strip for stray ``` fences)
//   - a graceful fallback path when the Gemini API key is missing or the
//     call fails, so the demo never breaks on stage (spec section 24).
//
// Prompts live in ai/prompts/ — this file just wires them to the model.
import { GoogleGenAI } from '@google/genai';
import { buildSaleRecommendationPrompt } from '../ai/prompts/saleRecommendation.js';
import { buildBuyerMatchExplanationPrompt } from '../ai/prompts/buyerMatchExplanation.js';
import { buildQualityGradingPrompt } from '../ai/prompts/qualityGrading.js';
import { buildFarmerAssistantPrompt } from '../ai/prompts/farmerAssistant.js';

const MODEL = 'gemini-2.5-flash';

let client = null;
function getClient() {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!client) client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
}

/** Calls Gemini with a text-only prompt and parses the JSON response. */
async function callGeminiJSON(prompt) {
  const ai = getClient();
  if (!ai) throw new Error('GEMINI_API_KEY not configured');

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });

  const text = response.text ?? response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return parseJSON(text);
}

/** Calls Gemini Vision with an image (base64) + text prompt. */
async function callGeminiVisionJSON(prompt, imageBase64, mimeType = 'image/jpeg') {
  const ai = getClient();
  if (!ai) throw new Error('GEMINI_API_KEY not configured');

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: imageBase64 } },
        ],
      },
    ],
    config: { responseMimeType: 'application/json' },
  });

  const text = response.text ?? response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return parseJSON(text);
}

function parseJSON(text) {
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

// ---------- Public functions used by controllers ----------

export async function getSaleRecommendation(data) {
  try {
    const prompt = buildSaleRecommendationPrompt(data);
    const result = await callGeminiJSON(prompt);
    return { ...result, aiAvailable: true };
  } catch (err) {
    console.error('Gemini sale recommendation failed, using rule-based fallback:', err.message);
    return ruleBasedSaleRecommendation(data);
  }
}

export async function explainBuyerMatch(data) {
  try {
    const prompt = buildBuyerMatchExplanationPrompt(data);
    const result = await callGeminiJSON(prompt);
    return { ...result, aiAvailable: true };
  } catch (err) {
    console.error('Gemini buyer match explanation failed, using fallback:', err.message);
    return {
      summary: 'AI explanation service temporarily unavailable — showing the deterministic ranking only.',
      topBuyerReasoning: ['Ranking is based on crop fit, quantity fit, offer price, distance, quality fit, trust score, and urgency.'],
      comparisonToAlternative: 'Please compare the match scores shown for each buyer.',
      aiAvailable: false,
    };
  }
}

export async function analyzeCropQuality(imageBase64, mimeType, cropHint) {
  try {
    const prompt = buildQualityGradingPrompt(cropHint);
    const result = await callGeminiVisionJSON(prompt, imageBase64, mimeType);
    return { ...result, aiAvailable: true };
  } catch (err) {
    console.error('Gemini quality grading failed, using fallback:', err.message);
    return {
      crop: cropHint || 'Unknown',
      estimatedGrade: 'B',
      confidence: 40,
      observations: ['AI vision service temporarily unavailable.'],
      warning: 'AI-assisted estimation; not certified quality grading. (fallback estimate)',
      aiAvailable: false,
    };
  }
}

export async function answerFarmerQuestion(question, context) {
  try {
    const prompt = buildFarmerAssistantPrompt(question, context);
    const result = await callGeminiJSON(prompt);
    return { ...result, aiAvailable: true };
  } catch (err) {
    console.error('Gemini farmer assistant failed, using fallback:', err.message);
    return {
      answer: "I don't have enough verified data to answer that right now — the AI service is temporarily unavailable.",
      aiAvailable: false,
    };
  }
}

// ---------- Rule-based fallback (no Gemini key / API down) ----------
// Simple, transparent, deterministic — good enough to keep a live demo alive.
function ruleBasedSaleRecommendation(data) {
  const { bestNetRealization, storageCostPerKgPerDay, trend } = data;
  const decision = trend === 'up' && storageCostPerKgPerDay < 0.5 ? 'WAIT' : 'SELL_NOW';
  return {
    decision,
    recommendedDays: decision === 'WAIT' ? 3 : 0,
    expectedPrice: bestNetRealization,
    confidence: 60,
    reasoning: [
      'Rule-based fallback: AI service unavailable.',
      `Price trend is currently "${trend}".`,
      'Recommendation derived from net realization and storage cost only.',
    ],
    risks: ['Price volatility', 'AI-assisted reasoning unavailable for this recommendation'],
    aiAvailable: false,
  };
}
