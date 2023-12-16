import './App.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Register from './components/Customers/RegisterForm';
import Login from './components/Customers/LoginForm';
import Accounts from './components/Accounts';
import Withdraw from './components/Withdraw';
import CustomersList from './components/Customers/List';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="register"
          element={<Register onSuccessRegister={() => {}} />}
        />
        <Route path="login" element={<Login onSuccessLogin={() => {}} />} />
        <Route path="customers" element={<CustomersList />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="withdraw" element={<Withdraw />} />
      </Routes>
    </div>
  );
}

export default App;
