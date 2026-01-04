/**
 * Register Page
 * User registration with all required fields
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    country: 'NG',
    bankAccountNumber: '',
    bankName: '',
    accountNameHolder: '',
    accountName: '',
    promoCode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration
  };

  return (
    <div className="register-container">
      <h1>Join Betting Flash</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields will be added */}
      </form>
    </div>
  );
};

export default Register;
