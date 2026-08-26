// services/marketDataService.js
//
// Adapter around "where market price data comes from". Today it reads
// seeded MongoDB data (see ../seed/seedData.js). If a real government
// OGD/AGMARKNET API key is later configured, only this file needs to
// change — the rest of the app calls getMarketPrices(filters) and does
// not care where the numbers came from.
//
// Reliability rule (see spec section 24): if the real data source is
// unavailable, we NEVER let the app crash — we fall back to the demo
// seed data and flag the response so the UI can show a small notice.
import Market from '../models/Market.js';

/**
 * @param {Object} filters - { crop, state, district }
 * @returns {Promise<{ markets: Array, source: 'DB'|'FALLBACK' }>}
 */
export async function getMarketPrices(filters = {}) {
  const query = {};
  if (filters.crop) query.crop = filters.crop;
  if (filters.state) query.state = filters.state;
  if (filters.district) query.district = filters.district;

  try {
    const markets = await Market.find(query).sort({ modalPrice: -1 }).lean();
    if (!markets.length) {
      return { markets: [], source: 'DB', message: 'No markets found for this filter.' };
    }
    return { markets, source: 'DB' };
  } catch (err) {
    // DB unreachable — this is the "government endpoint unavailable" case
    // for the prototype. Return an empty, clearly-labeled fallback instead
    // of throwing, so the frontend can still render something.
    console.error('marketDataService: falling back, DB read failed:', err.message);
    return {
      markets: [],
      source: 'FALLBACK',
      message: 'Real market data unavailable. Showing latest cached/demo data.',
    };
  }
}
