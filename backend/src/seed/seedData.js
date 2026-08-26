// seed/seedData.js
//
// Synthetic/demo data for the prototype. NONE of this is official
// AGMARKNET data — it is illustrative, clearly-labeled demo data used
// so the hackathon demo works offline and reliably (spec sections 17-18).
export const demoFarmer = {
  name: 'Ramesh Kumar',
  location: { village: 'Kolar Town', district: 'Kolar', state: 'Karnataka', lat: 13.1367, lng: 78.1298 },
  phone: '+91-90000-00000',
  currentCrop: { crop: 'Tomato', quantityTonnes: 10, grade: 'A', storageAvailable: true },
};

// `channel` distinguishes physical APMC mandis from eNAM electronic-trading
// listings — Feature 5 (Multi-Channel Market Comparison) ranks both
// alongside buyer channels in one comparison.
export const markets = [
  { name: 'Kolar APMC', channel: 'APMC', state: 'Karnataka', district: 'Kolar', crop: 'Tomato', distanceKm: 5, minPrice: 17, modalPrice: 20, maxPrice: 22, arrivalQuantityTonnes: 220, trend: 'stable' },
  { name: 'Bengaluru Yeshwanthpur APMC', channel: 'APMC', state: 'Karnataka', district: 'Bengaluru Urban', crop: 'Tomato', distanceKm: 70, minPrice: 20, modalPrice: 23, maxPrice: 26, arrivalQuantityTonnes: 540, trend: 'up' },
  { name: 'Tumakuru APMC', channel: 'APMC', state: 'Karnataka', district: 'Tumakuru', crop: 'Tomato', distanceKm: 90, minPrice: 18, modalPrice: 21, maxPrice: 23, arrivalQuantityTonnes: 160, trend: 'stable' },
  { name: 'Chintamani APMC', channel: 'APMC', state: 'Karnataka', district: 'Chikkaballapur', crop: 'Tomato', distanceKm: 40, minPrice: 17.5, modalPrice: 20.5, maxPrice: 22.5, arrivalQuantityTonnes: 130, trend: 'down' },
  { name: 'Mysuru APMC', channel: 'APMC', state: 'Karnataka', district: 'Mysuru', crop: 'Onion', distanceKm: 140, minPrice: 12, modalPrice: 15, maxPrice: 17, arrivalQuantityTonnes: 300, trend: 'up' },
  { name: 'Hubballi APMC', channel: 'APMC', state: 'Karnataka', district: 'Dharwad', crop: 'Onion', distanceKm: 410, minPrice: 11, modalPrice: 14, maxPrice: 16, arrivalQuantityTonnes: 380, trend: 'stable' },
  { name: 'Belagavi APMC', channel: 'APMC', state: 'Karnataka', district: 'Belagavi', crop: 'Potato', distanceKm: 500, minPrice: 9, modalPrice: 11, maxPrice: 13, arrivalQuantityTonnes: 260, trend: 'stable' },
  { name: 'Kolar Potato Yard', channel: 'APMC', state: 'Karnataka', district: 'Kolar', crop: 'Potato', distanceKm: 5, minPrice: 8.5, modalPrice: 10.5, maxPrice: 12, arrivalQuantityTonnes: 90, trend: 'down' },
  { name: 'Raichur APMC', channel: 'APMC', state: 'Karnataka', district: 'Raichur', crop: 'Paddy', distanceKm: 350, minPrice: 19, modalPrice: 21, maxPrice: 23, arrivalQuantityTonnes: 610, trend: 'up' },
  { name: 'Mandya APMC', channel: 'APMC', state: 'Karnataka', district: 'Mandya', crop: 'Paddy', distanceKm: 100, minPrice: 18.5, modalPrice: 20.5, maxPrice: 22, arrivalQuantityTonnes: 420, trend: 'stable' },
  { name: 'Chikkamagaluru APMC', channel: 'APMC', state: 'Karnataka', district: 'Chikkamagaluru', crop: 'Tomato', distanceKm: 220, minPrice: 18, modalPrice: 21.5, maxPrice: 24, arrivalQuantityTonnes: 100, trend: 'up' },
  { name: 'Anantapur APMC', channel: 'APMC', state: 'Andhra Pradesh', district: 'Anantapur', crop: 'Tomato', distanceKm: 130, minPrice: 17, modalPrice: 19.5, maxPrice: 21, arrivalQuantityTonnes: 190, trend: 'stable' },
  // eNAM electronic-trading listings (Feature 5) — same crop, different channel/price discovery mechanism
  { name: 'eNAM Kolar', channel: 'eNAM', state: 'Karnataka', district: 'Kolar', crop: 'Tomato', distanceKm: 5, minPrice: 18, modalPrice: 21.5, maxPrice: 23.5, arrivalQuantityTonnes: 95, trend: 'up' },
  { name: 'eNAM Mysuru', channel: 'eNAM', state: 'Karnataka', district: 'Mysuru', crop: 'Onion', distanceKm: 140, minPrice: 13, modalPrice: 15.8, maxPrice: 17.5, arrivalQuantityTonnes: 110, trend: 'up' },
  { name: 'eNAM Mandya', channel: 'eNAM', state: 'Karnataka', district: 'Mandya', crop: 'Paddy', distanceKm: 100, minPrice: 19, modalPrice: 21.2, maxPrice: 22.8, arrivalQuantityTonnes: 200, trend: 'stable' },
];

