import './styles.css';

import React, { useState } from 'react';
import { Users, DollarSign, User, List } from 'react-feather';
import Accounts from '../Accounts';
import Withdraw from '../Withdraw';
import Customers from '../Customers/Form';
import CustomersList from '../Customers/List';

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
        <li onClick={() => setSelectedItem('customers')}>
          <User />
          Register Customer
        </li>
        <li onClick={() => setSelectedItem('customersList')}>
          <List />
          List Customers
        </li>
      </div>

      <div className="main">
        <div className="header">
          <h1>Hello, Gustavo</h1>
        </div>
        {selectedItem === 'accounts' && <Accounts />}
        {selectedItem === 'withdraw' && <Withdraw />}
        {selectedItem === 'customers' && <Customers />}
        {selectedItem === 'customersList' && <CustomersList />}
      </div>
    </div >
  );
};

export default Home;
