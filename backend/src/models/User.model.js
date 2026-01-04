/**
 * User Model (Data Structure Only - No Database)
 * 
 * Defines the shape of user data
 * Data is stored in-memory in the UserService
 */

class User {
  constructor(data) {
    this.id = data.id || null;
    this.fullName = data.fullName || null;
    this.email = data.email || null;
    this.phone = data.phone || null;
    this.password = data.password || null; // hashed
    this.country = data.country || null;
    this.bankAccountNumber = data.bankAccountNumber || null;
    this.bankName = data.bankName || null;
    this.accountNameHolder = data.accountNameHolder || null;
    this.accountName = data.accountName || null;
    this.promoCode = data.promoCode || null;
    this.status = data.status || 'ACTIVE'; // ACTIVE, FROZEN, SUSPENDED
    this.role = data.role || 'USER'; // USER, ADMIN
    this.adminRole = data.adminRole || null; // SUPER_ADMIN, FINANCE_ADMIN, OPERATIONS_ADMIN, SUPPORT_ADMIN
    this.kycVerified = data.kycVerified || false;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

module.exports = User;
