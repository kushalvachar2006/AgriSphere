import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MarketIntelligence from './pages/MarketIntelligence.jsx';
import BuyerDiscovery from './pages/BuyerDiscovery.jsx';
import FPOLot from './pages/FPOLot.jsx';
import TransactionTracking from './pages/Transaction.jsx';
import AIAssistant from './pages/AIAssistant.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<MarketIntelligence />} />
        <Route path="/buyers" element={<BuyerDiscovery />} />
        <Route path="/lot" element={<FPOLot />} />
        <Route path="/transaction" element={<TransactionTracking />} />
        <Route path="/assistant" element={<AIAssistant />} />
      </Route>
    </Routes>
  );
}
