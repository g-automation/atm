import React from 'react';
import './styles.css';
import { Search, User } from 'react-feather';
import Withdraw from '../Withdraw';

const Home = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <div className="user">
          <User />
          Gustavo Bernardes
        </div>
        <ul>
          <li>Home</li>
          <li>Balance</li>
          <li>Withdraw</li>
        </ul>
      </div>
      <div className="main">
        <div className="header">
          <h1>Hello, Gustavo</h1>
          <div className="search">
            <input type="text" placeholder="Search..." />
            <button>
              <Search />
            </button>
          </div>
        </div>
        <Withdraw />
      </div>
    </div>
  );
};

export default Home;
