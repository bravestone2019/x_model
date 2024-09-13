import React, { useState } from 'react';
import './App.css'; 

const ModalForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) newErrors.username = 'Username is required.';

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format. Please enter a valid email address.';
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
    }

    // Date validation
    const today = new Date();
    const dob = new Date(formData.dob);
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    } else if (isNaN(dob.getTime())) {
      newErrors.dob = 'Invalid date format.';
    } else if (dob > today) {
      newErrors.dob = 'Date of birth cannot be in the future.';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      alert('Form submitted successfully!');
      setShowModal(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className.includes('modal')) {
      setShowModal(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content" role="dialog" aria-labelledby="modalTitle" aria-modal="true">
            <h2 id="modalTitle">Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input id="username" value={formData.username} onChange={handleChange} aria-required="true" />
                {errors.username && <span className="error">{errors.username}</span>}
              </div>
              <div>
                <label htmlFor="email">Email Address:</label>
                <input id="email" type="email" value={formData.email} onChange={handleChange} aria-required="true" />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input id="phone" type="tel" value={formData.phone} onChange={handleChange} aria-required="true" />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleChange} aria-required="true" />
                {errors.dob && <span className="error">{errors.dob}</span>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