// `buyerType` + `channel` + `requirements` power Feature 4 (Institutional
// Buyer Integration): processors, retail chains, exporters, and government
// procurement agencies each carry realistic quantity/quality/delivery
// requirements, alongside the original plain traders/aggregators.
export const buyers = [
  { name: 'ABC Foods (Demo)', buyerType: 'Trader/Aggregator', channel: 'Direct Trader', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 20, offerPricePerKg: 24, location: 'Bengaluru', distanceKm: 70, requiredByDate: daysFromNow(4), verified: true, paymentReliabilityPct: 95, completedTransactions: 42, disputedTransactionsPct: 2 },
  { name: 'FreshMart Aggregators (Demo)', buyerType: 'Trader/Aggregator', channel: 'Direct Trader', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 8, offerPricePerKg: 22.5, location: 'Kolar', distanceKm: 6, requiredByDate: daysFromNow(2), verified: true, paymentReliabilityPct: 88, completedTransactions: 25, disputedTransactionsPct: 5 },
  { name: 'City Wholesale Traders (Demo)', buyerType: 'Trader/Aggregator', channel: 'Direct Trader', cropRequired: 'Tomato', gradeRequired: 'B', quantityRequiredTonnes: 15, offerPricePerKg: 21, location: 'Tumakuru', distanceKm: 90, requiredByDate: daysFromNow(7), verified: true, paymentReliabilityPct: 80, completedTransactions: 18, disputedTransactionsPct: 8 },
  { name: 'GreenLeaf Exports (Demo)', buyerType: 'Exporter', channel: 'Exporter', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 30, offerPricePerKg: 25, location: 'Bengaluru', distanceKm: 72, requiredByDate: daysFromNow(10), verified: true, paymentReliabilityPct: 91, completedTransactions: 60, disputedTransactionsPct: 3,
    requirements: { qualitySpec: 'Grade A only, uniform size 60-80mm, <3% blemish', deliverySchedule: 'Fortnightly export container loading', packagingRequirement: '10kg export cartons, ventilated', contractType: 'Forward Agreement' } },
  { name: 'Karnataka Cold Chain Co. (Demo)', buyerType: 'Trader/Aggregator', channel: 'Direct Trader', cropRequired: 'Onion', gradeRequired: 'A', quantityRequiredTonnes: 25, offerPricePerKg: 16, location: 'Mysuru', distanceKm: 140, requiredByDate: daysFromNow(5), verified: true, paymentReliabilityPct: 85, completedTransactions: 30, disputedTransactionsPct: 4 },
  { name: 'Deccan Agro Buyers (Demo)', buyerType: 'Trader/Aggregator', channel: 'Direct Trader', cropRequired: 'Potato', gradeRequired: 'B', quantityRequiredTonnes: 12, offerPricePerKg: 11.5, location: 'Kolar', distanceKm: 5, requiredByDate: daysFromNow(3), verified: false, paymentReliabilityPct: 65, completedTransactions: 6, disputedTransactionsPct: 15 },
  { name: 'Namma Mandi Retail (Demo)', buyerType: 'Trader/Aggregator', channel: 'Direct Trader', cropRequired: 'Tomato', gradeRequired: 'C', quantityRequiredTonnes: 5, offerPricePerKg: 18, location: 'Kolar', distanceKm: 4, requiredByDate: daysFromNow(1), verified: true, paymentReliabilityPct: 70, completedTransactions: 10, disputedTransactionsPct: 10 },
  { name: 'Southern Paddy Millers (Demo)', buyerType: 'Processor', channel: 'Processor', cropRequired: 'Paddy', gradeRequired: 'A', quantityRequiredTonnes: 50, offerPricePerKg: 22, location: 'Mandya', distanceKm: 100, requiredByDate: daysFromNow(12), verified: true, paymentReliabilityPct: 93, completedTransactions: 70, disputedTransactionsPct: 2,
    requirements: { qualitySpec: 'Grade A, moisture content <14%', deliverySchedule: 'Monthly bulk intake, silo slots pre-booked', packagingRequirement: 'Bulk/loose, mill-side weighbridge', contractType: 'Seasonal Contract' } },
  { name: 'FarmFresh Direct (Demo)', buyerType: 'Trader/Aggregator', channel: 'Direct Trader', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 10, offerPricePerKg: 23.5, location: 'Chintamani', distanceKm: 40, requiredByDate: daysFromNow(6), verified: true, paymentReliabilityPct: 89, completedTransactions: 20, disputedTransactionsPct: 6 },
  // --- Institutional buyers (Feature 4) ---
  { name: 'PureHarvest Foods Processing (Demo)', buyerType: 'Processor', channel: 'Processor', cropRequired: 'Tomato', gradeRequired: 'B', quantityRequiredTonnes: 40, offerPricePerKg: 20.5, location: 'Tumakuru', distanceKm: 90, requiredByDate: daysFromNow(8), verified: true, paymentReliabilityPct: 90, completedTransactions: 55, disputedTransactionsPct: 3,
    requirements: { qualitySpec: 'Grade B/A accepted, ripe for paste processing, <10% split fruit', deliverySchedule: 'Twice weekly during peak season', packagingRequirement: 'Bulk crates, factory-gate delivery', contractType: 'Seasonal Contract' } },
  { name: 'MetroFresh Retail Chain (Demo)', buyerType: 'Retail Chain', channel: 'Retail Chain', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 12, offerPricePerKg: 23, location: 'Bengaluru', distanceKm: 70, requiredByDate: daysFromNow(3), verified: true, paymentReliabilityPct: 94, completedTransactions: 80, disputedTransactionsPct: 2,
    requirements: { qualitySpec: 'Grade A, retail-shelf appearance, uniform ripeness', deliverySchedule: 'Daily store replenishment, early morning slots', packagingRequirement: '5kg retail-ready crates with labels', contractType: 'Spot' } },
  { name: 'Karnataka State Procurement Agency (Demo)', buyerType: 'Government Agency', channel: 'Government Procurement', cropRequired: 'Paddy', gradeRequired: 'A', quantityRequiredTonnes: 100, offerPricePerKg: 21, location: 'Mandya', distanceKm: 100, requiredByDate: daysFromNow(20), verified: true, paymentReliabilityPct: 97, completedTransactions: 200, disputedTransactionsPct: 1,
    requirements: { qualitySpec: 'FAQ (Fair Average Quality) as per MSP norms', deliverySchedule: 'Procurement window per government schedule', packagingRequirement: 'Standard gunny bags, 50kg', contractType: 'MSP Procurement' } },
  { name: 'Global Agri Exports Ltd (Demo)', buyerType: 'Exporter', channel: 'Exporter', cropRequired: 'Onion', gradeRequired: 'A', quantityRequiredTonnes: 35, offerPricePerKg: 17, location: 'Mysuru', distanceKm: 140, requiredByDate: daysFromNow(9), verified: true, paymentReliabilityPct: 92, completedTransactions: 48, disputedTransactionsPct: 3,
    requirements: { qualitySpec: 'Grade A, export-size grading, <2% rot', deliverySchedule: 'Container-load fortnightly', packagingRequirement: 'Mesh export bags, 25kg', contractType: 'Forward Agreement' } },
  { name: 'AgriMart Digital Marketplace (Demo)', buyerType: 'Trader/Aggregator', channel: 'Digital Marketplace', cropRequired: 'Tomato', gradeRequired: 'B', quantityRequiredTonnes: 6, offerPricePerKg: 22, location: 'Kolar', distanceKm: 8, requiredByDate: daysFromNow(2), verified: true, paymentReliabilityPct: 82, completedTransactions: 15, disputedTransactionsPct: 6,
    requirements: { qualitySpec: 'Grade B/A, photo-verified listing', deliverySchedule: 'On-demand pickup after online bid acceptance', packagingRequirement: 'Standard crates', contractType: 'Spot (online bidding)' } },
];

