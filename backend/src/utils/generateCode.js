/**
 * Generate promo codes in format: XXX-NNN (3 letters + 3 numbers)
 * Example: ABC-123
 */
exports.generatePromoCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  let code = '';

  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  code += '-';

  // Generate 3 random numbers
  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return code;
};

/**
 * Validate promo code format
 */
exports.isValidPromoCodeFormat = (code) => {
  const promoRegex = /^[A-Z]{3}-\d{3}$/;
  return promoRegex.test(code);
};
