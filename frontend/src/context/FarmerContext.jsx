// context/FarmerContext.jsx
//
// Makes the Farmer role "per farmer" instead of hardcoded to one farmer.
// Same idea as a cricket scorecard component being keyed by matchId:
// this context holds the selected farmerId, everything under /farmer/*
// reads the CURRENT farmer from here instead of a literal name/string.
//
// farmerId is persisted to sessionStorage so a refresh doesn't bounce
// you back to the picker, and it's also reflected in the URL
// (/farmer/:farmerId/...) so a dashboard link is shareable/bookmarkable.
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client.js';

const FarmerContext = createContext(null);
const STORAGE_KEY = 'agrisphere.farmerId';

export function FarmerProvider({ farmerId, children }) {
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(!!farmerId);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!farmerId) { setFarmer(null); return; }
    setLoading(true);
    setError('');
    sessionStorage.setItem(STORAGE_KEY, farmerId);
    api.getFarmer(farmerId)
      .then((res) => setFarmer(res.farmer))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [farmerId]);

  return (
    <FarmerContext.Provider value={{ farmerId, farmer, loading, error }}>
      {children}
    </FarmerContext.Provider>
  );
}

export function useFarmer() {
  const ctx = useContext(FarmerContext);
  if (!ctx) throw new Error('useFarmer must be used within a FarmerProvider');
  return ctx;
}

// Last-selected farmer, if any — lets "Continue as Farmer" skip straight
// back to the same dashboard on a return visit instead of always
// re-showing the picker.
export function getRememberedFarmerId() {
  return sessionStorage.getItem(STORAGE_KEY);
}
