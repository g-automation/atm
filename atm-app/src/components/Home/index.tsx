import './styles.css';

import React, { useState } from 'react';
import { Users, DollarSign, List, LogIn, User, LogOut } from 'react-feather';
import Accounts from '../Accounts';
import Withdraw from '../Withdraw';
import Register from '../Customers/RegisterForm';
import CustomersList from '../Customers/List';
import Login from '../Customers/LoginForm';
import { logout } from '../../services/customer';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<string>('home');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [cookie, setCookie] = useState<any | null>(null);

  const handleLoginSuccess = async () => {
    setIsLogged(true);
  };

  const handleRegisterSuccess = async () => {
    setIsRegistered(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCookie(null);
      setIsLogged(false); //logged out
      console.log('Logout successful:', cookie);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="Home-container">
      <div className="sidebar">
        {isLogged ? (
          <>
            <li onClick={() => setSelectedItem('accounts')}>
              <Users />
              Accounts
            </li>
            <li onClick={() => setSelectedItem('withdraw')}>
              <DollarSign />
              Withdraw
            </li>
            <li onClick={() => setSelectedItem('customersList')}>
              <List />
              Registers
            </li>
            <li onClick={handleLogout}>
              <LogOut />
              Logout

            </li>
          </>
        ) : (
          <>
            <li onClick={() => setSelectedItem('register')}>
              <User />
              Register
            </li>
            <li onClick={() => setSelectedItem('login')}>
              <LogIn />
              Login
            </li>
          </>
        )}
      </div>

      <div className="main">
        <div className="header">
          <h1>Hello, Gustavo</h1>
        </div>
        {selectedItem === 'register' && (
          <Register onSuccessRegister={handleRegisterSuccess} />
        )}
        {selectedItem === 'login' && (
          <Login onSuccessLogin={handleLoginSuccess} />
        )}
        {selectedItem === 'accounts' && <Accounts />}
        {selectedItem === 'withdraw' && <Withdraw />}
        {selectedItem === 'customersList' && <CustomersList />}
      </div>
    </div>
  );
};

export default Home;
