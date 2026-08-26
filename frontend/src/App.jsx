import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MarketIntelligence from './pages/MarketIntelligence.jsx';
import BuyerDiscovery from './pages/BuyerDiscovery.jsx';
import FPOLot from './pages/FPOLot.jsx';
import TransactionTracking from './pages/Transaction.jsx';
import AIAssistant from './pages/AIAssistant.jsx';
import OfferNegotiation from './pages/OfferNegotiation.jsx';           // Feature 3
import MultiChannelComparison from './pages/MultiChannelComparison.jsx'; // Feature 5

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<MarketIntelligence />} />
        <Route path="/buyers" element={<BuyerDiscovery />} />
        <Route path="/channels" element={<MultiChannelComparison />} />
        <Route path="/lot" element={<FPOLot />} />
        <Route path="/offers" element={<OfferNegotiation />} />
        <Route path="/transaction" element={<TransactionTracking />} />
        <Route path="/assistant" element={<AIAssistant />} />
      </Route>
    </Routes>
  );
}