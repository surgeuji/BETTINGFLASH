/**
 * Email validation
 */
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone number validation (basic)
 */
exports.isValidPhone = (phone) => {
  return phone && phone.length >= 10;
};

/**
 * Strong password validation
 * Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
 */
exports.isStrongPassword = (password) => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return strongRegex.test(password);
};

/**
 * Validate amount (positive number)
 */
exports.isValidAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

/**
 * Validate bank account number
 */
exports.isValidAccountNumber = (account) => {
  return account && account.length >= 10;
};

/**
 * Validate country code
 */
exports.isValidCountry = (country) => {
  const countries = ['NG', 'US', 'GB', 'CA', 'AU', 'ZA', 'KE', 'GH'];
  return countries.includes(country);
};
