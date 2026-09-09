import { Routes, Route, Navigate, useParams, Link } from 'react-router-dom';
import { LayoutDashboard, LineChart, Users, Boxes, Truck, MessagesSquare, Layers, Handshake, ClipboardList, Search, TrendingUp, ArrowLeft } from 'lucide-react';
import { FarmerProvider, useFarmer, getRememberedFarmerId } from './context/FarmerContext.jsx';

// --- Shared chrome ---
import Layout from './components/Layout.jsx';           // existing all-in-one layout — unchanged
import RoleLayout from './components/RoleLayout.jsx';    // new — shared chrome for the 3 role experiences

// --- Entry points ---
import RoleSelection from './pages/RoleSelection.jsx';   // new default entry point ("/")
import Landing from './pages/Landing.jsx';               // kept as the intro splash for /demo

// --- Existing all-in-one pages (unchanged, now mounted under /demo) ---
import Dashboard from './pages/Dashboard.jsx';
import MarketIntelligence from './pages/MarketIntelligence.jsx';
import BuyerDiscovery from './pages/BuyerDiscovery.jsx';
import FPOLot from './pages/FPOLot.jsx';
import TransactionTracking from './pages/Transaction.jsx';
import AIAssistant from './pages/AIAssistant.jsx';
import OfferNegotiation from './pages/OfferNegotiation.jsx';
import MultiChannelComparison from './pages/MultiChannelComparison.jsx';

// --- New role-specific dashboards ---
import FarmerSelect from './pages/FarmerSelect.jsx';      // "which farmer's dashboard?" picker
import FarmerDashboard from './pages/FarmerDashboard.jsx';
import FPODashboard, { FPO_NAME } from './pages/FPODashboard.jsx';
import BuyerDashboard, { BUYER_NAME } from './pages/BuyerDashboard.jsx';
import BuyerRequirements from './pages/BuyerRequirements.jsx';
import BuyerFindProduce from './pages/BuyerFindProduce.jsx';
import BuyerForecast from './pages/BuyerForecast.jsx';

const demoNav = [
  { to: '/demo/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/demo/market', label: 'Market Intelligence', icon: LineChart },
  { to: '/demo/buyers', label: 'Buyers', icon: Users },
  { to: '/demo/channels', label: 'Multi-Channel', icon: Layers },
  { to: '/demo/lot', label: 'FPO Smart Lot', icon: Boxes },
  { to: '/demo/offers', label: 'Offers', icon: Handshake },
  { to: '/demo/transaction', label: 'Transactions', icon: Truck },
  { to: '/demo/assistant', label: 'Assistant', icon: MessagesSquare },
];

const fpoNav = [
  { to: '/fpo', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/fpo/lot', label: 'Smart Lots', icon: Boxes },
  { to: '/fpo/buyers', label: 'Buyer Matches', icon: Users },
  { to: '/fpo/offers', label: 'Offers', icon: Handshake },
  { to: '/fpo/transactions', label: 'Transactions', icon: Truck },
  { to: '/fpo/assistant', label: 'AI Assistant', icon: MessagesSquare },
];

const buyerNav = [
  { to: '/buyer', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/buyer/requirements', label: 'Requirements', icon: ClipboardList },
  { to: '/buyer/find-produce', label: 'Find Produce', icon: Search },
  { to: '/buyer/forecast', label: 'Demand Forecast', icon: TrendingUp },
  { to: '/buyer/transactions', label: 'Transactions', icon: Truck },
  { to: '/buyer/assistant', label: 'AI Assistant', icon: MessagesSquare },
];

// /farmer (no id) — same idea as landing on a sports app with no match
// selected: if we already know which farmer this browser was looking
// at, go straight back to their dashboard; otherwise send them to pick
// one, like choosing a match before its scorecard.
function FarmerEntry() {
  const remembered = getRememberedFarmerId();
  return <Navigate to={remembered ? `/farmer/${remembered}` : '/farmer/select'} replace />;
}

// Simple chrome around the picker so it doesn't feel orphaned.
function FarmerSelectShell() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 sm:px-6">
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5">
          <ArrowLeft size={15} /> Back
        </Link>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <FarmerSelect />
      </main>
    </div>
  );
}

// /farmer/:farmerId/* — everything the Farmer role shows is scoped to
// this one farmerId via FarmerProvider (context), and the nav links are
// built with that id baked in so switching tabs stays on the same
// farmer. This is the "one dashboard template, many farmers" piece.
function FarmerRoleShell() {
  const { farmerId } = useParams();
  const base = `/farmer/${farmerId}`;
  const navItems = [
    { to: base, label: 'Dashboard', icon: LayoutDashboard },
    { to: `${base}/market`, label: 'Market Intelligence', icon: LineChart },
    { to: `${base}/buyers`, label: 'Buyers', icon: Users },
    { to: `${base}/transactions`, label: 'Transactions', icon: Truck },
    { to: `${base}/offers`, label: 'Offers', icon: Handshake },
    { to: `${base}/assistant`, label: 'AI Assistant', icon: MessagesSquare },
  ];
  return (
    <FarmerProvider farmerId={farmerId}>
      <RoleLayout role="farmer" basePath={base} navItems={navItems} />
    </FarmerProvider>
  );
}

