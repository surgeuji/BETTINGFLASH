/**
 * Currency formatting utility
 */

exports.formatCurrency = (amount, currency = 'NGN') => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(amount);
};

exports.parseAmount = (amount) => {
  return parseFloat(amount).toFixed(2);
};

exports.applyBonus = (amount, bonusPercentage = 3) => {
  return parseFloat(amount * (1 + bonusPercentage / 100)).toFixed(2);
};

exports.applyTax = (amount, taxPercentage = 0) => {
  return parseFloat(amount * (1 - taxPercentage / 100)).toFixed(2);
};

/**
 * Convert between currencies (placeholder - requires real exchange rate API)
 */
exports.convertCurrency = async (amount, fromCurrency, toCurrency) => {
  // Placeholder - in production, integrate with real exchange rate service
  if (fromCurrency === toCurrency) return amount;

  // Mock conversion rates
  const rates = {
    NGN_USD: 0.0012,
    USD_NGN: 833.33,
  };

  const key = `${fromCurrency}_${toCurrency}`;
  return amount * (rates[key] || 1);
};
