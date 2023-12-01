import './styles.css';

import React, { FormEvent, useState } from 'react';
import { register } from '../../services/customer';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      showMessage('All fields are mandatory! Please try again.');
      return;
    };

    const body = {
      name,
      email,
      phone,
      password,
    };

    try {
      await register(body);
      setError(null);
      resetForm();
      showMessage('Register successful!');

    } catch (error: any) {
      setError(error);
    }
  };
  //useEffect(() => { }, []);

  return (
    <div className="Register-container">
      <main>
        <form
          className="register-form"
          onSubmit={handleRegister}
          method="post"
        >
          <h3>Register</h3>
          <label className="register-label" htmlFor="name">Full name </label>
          <input
            className="register-input"
            type="text"
            name="name"
            value={name}
            placeholder="Enter your full name"
            onChange={e => setName(e.target.value)}
          />
          <br />
          <br />
          <label className="register-label" htmlFor="email">Email </label>
          <input
            className="register-input"
            type="email"
            name="email"
            value={email}
            placeholder="Enter your best email"
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label className="register-label" htmlFor="phone">Phone </label>
          <input
            className="register-input"
            type="tel"
            name="phone"
            value={phone}
            placeholder="-- ----- ----"
            onChange={e => setPhone(e.target.value)}
          />
          <br />
          <br />
          <label className="register-label" htmlFor="password">Password </label>
          <input
            className="register-input"
            type="password"
            name="password"
            value={password}
            placeholder="Create an access password"
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit" className="register-button">
            Register
          </button>
          {error && <p className="error">Error: {error}</p>}
        </form>
        {message && <p className="message">{message}</p>}
      </main>
    </div>
  );
};

export default Register;
