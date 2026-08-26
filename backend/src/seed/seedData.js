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

export const markets = [
  { name: 'Kolar APMC', state: 'Karnataka', district: 'Kolar', crop: 'Tomato', distanceKm: 5, minPrice: 17, modalPrice: 20, maxPrice: 22, arrivalQuantityTonnes: 220, trend: 'stable' },
  { name: 'Bengaluru Yeshwanthpur APMC', state: 'Karnataka', district: 'Bengaluru Urban', crop: 'Tomato', distanceKm: 70, minPrice: 20, modalPrice: 23, maxPrice: 26, arrivalQuantityTonnes: 540, trend: 'up' },
  { name: 'Tumakuru APMC', state: 'Karnataka', district: 'Tumakuru', crop: 'Tomato', distanceKm: 90, minPrice: 18, modalPrice: 21, maxPrice: 23, arrivalQuantityTonnes: 160, trend: 'stable' },
  { name: 'Chintamani APMC', state: 'Karnataka', district: 'Chikkaballapur', crop: 'Tomato', distanceKm: 40, minPrice: 17.5, modalPrice: 20.5, maxPrice: 22.5, arrivalQuantityTonnes: 130, trend: 'down' },
  { name: 'Mysuru APMC', state: 'Karnataka', district: 'Mysuru', crop: 'Onion', distanceKm: 140, minPrice: 12, modalPrice: 15, maxPrice: 17, arrivalQuantityTonnes: 300, trend: 'up' },
  { name: 'Hubballi APMC', state: 'Karnataka', district: 'Dharwad', crop: 'Onion', distanceKm: 410, minPrice: 11, modalPrice: 14, maxPrice: 16, arrivalQuantityTonnes: 380, trend: 'stable' },
  { name: 'Belagavi APMC', state: 'Karnataka', district: 'Belagavi', crop: 'Potato', distanceKm: 500, minPrice: 9, modalPrice: 11, maxPrice: 13, arrivalQuantityTonnes: 260, trend: 'stable' },
  { name: 'Kolar Potato Yard', state: 'Karnataka', district: 'Kolar', crop: 'Potato', distanceKm: 5, minPrice: 8.5, modalPrice: 10.5, maxPrice: 12, arrivalQuantityTonnes: 90, trend: 'down' },
  { name: 'Raichur APMC', state: 'Karnataka', district: 'Raichur', crop: 'Paddy', distanceKm: 350, minPrice: 19, modalPrice: 21, maxPrice: 23, arrivalQuantityTonnes: 610, trend: 'up' },
  { name: 'Mandya APMC', state: 'Karnataka', district: 'Mandya', crop: 'Paddy', distanceKm: 100, minPrice: 18.5, modalPrice: 20.5, maxPrice: 22, arrivalQuantityTonnes: 420, trend: 'stable' },
  { name: 'Chikkamagaluru APMC', state: 'Karnataka', district: 'Chikkamagaluru', crop: 'Tomato', distanceKm: 220, minPrice: 18, modalPrice: 21.5, maxPrice: 24, arrivalQuantityTonnes: 100, trend: 'up' },
  { name: 'Anantapur APMC', state: 'Andhra Pradesh', district: 'Anantapur', crop: 'Tomato', distanceKm: 130, minPrice: 17, modalPrice: 19.5, maxPrice: 21, arrivalQuantityTonnes: 190, trend: 'stable' },
];

