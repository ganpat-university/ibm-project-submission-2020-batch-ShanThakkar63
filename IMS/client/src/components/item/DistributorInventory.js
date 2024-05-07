import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DistributorInventory = () => {
  const [inventory, setInventory] = useState([]);
  const academicId = 'your_academic_id'; // Replace with the actual academicId of the user

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`/api/user-inventory/${academicId}`);
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, [academicId]);

  return (
    <div>
      <h2>Distributor Inventory</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.item_no}>
            {item.item_no} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DistributorInventory;