export const storageFacilities = [
  { facilityName: 'Kolar Cold Storage', location: 'Kolar', type: 'Cold Storage', capacityTonnes: 200, availableCapacityTonnes: 20, costPerKgPerDay: 0.6, distanceKm: 5.2 },
  { facilityName: 'Bengaluru AgriWarehouse', location: 'Bengaluru', type: 'Cold Storage', capacityTonnes: 500, availableCapacityTonnes: 80, costPerKgPerDay: 0.75, distanceKm: 70 },
  { facilityName: 'Tumakuru Warehousing Corp.', location: 'Tumakuru', type: 'Dry Warehouse', capacityTonnes: 350, availableCapacityTonnes: 40, costPerKgPerDay: 0.4, distanceKm: 90 },
  { facilityName: 'Chintamani Farmer Storage', location: 'Chintamani', type: 'Cold Storage', capacityTonnes: 100, availableCapacityTonnes: 15, costPerKgPerDay: 0.55, distanceKm: 40 },
  { facilityName: 'Mandya Grain Silo', location: 'Mandya', type: 'Silo', capacityTonnes: 800, availableCapacityTonnes: 200, costPerKgPerDay: 0.25, distanceKm: 100 },
  { facilityName: 'Mysuru Cold Hub', location: 'Mysuru', type: 'Cold Storage', capacityTonnes: 400, availableCapacityTonnes: 60, costPerKgPerDay: 0.65, distanceKm: 140 },
];

