import "./styles.css";

import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/customer";

const Register: React.FC<{ onSuccessRegister: () => void }> = ({
  onSuccessRegister,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      showMessage("All fields are mandatory! Please try again.");
      return;
    }

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
      showMessage("Register successful!");
      onSuccessRegister();
    } catch (error: any) {
      showMessage("Existing email. Try with another email.");
    }
  };

  return (
    <div className="Register-container">
      <form
        className="register-form"
        onSubmit={handleRegister}
        method="post"
        autoComplete="off"
      >
        <fieldset className="register-fieldset">
          <h2>Register</h2>
          <div className="register-div">
            <label className="register-label" htmlFor="name">
              Full name{" "}
            </label>
            <input
              className="register-input"
              type="text"
              autoComplete="false"
              name="name"
              value={name}
              placeholder="Enter your full name"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="register-div">
            <label className="register-label" htmlFor="email">
              Email{" "}
            </label>
            <input
              className="register-input"
              type="email"
              autoComplete="off"
              name="email"
              value={email}
              placeholder="Enter your best email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="register-div">
            <label className="register-label" htmlFor="phone">
              Phone{" "}
            </label>
            <input
              className="register-input"
              type="tel"
              autoComplete="false"
              name="phone"
              value={phone}
              placeholder="-- ----- ----"
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="register-div">
            <label className="register-label" htmlFor="password">
              Password{" "}
            </label>
            <input
              className="register-input"
              type="password"
              autoComplete="new-password"
              name="password"
              value={password}
              placeholder="Create an access password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </fieldset>
        <button className="register-button" type="submit">
          Register
        </button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>

        {error && <p className="error">Error: {error}</p>}
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
