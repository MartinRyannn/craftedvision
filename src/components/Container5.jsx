import { useState, useEffect } from 'react';
import '../styles/styles5.scss';
import back from '../images/back-obj.png';
import FloatingTeam from './FloatingTeam';

function Container5() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    return nameRegex.test(name);
  };

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate >= today;
  };

  const sanitizeInput = (input) => {
    return input.replace(/[<>{}]/g, '').trim();
  };

  const validateForm = () => {
    const newErrors = {};
    const sanitizedName = sanitizeInput(formData.fullName);
    const sanitizedEmail = sanitizeInput(formData.email);

    if (!sanitizedName || !validateName(sanitizedName)) {
      newErrors.fullName = 'Please enter a valid name (2-50 characters, letters only)';
    }

    if (!sanitizedEmail || !validateEmail(sanitizedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date || !validateDate(formData.date)) {
      newErrors.date = 'Please select a future date';
    }

    return newErrors;
  };

  const showAlertMessage = (message, type) => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => setShowAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // Always show success message and clear form fields
      setTimeout(() => {
        showAlertMessage('Meeting scheduled successfully!', 'success');
        setFormData({ fullName: '', email: '', date: '' });
        setIsSubmitting(false);
      }, 800); // Short delay to simulate processing
    } else {
      setErrors(formErrors);
      showAlertMessage('Please correct the errors in the form.', 'error');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <section className="container5">
      <div className="topTextContainer w f">
        <div className="miniHeading w">Contact Us</div>
        <div className="largeHeading g m">Book A Meeting With Us</div>
      </div>
      
      {showAlert.show && (
        <div className={`alert ${showAlert.type}`}>
          {showAlert.message}
        </div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
              maxLength={50}
              autoComplete="name"
            />
            <label className={formData.fullName ? 'active' : ''}>Full Name</label>
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              maxLength={100}
              autoComplete="email"
            />
            <label className={formData.email ? 'active' : ''}>Email</label>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Scheduling...' : 'Book Meeting'}
          </button>
        </form>

        <div className="contact-info">
          <div className="info-item">
            <h3>Give us a call!</h3>
            <p>+371 22098295</p>
          </div>
          <div className="info-item">
            <h3>Message us</h3>
            <p>contact@example.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Container5;