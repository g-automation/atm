import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../../services/customer';
import './styles.css';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCustomers = async () => {
    try {
      const data = await getAllCustomers();
      if (data) {
        setCustomers(data.customers);
      } else {
        setError('No data found.');
      }
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    handleCustomers();
  }, []);

  return (
    <div className="Customers-container">
      <h3>Registers list:</h3>
      <ul>
        {customers.map(customer => (
          <li className="register-list" key={customer._id}>
            <p>Id: {customer._id}</p>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <br />
          </li>
        ))}
      </ul>
      {error && <p>Error when listing customers: {error}</p>}
    </div>
  );
};

export default CustomersList;