// Downstream pages (BuyerDiscovery/OfferNegotiation/TransactionTracking)
// take a farmerName prop rather than an id — they're shared with FPO/
// Buyer roles too — so these small wrappers pull the CURRENT farmer's
// name out of context instead of a literal "Ramesh Kumar" string.
// Market Intelligence isn't shared with other roles the way Buyers/
// Offers/Transactions are, but it still shouldn't always open on
// Tomato — seed it with the current farmer's actual harvest crop.
// Guarded on `farmer` being loaded first: initialCrop is only read once
// (useState initializer), so mounting it before the farmer loads would
// permanently seed it as undefined.
function FarmerScopedMarketIntelligence() {
  const { farmerId, farmer, loading } = useFarmer();
  if (loading || !farmer) return <p className="text-slate-500">Loading market data…</p>;
  return <MarketIntelligence key={farmerId} initialCrop={farmer.currentCrop?.crop} />;
}
function FarmerScopedBuyerDiscovery() {
  const { farmerId, farmer, loading } = useFarmer();
  if (loading || !farmer) return <p className="text-slate-500">Loading buyers…</p>;
  const crop = farmer.currentCrop || {};
  return (
    <BuyerDiscovery
      key={farmerId}
      farmerName={farmer.name}
      offersPath={`/farmer/${farmerId}/offers`}
      initialCrop={crop.crop}
      initialQuantityTonnes={crop.quantityTonnes}
      initialGrade={crop.grade}
    />
  );
}
function FarmerScopedOfferNegotiation() {
  const { farmerId, farmer, loading } = useFarmer();
  if (loading || !farmer) return <p className="text-slate-500">Loading offers…</p>;
  return <OfferNegotiation key={farmerId} filterKey="farmerName" filterValue={farmer.name} counterAs="farmer" />;
}
function FarmerScopedTransactions() {
  const { farmerId, farmer, loading } = useFarmer();
  if (loading || !farmer) return <p className="text-slate-500">Loading transactions…</p>;
  return <TransactionTracking key={farmerId} filterFarmerName={farmer.name} />;
}

export default function App() {
  return (
    <Routes>
      {/* New default entry point */}
      <Route path="/" element={<RoleSelection />} />

      {/* Existing all-in-one dashboard — fully preserved, just moved under /demo */}
      <Route path="/demo" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="intro" element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="market" element={<MarketIntelligence />} />
        <Route path="buyers" element={<BuyerDiscovery farmerName="Ramesh Kumar" offersPath="/demo/offers" />} />
        <Route path="channels" element={<MultiChannelComparison />} />
        <Route path="lot" element={<FPOLot />} />
        <Route path="offers" element={<OfferNegotiation filterKey="farmerName" filterValue="Ramesh Kumar" counterAs="farmer" />} />
        <Route path="transaction" element={<TransactionTracking />} />
        <Route path="assistant" element={<AIAssistant role="farmer" />} />
      </Route>

      {/* Farmer role: decision-oriented — "what should I do?"
          /farmer redirects to either the last-viewed farmer or the
          picker; /farmer/:farmerId is that one farmer's full dashboard —
          same shape for every farmer, scorecard-style. */}
      <Route path="/farmer" element={<FarmerEntry />} />
      <Route path="/farmer/select" element={<FarmerSelectShell />} />
      <Route path="/farmer/:farmerId" element={<FarmerRoleShell />}>
        <Route index element={<FarmerDashboard />} />
        <Route path="market" element={<FarmerScopedMarketIntelligence />} />
        <Route path="buyers" element={<FarmerScopedBuyerDiscovery />} />
        <Route path="offers" element={<FarmerScopedOfferNegotiation />} />
        <Route path="transactions" element={<FarmerScopedTransactions />} />
        <Route path="assistant" element={<AIAssistant role="farmer" />} />
      </Route>

      {/* FPO role: aggregation-oriented — "how can we combine and sell our produce?" */}
      <Route path="/fpo" element={<RoleLayout role="fpo" basePath="/fpo" navItems={fpoNav} />}>
        <Route index element={<FPODashboard />} />
        <Route path="lot" element={<FPOLot />} />
        <Route path="buyers" element={<BuyerDiscovery farmerName={FPO_NAME} offersPath="/fpo/offers" />} />
        <Route path="offers" element={<OfferNegotiation filterKey="farmerName" filterValue={FPO_NAME} counterAs="farmer" />} />
        <Route path="transactions" element={<TransactionTracking filterFarmerName={FPO_NAME} demoTransactionDefaults={{ farmerName: FPO_NAME, buyerName: 'ABC Foods (Demo)', crop: 'Tomato', quantityTonnes: 10, agreedPricePerKg: 24, netRealizationPerKg: 21.6 }} />} />
        <Route path="assistant" element={<AIAssistant role="fpo" />} />
      </Route>

      {/* Buyer role: procurement-oriented — "how do I source the right produce?"
          Note: no Offers tab here by design — an offer a Buyer makes is
          attributed to the FPO or Farmer identity it was made against, and
          is negotiated from THEIR Offers tab, not the Buyer's. */}
      <Route path="/buyer" element={<RoleLayout role="buyer" basePath="/buyer" navItems={buyerNav} />}>
        <Route index element={<BuyerDashboard />} />
        <Route path="requirements" element={<BuyerRequirements />} />
        <Route path="find-produce" element={<BuyerFindProduce />} />
        <Route path="forecast" element={<BuyerForecast />} />
        <Route path="transactions" element={<TransactionTracking filterBuyerName={BUYER_NAME} demoTransactionDefaults={{ farmerName: 'Ramesh Kumar', buyerName: BUYER_NAME, crop: 'Tomato', quantityTonnes: 10, agreedPricePerKg: 24, netRealizationPerKg: 21.6 }} />} />
        <Route path="assistant" element={<AIAssistant role="buyer" />} />
      </Route>
    </Routes>
  );
}