import atmlogo from '../../Assets/atm-clipart-2018-20 (2).png';
import './styles.css';

import React, { useState } from 'react';
import {
  AlignLeft,
  DollarSign,
  List,
  LogIn,
  LogOut,
  Maximize2,
  User,
  Users,
} from 'react-feather';
import { useModal } from '../../hooks/useModal';
import { logout } from '../../services/customer';
import Accounts from '../Accounts';
import CustomersList from '../Customers/List';
import Login from '../Customers/LoginForm';
import Register from '../Customers/RegisterForm';
import { Modal } from '../Modals/Modal';
import MyCalendar from '../MyCalendar/MyCalendar';
import ToDoList from '../ToDoList';
import Withdraw from '../Withdraw';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState('home');
  const [isLogged, setIsLogged] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [cookie, setCookie] = useState<string | null>(null);

  const handleLoginSuccess = async () => {
    setIsLogged(true);
    setSelectedItem('/');
  };

  const handleRegisterSuccess = async () => {
    setIsRegistered(true);
    setSelectedItem('login');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCookie(null);
      setIsLogged(false); //logged out
      setSelectedItem('login');
      console.log('Logout successful:', cookie);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // test modal
  const { isModalVisible, toggleModalVisibility } = useModal();

  const modalContent: React.ReactNode = (
    // modal content
    <div>
      <h3>Modal Test</h3>
      <form>
        <fieldset>
          <legend>Form</legend>
          <div>
            <label htmlFor="label">Label </label>
            <input type="text" placeholder="Enter with an input" />
          </div>
          <div>
            <label htmlFor="label">Label </label>
            <input type="text" placeholder="Enter with an input" />
          </div>
          <fieldset>
            <legend>Choose</legend>
            <div>
              <label htmlFor="select">Select </label>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </fieldset>
          <div>
            <input type="checkbox" id="check" name="check" />
            <label htmlFor="check"> Check</label>
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

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
            <li onClick={() => setSelectedItem('ToDoList')}>
              <AlignLeft />
              ToDoList
            </li>
            <li onClick={() => setSelectedItem('MyCalendar')}>
              <AlignLeft />
              Calendar
            </li>
            <li
              onClick={() => {
                setSelectedItem('useModal');
                toggleModalVisibility();
              }}
            >
              <Maximize2 />
              Modal
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
          <img className="img-logo" src={atmlogo} alt="logo-ATM" />
          <h1>ATM BANK</h1>
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
        {selectedItem === 'useModal' && (
          <Modal
            isVisible={isModalVisible}
            toggleVisibility={toggleModalVisibility}
            modalContent={modalContent}
          />
        )}
        {selectedItem === 'ToDoList' && <ToDoList />}
        {selectedItem === 'MyCalendar' && <MyCalendar />}
      </div>
    </div>
  );
};

export default Home;
