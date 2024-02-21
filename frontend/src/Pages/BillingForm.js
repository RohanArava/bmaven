import React, { useState } from 'react';
import './BillingForm.css'; // Create a CSS file named Form.css for styling

const EventForm = () => {
  const [serviceName, setServiceName] = useState('');
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(`Name: ${serviceName}, Phone Number: ${userId}`);
    // You can add your logic to submit the form data to a backend or perform any other action
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="">
        {/* <h2 className='primary-text' style={{'textAlign': 'center', 'marginBottom': 0}}>Send a bill to user?</h2> */}
        <div className="form-group">
          <label className='on-surface-text' htmlFor="userId">User Id:</label>
          <input
            type="text"
            placeholder="Enter User Id"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className='on-surface-text' htmlFor="userId">Service/Item Name:</label>
          <input
            type="text"
            placeholder="Enter Service"
            id="userId"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className='on-surface-text' htmlFor="phone">Amount:</label>
          <input
            type="number"
            id="phone"
            placeholder='Enter Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className='on-surface-text' htmlFor="phone">Description:</label>
          <input
            type="tel"
            id="phone"
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn tertiary-container on-tertiary-container-text">Submit</button>
      </form>
    </div>
  );
};

export default EventForm;