export const buyers = [
  { name: 'ABC Foods (Demo)', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 20, offerPricePerKg: 24, location: 'Bengaluru', distanceKm: 70, requiredByDate: daysFromNow(4), verified: true, paymentReliabilityPct: 95, completedTransactions: 42, disputedTransactionsPct: 2 },
  { name: 'FreshMart Aggregators (Demo)', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 8, offerPricePerKg: 22.5, location: 'Kolar', distanceKm: 6, requiredByDate: daysFromNow(2), verified: true, paymentReliabilityPct: 88, completedTransactions: 25, disputedTransactionsPct: 5 },
  { name: 'City Wholesale Traders (Demo)', cropRequired: 'Tomato', gradeRequired: 'B', quantityRequiredTonnes: 15, offerPricePerKg: 21, location: 'Tumakuru', distanceKm: 90, requiredByDate: daysFromNow(7), verified: true, paymentReliabilityPct: 80, completedTransactions: 18, disputedTransactionsPct: 8 },
  { name: 'GreenLeaf Exports (Demo)', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 30, offerPricePerKg: 25, location: 'Bengaluru', distanceKm: 72, requiredByDate: daysFromNow(10), verified: true, paymentReliabilityPct: 91, completedTransactions: 60, disputedTransactionsPct: 3 },
  { name: 'Karnataka Cold Chain Co. (Demo)', cropRequired: 'Onion', gradeRequired: 'A', quantityRequiredTonnes: 25, offerPricePerKg: 16, location: 'Mysuru', distanceKm: 140, requiredByDate: daysFromNow(5), verified: true, paymentReliabilityPct: 85, completedTransactions: 30, disputedTransactionsPct: 4 },
  { name: 'Deccan Agro Buyers (Demo)', cropRequired: 'Potato', gradeRequired: 'B', quantityRequiredTonnes: 12, offerPricePerKg: 11.5, location: 'Kolar', distanceKm: 5, requiredByDate: daysFromNow(3), verified: false, paymentReliabilityPct: 65, completedTransactions: 6, disputedTransactionsPct: 15 },
  { name: 'Namma Mandi Retail (Demo)', cropRequired: 'Tomato', gradeRequired: 'C', quantityRequiredTonnes: 5, offerPricePerKg: 18, location: 'Kolar', distanceKm: 4, requiredByDate: daysFromNow(1), verified: true, paymentReliabilityPct: 70, completedTransactions: 10, disputedTransactionsPct: 10 },
  { name: 'Southern Paddy Millers (Demo)', cropRequired: 'Paddy', gradeRequired: 'A', quantityRequiredTonnes: 50, offerPricePerKg: 22, location: 'Mandya', distanceKm: 100, requiredByDate: daysFromNow(12), verified: true, paymentReliabilityPct: 93, completedTransactions: 70, disputedTransactionsPct: 2 },
  { name: 'FarmFresh Direct (Demo)', cropRequired: 'Tomato', gradeRequired: 'A', quantityRequiredTonnes: 10, offerPricePerKg: 23.5, location: 'Chintamani', distanceKm: 40, requiredByDate: daysFromNow(6), verified: true, paymentReliabilityPct: 89, completedTransactions: 20, disputedTransactionsPct: 6 },
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
];

// 60 days of synthetic Tomato price history for Kolar APMC and Bengaluru Yeshwanthpur APMC
export function generatePriceHistory() {
  const crops = [
    { crop: 'Tomato', market: 'Kolar APMC', base: 19, volatility: 1.5 },
    { crop: 'Tomato', market: 'Bengaluru Yeshwanthpur APMC', base: 21, volatility: 2 },
    { crop: 'Onion', market: 'Mysuru APMC', base: 14, volatility: 1 },
    { crop: 'Potato', market: 'Kolar Potato Yard', base: 10, volatility: 0.8 },
    { crop: 'Paddy', market: 'Mandya APMC', base: 20, volatility: 0.6 },
  ];
  const days = 60;
  const records = [];
  const today = new Date();

  crops.forEach(({ crop, market, base, volatility }) => {
    let price = base;
    for (let i = days; i >= 0; i--) {
      // gentle random walk with a mild upward drift, clamped to stay realistic
      const drift = 0.01;
      const noise = (Math.random() - 0.5) * volatility;
      price = Math.max(base * 0.7, Math.min(base * 1.4, price + drift + noise));
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      records.push({ crop, market, date, modalPrice: Math.round(price * 100) / 100 });
    }
  });
  return records;
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}
