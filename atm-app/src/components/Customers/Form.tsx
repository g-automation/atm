import './styles.css';

import React, { FormEvent, useState } from 'react';
import { register } from '../../services/customer';

const Customers: React.FC = () => {
  //const [customers, setCustomers] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleCreateCustomer = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      name,
      email,
      phone,
      password,
    };

    console.log('body :>> ', body);

    try {
      const data = await register(body);
      console.log(data);
      setError(null);
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  //useEffect(() => { }, []);

  return (
    <div className="Customers-form-container">
      <main>
        <form
          className="customer-form"
          onSubmit={handleCreateCustomer}
          method="post"
        >
          <h3>Register Customer</h3>
          <label className="customer-label">Full name </label>
          <input
            className="customer-input"
            type="text"
            name="name"
            value={name}
            placeholder="Enter your full name"
            onChange={e => setName(e.target.value)}
          />
          <br />
          <br />
          <label className="customer-label">Email </label>
          <input
            className="customer-input"
            type="email"
            name="email"
            value={email}
            placeholder="Enter your best email"
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label className="customer-label">Phone </label>
          <input
            className="customer-input"
            type="tel"
            name="phone"
            value={phone}
            placeholder="-- ----- ----"
            onChange={e => setPhone(e.target.value)}
          />
          <br />
          <br />
          <label className="customer-label">Password </label>
          <input
            className="customer-input"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Create an access password"
          />
          <br />
          <br />
          <button type="submit" className="customer-button">
            Register
          </button>
          {error && <p className="error">Error: {error}</p>}
        </form>
      </main>
    </div>
  );
};

export default Customers;
