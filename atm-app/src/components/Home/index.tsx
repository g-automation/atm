import './styles.css';

import React, { useState } from "react";
import {
  DollarSign,
  List,
  LogIn,
  LogOut,
  Maximize2,
  User,
  Users,
} from "react-feather";
import { useModal } from "../../hooks/useModal";
import { logout } from "../../services/customer";
import Accounts from "../Accounts";
import CustomersList from "../Customers/List";
import Login from "../Customers/LoginForm";
import Register from "../Customers/RegisterForm";
import { Modal } from "../Modals/Modal";
import Withdraw from "../Withdraw";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState("home");
  const [isLogged, setIsLogged] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [cookie, setCookie] = useState<string | null>(null);

  const handleLoginSuccess = async () => {
    setIsLogged(true);
    setSelectedItem("/");
  };

  const handleRegisterSuccess = async () => {
    setIsRegistered(true);
    setSelectedItem("/");
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCookie(null);
      setIsLogged(false); //logged out
      console.log("Logout successful:", cookie);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="Home-container">
      <div className="sidebar">
          {isLogged ? (
            <>
              <li onClick={() => setSelectedItem("/")}>
                <p className="textHeader">Home</p>
              </li>
              <li onClick={() => setSelectedItem("accounts")}>
                <Users />
                Accounts
                 {/*<p className="textHeader">Accounts</p>*/}
              </li>
              <li onClick={() => setSelectedItem("withdraw")}>
                <DollarSign />
                Withdraw
                 {/*<p className="textHeader">Withdraw</p>*/}
              </li>
              <li onClick={() => setSelectedItem("customersList")}>
                <List />
                Registers
                 {/*<p className="textHeader">Registers</p>*/}
              </li>
              <li onClick={handleLogout}>
                <LogOut />
                Logout
                 {/*<p className="textHeader">Logout</p>*/}
              </li>
              <li
                onClick={() => {
                  setSelectedItem("useModal");
                  toggleModalVisibility();
                }}
              >
                <Maximize2 />
                Modal
              </li>
            </>
          ) : (
            <>
              <li onClick={() => setSelectedItem("register")}>
                <User />
                Register
                {/*<p className="textHeader">Register</p>*/}
              </li>
              <li onClick={() => setSelectedItem("login")}>
                <LogIn />
                Login
                {/*<p className="textHeader">Login</p>*/}
              </li>
            </>
          )}
      </div>

      <div className="main">
        <div className="header">
              <h1>Hello, User</h1>
        </div>
        {selectedItem === "register" && (
          <Register onSuccessRegister={handleRegisterSuccess} />
        )}
        {selectedItem === "login" && (
          <Login onSuccessLogin={handleLoginSuccess} />
        )}
        {selectedItem === "accounts" && <Accounts />}
        {selectedItem === "withdraw" && <Withdraw />}
        {selectedItem === "customersList" && <CustomersList />}
        {selectedItem === "useModal" && (
          <Modal
            isVisible={isModalVisible}
            toggleVisibility={toggleModalVisibility}
            modalContent={modalContent}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