export const logisticsOptions = [
  { source: 'Kolar', destination: 'Kolar APMC', distanceKm: 5, vehicleType: 'Mini Truck', costPerKg: 0.15, etaHoursMin: 0.5, etaHoursMax: 1 },
  { source: 'Kolar', destination: 'Bengaluru Yeshwanthpur APMC', distanceKm: 70, vehicleType: 'Mini Truck', costPerKg: 1.4, etaHoursMin: 2, etaHoursMax: 3 },
  { source: 'Kolar', destination: 'ABC Foods (Demo)', distanceKm: 70, vehicleType: 'Mini Truck', costPerKg: 1.8, etaHoursMin: 4, etaHoursMax: 5 },
  { source: 'Kolar', destination: 'Tumakuru APMC', distanceKm: 90, vehicleType: 'Truck (7T)', costPerKg: 1.2, etaHoursMin: 3, etaHoursMax: 4 },
  { source: 'Kolar', destination: 'City Wholesale Traders (Demo)', distanceKm: 90, vehicleType: 'Truck (7T)', costPerKg: 1.25, etaHoursMin: 3, etaHoursMax: 4 },
  { source: 'Kolar', destination: 'Chintamani APMC', distanceKm: 40, vehicleType: 'Mini Truck', costPerKg: 0.9, etaHoursMin: 1.5, etaHoursMax: 2 },
  { source: 'Kolar', destination: 'FarmFresh Direct (Demo)', distanceKm: 40, vehicleType: 'Mini Truck', costPerKg: 0.95, etaHoursMin: 1.5, etaHoursMax: 2 },
  { source: 'Kolar', destination: 'FreshMart Aggregators (Demo)', distanceKm: 6, vehicleType: 'Mini Truck', costPerKg: 0.2, etaHoursMin: 0.5, etaHoursMax: 1 },
  { source: 'Kolar', destination: 'GreenLeaf Exports (Demo)', distanceKm: 72, vehicleType: 'Refrigerated Van', costPerKg: 2.1, etaHoursMin: 3, etaHoursMax: 4 },
  { source: 'Kolar', destination: 'PureHarvest Foods Processing (Demo)', distanceKm: 90, vehicleType: 'Truck (7T)', costPerKg: 1.3, etaHoursMin: 3, etaHoursMax: 4 },
  { source: 'Kolar', destination: 'MetroFresh Retail Chain (Demo)', distanceKm: 70, vehicleType: 'Refrigerated Van', costPerKg: 1.9, etaHoursMin: 2, etaHoursMax: 3 },
  { source: 'Kolar', destination: 'eNAM Kolar', distanceKm: 5, vehicleType: 'Mini Truck', costPerKg: 0.18, etaHoursMin: 0.5, etaHoursMax: 1 },
];

