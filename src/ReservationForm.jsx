// src/components/ReservationForm.js
import React, { useState } from 'react';
import { db } from './firebase';
import { ref, set } from 'firebase/database';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationId = Date.now().toString(); // Generate a unique ID for each reservation
    try {
      await set(ref(db, 'reservations/' + reservationId), formData);
      alert('Reservation submitted successfully!');
      setFormData({ name: '', email: '', date: '', time: '', guests: 1 });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to submit reservation');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <div>
        <label>Time:</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      </div>
      <div>
        <label>Number of Guests:</label>
        <input type="number" name="guests" value={formData.guests} onChange={handleChange} min="1" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReservationForm;
