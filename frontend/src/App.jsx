import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutDashboard, LineChart, Users, Boxes, Truck, MessagesSquare, Layers, Handshake, ClipboardList, Search, TrendingUp } from 'lucide-react';

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

const farmerNav = [
  { to: '/farmer', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/farmer/market', label: 'Market Intelligence', icon: LineChart },
  { to: '/farmer/buyers', label: 'Buyers', icon: Users },
  { to: '/farmer/transactions', label: 'Transactions', icon: Truck },
  { to: '/farmer/offers', label: 'Offers', icon: Handshake },
  { to: '/farmer/assistant', label: 'AI Assistant', icon: MessagesSquare },
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
  { to: '/buyer/offers', label: 'Offers', icon: Handshake },
  { to: '/buyer/transactions', label: 'Transactions', icon: Truck },
  { to: '/buyer/assistant', label: 'AI Assistant', icon: MessagesSquare },
];

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

      {/* Farmer role: decision-oriented — "what should I do?" */}
      <Route path="/farmer" element={<RoleLayout role="farmer" basePath="/farmer" navItems={farmerNav} />}>
        <Route index element={<FarmerDashboard />} />
        <Route path="market" element={<MarketIntelligence />} />
        <Route path="buyers" element={<BuyerDiscovery farmerName="Ramesh Kumar" offersPath="/farmer/offers" />} />
        <Route path="offers" element={<OfferNegotiation filterKey="farmerName" filterValue="Ramesh Kumar" counterAs="farmer" />} />
        <Route path="transactions" element={<TransactionTracking filterFarmerName="Ramesh Kumar" />} />
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

      {/* Buyer role: procurement-oriented — "how do I source the right produce?" */}
      <Route path="/buyer" element={<RoleLayout role="buyer" basePath="/buyer" navItems={buyerNav} />}>
        <Route index element={<BuyerDashboard />} />
        <Route path="requirements" element={<BuyerRequirements />} />
        <Route path="find-produce" element={<BuyerFindProduce />} />
        <Route path="forecast" element={<BuyerForecast />} />
        <Route path="offers" element={<OfferNegotiation filterKey="buyerName" filterValue={BUYER_NAME} counterAs="buyer" />} />
        <Route path="transactions" element={<TransactionTracking filterBuyerName={BUYER_NAME} demoTransactionDefaults={{ farmerName: 'Ramesh Kumar', buyerName: BUYER_NAME, crop: 'Tomato', quantityTonnes: 10, agreedPricePerKg: 24, netRealizationPerKg: 21.6 }} />} />
        <Route path="assistant" element={<AIAssistant role="buyer" />} />
      </Route>
    </Routes>
  );
}