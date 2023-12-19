import './styles.css';

import React, { useState } from 'react';
import {
  DollarSign,
  List,
  LogIn,
  LogOut,
  Maximize2,
  User,
  Users,
} from 'react-feather';
import { useModal } from "../../hooks/useModal";
import { logout } from "../../services/customer";
import Accounts from '../Accounts';
import CustomersList from '../Customers/List';
import Login from '../Customers/LoginForm';
import Register from '../Customers/RegisterForm';
import { Modal } from "../Modals/Modal";
import Withdraw from '../Withdraw';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<string>('home');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [cookie, setCookie] = useState<any | null>(null);

  const handleLoginSuccess = async () => {
    setIsLogged(true);
    setSelectedItem('/');
  };

  const handleRegisterSuccess = async () => {
    setIsRegistered(true);
    setSelectedItem('/');
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
              <li onClick={() => setSelectedItem('/')}>
                <p className="textHeader">Home</p>
              </li>
              <li onClick={() => setSelectedItem('accounts')}>
                <Users />
                <p className="textHeader">Accounts</p>
              </li>
              <li onClick={() => setSelectedItem('withdraw')}>
                <DollarSign />
                <p className="textHeader">Withdraw</p>
              </li>
              <li onClick={() => setSelectedItem('customersList')}>
                <List />
                <p className="textHeader">Registers</p>
              </li>
              <li onClick={handleLogout}>
                <LogOut />
                <p className="textHeader">Logout</p>
              </li>
            </>
          ) : (
            <>
              <li onClick={() => setSelectedItem('register')}>
                <User />
                <p className="textHeader">Register</p>
              </li>
              <li onClick={() => setSelectedItem('login')}>
                <LogIn />
                <p className="textHeader">Login</p>
              </li>
            </>
          )}
      </div>

      <div className="main">
        <div className="header">
          {isLogged ? (
            <>
              <h1>Hello, User</h1>
            </>
          ) : (
            <h1>Hello</h1>
          )}
        </div>
        {selectedItem === '/' && isLogged}
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
}

export default Home;