// 60 days of synthetic price history for each crop/market pair
export function generatePriceHistory() {
  const crops = [
    { crop: 'Tomato', market: 'Kolar APMC', base: 19, volatility: 1.5 },
    { crop: 'Tomato', market: 'Bengaluru Yeshwanthpur APMC', base: 21, volatility: 2 },
    { crop: 'Onion', market: 'Mysuru APMC', base: 14, volatility: 1 },
    { crop: 'Potato', market: 'Kolar Potato Yard', base: 10, volatility: 0.8 },
    { crop: 'Paddy', market: 'Mandya APMC', base: 20, volatility: 0.6 },
  ];
  return randomWalkSeries(crops, 60, 'modalPrice');
}

// Feature 1 (Arrival Volume Intelligence): 60 days of synthetic daily
// arrival tonnage per crop/market — deliberately correlated so Kolar
// Tomato shows a visible "arrivals up, price down" pattern for the demo.
export function generateArrivalVolumeHistory() {
  const crops = [
    { crop: 'Tomato', market: 'Kolar APMC', base: 20, volatility: 6 },
    { crop: 'Tomato', market: 'Bengaluru Yeshwanthpur APMC', base: 45, volatility: 10 },
    { crop: 'Onion', market: 'Mysuru APMC', base: 30, volatility: 8 },
    { crop: 'Potato', market: 'Kolar Potato Yard', base: 15, volatility: 4 },
    { crop: 'Paddy', market: 'Mandya APMC', base: 55, volatility: 12 },
  ];
  return randomWalkSeries(crops, 60, 'arrivalQuantityTonnes');
}

// Feature 2 (Buyer Demand Forecasting): 12 months of synthetic monthly
// procurement quantities per buyer/crop, with a mild seasonal pattern
// (higher procurement Oct-Feb, the main harvest window) that the
// deterministic forecaster in demandForecastService.js can pick up on.
export function generateProcurementHistory() {
  const buyerCropPairs = [
    { buyerName: 'ABC Foods (Demo)', crop: 'Tomato', base: 18 },
    { buyerName: 'GreenLeaf Exports (Demo)', crop: 'Tomato', base: 26 },
    { buyerName: 'PureHarvest Foods Processing (Demo)', crop: 'Tomato', base: 34 },
    { buyerName: 'MetroFresh Retail Chain (Demo)', crop: 'Tomato', base: 10 },
    { buyerName: 'Southern Paddy Millers (Demo)', crop: 'Paddy', base: 44 },
    { buyerName: 'Karnataka State Procurement Agency (Demo)', crop: 'Paddy', base: 85 },
  ];
  // simple seasonal multiplier by month (1=Jan ... 12=Dec) — harvest-season bump
  const seasonalMultiplier = { 1: 1.2, 2: 1.15, 3: 1.0, 4: 0.85, 5: 0.8, 6: 0.8, 7: 0.85, 8: 0.9, 9: 0.95, 10: 1.2, 11: 1.3, 12: 1.25 };

  const records = [];
  const now = new Date();
  for (let monthsAgo = 11; monthsAgo >= 0; monthsAgo--) {
    const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    buyerCropPairs.forEach(({ buyerName, crop, base }) => {
      const noise = (Math.random() - 0.5) * base * 0.15;
      const quantityProcuredTonnes = Math.max(1, Math.round((base * seasonalMultiplier[month] + noise) * 100) / 100);
      records.push({ buyerName, crop, month, year, quantityProcuredTonnes });
    });
  }
  return records;
}

/** Shared random-walk generator used for both price and arrival-volume series. */
function randomWalkSeries(series, days, valueKey) {
  const records = [];
  const today = new Date();
  series.forEach(({ crop, market, base, volatility }) => {
    let value = base;
    for (let i = days; i >= 0; i--) {
      const drift = 0.01;
      const noise = (Math.random() - 0.5) * volatility;
      value = Math.max(base * 0.6, Math.min(base * 1.5, value + drift + noise));
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      records.push({ crop, market, date, [valueKey]: Math.round(value * 100) / 100 });
    }
  });
  return records;
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}