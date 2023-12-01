import './styles.css';

import React, { useState } from 'react';
import { Users, DollarSign, List, LogIn, ArrowRight } from 'react-feather';
import Accounts from '../Accounts';
import Withdraw from '../Withdraw';
import Register from '../Customers/RegisterForm';
import CustomersList from '../Customers/List';
import Login from '../Customers/LoginForm';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<string>('home');

  return (
    <div className="Home-container">
      <div className="sidebar">
        <li onClick={() => setSelectedItem('accounts')}>
          <Users />
          Accounts
        </li>
        <li onClick={() => setSelectedItem('withdraw')}>
          <DollarSign />
          Withdraw
        </li>
        <li onClick={() => setSelectedItem('register')}>
          <ArrowRight />
          Register
        </li>
        <li onClick={() => setSelectedItem('login')}>
          <LogIn />
          Login
        </li>
        <li onClick={() => setSelectedItem('customersList')}>
          <List />
          Registers
        </li>
      </div>

      <div className="main">
        <div className="header">
          <h1>Hello, Gustavo</h1>
        </div>
        {selectedItem === 'login' && <Login />}
        {selectedItem === 'accounts' && <Accounts />}
        {selectedItem === 'withdraw' && <Withdraw />}
        {selectedItem === 'register' && <Register />}
        {selectedItem === 'customersList' && <CustomersList />}
      </div>
    </div>
  );
};

export default Home;
