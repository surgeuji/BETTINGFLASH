/**
 * Bet Context
 * Manages global bet slip state
 */

import React, { createContext, useState } from 'react';

export const BetContext = createContext();

export const BetProvider = ({ children }) => {
  const [betSlip, setBetSlip] = useState([]);
  const [totalStake, setTotalStake] = useState(0);
  const [totalOdds, setTotalOdds] = useState(1);

  const addSelection = (selection) => {
    const newSlip = [...betSlip, selection];
    setBetSlip(newSlip);
    calculateTotals(newSlip);
  };

  const removeSelection = (index) => {
    const newSlip = betSlip.filter((_, i) => i !== index);
    setBetSlip(newSlip);
    calculateTotals(newSlip);
  };

  const calculateTotals = (slip) => {
    const odds = slip.reduce((product, sel) => product * parseFloat(sel.odds), 1);
    setTotalOdds(odds.toFixed(2));
  };

  const clearSlip = () => {
    setBetSlip([]);
    setTotalStake(0);
    setTotalOdds(1);
  };

  return (
    <BetContext.Provider value={{ betSlip, totalStake, totalOdds, addSelection, removeSelection, clearSlip }}>
      {children}
    </BetContext.Provider>
  );
};
