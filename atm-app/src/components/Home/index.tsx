import './styles.css';

import React, { useState } from 'react';
import { Users, DollarSign } from 'react-feather';
import Accounts from '../Accounts';
import Withdraw from '../Withdraw';

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
      </div>

      <div className="main">
        <div className="header">
          <h1>Hello, Gustavo</h1>
        </div>
        {selectedItem === 'accounts' && <Accounts />}
        {selectedItem === 'withdraw' && <Withdraw />}
      </div>
    </div>

  );
};

export default Home;