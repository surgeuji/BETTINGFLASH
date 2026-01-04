/**
 * Notification Service
 * 
 * Sends email and SMS notifications
 * Currently configured with provided SMTP credentials
 */

const nodemailer = require('nodemailer');
const config = require('../config/env');

class NotificationService {
  constructor() {
    // Initialize SMTP transporter
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: false, // true for 465, false for 587
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });
  }

  /**
   * Send email
   */
  async sendEmail(to, subject, html) {
    try {
      const info = await this.transporter.sendMail({
        from: config.smtpFrom,
        to: to,
        subject: subject,
        html: html,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      console.error('Email send error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Send registration confirmation
   */
  async sendRegistrationEmail(email, fullName) {
    const html = `
      <h2>Welcome to Betting Flash, ${fullName}!</h2>
      <p>Your registration has been successful.</p>
      <p>You can now log in and start betting.</p>
    `;

    return this.sendEmail(email, 'Registration Confirmation - Betting Flash', html);
  }

  /**
   * Send deposit approval email
   */
  async sendDepositApprovalEmail(email, amount, bonusAmount) {
    const html = `
      <h2>Deposit Approved</h2>
      <p>Your deposit of ${amount} NGN has been approved.</p>
      ${bonusAmount > 0 ? `<p>Bonus Applied: ${bonusAmount} NGN</p>` : ''}
      <p>Funds are now available in your wallet.</p>
    `;

    return this.sendEmail(email, 'Deposit Approved - Betting Flash', html);
  }

  /**
   * Send withdrawal approval email
   */
  async sendWithdrawalApprovalEmail(email, amount) {
    const html = `
      <h2>Withdrawal Approved</h2>
      <p>Your withdrawal of ${amount} NGN has been approved and will be processed within 24 hours.</p>
    `;

    return this.sendEmail(email, 'Withdrawal Approved - Betting Flash', html);
  }

  /**
   * Send admin notification
   */
  async notifyAdmin(subject, message) {
    const html = `
      <h2>${subject}</h2>
      <p>${message}</p>
    `;

    return this.sendEmail(config.adminEmail, subject, html);
  }

  /**
   * SMS notification (placeholder)
   * To be implemented with SMS service (Twilio, Vonage, etc.)
   */
  async sendSMS(phoneNumber, message) {
    console.log(`[SMS] To: ${phoneNumber}, Message: ${message}`);
    // Placeholder for actual SMS integration
    return { success: true };
  }
}

module.exports = new NotificationService();
