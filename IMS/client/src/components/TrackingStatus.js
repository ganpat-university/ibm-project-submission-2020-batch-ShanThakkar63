import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackingStatus = () => {
  const [tracking, setTracking] = useState([]);
  
  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get('/api/tracking')
      .then(response => {
        setTracking(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Handle status update - You'll need to adjust this for your actual API and component state
  const handleStatusChange = (requestId, newStatus) => {
    axios.post('/api/tracking', { requestId, status: newStatus })
      .then(response => {
        console.log(response.data);
        // Update local state to reflect the new status
        setTracking(tracking.map(t => t.requestId === requestId ? { ...t, status: newStatus } : t));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      {tracking.map((track, index) => (
        <div key={index}>
          <p>Request ID: {track.requestId}</p>
          <p>Status: {track.status}</p>
          {/* Add buttons or logic to update status */}
          <button onClick={() => handleStatusChange(track.requestId, 'Dispatched')}>Dispatched</button>
          <button onClick={() => handleStatusChange(track.requestId, 'In-Transit')}>In-Transit</button>
          <button onClick={() => handleStatusChange(track.requestId, 'Delivered')}>Delivered</button>
        </div>
      ))}
    </div>
  );
};

export default TrackingStatus;
