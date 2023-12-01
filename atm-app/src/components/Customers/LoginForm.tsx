import './styles.css';

import React, { FormEvent, useState } from 'react';
import { login } from '../../services/customer';
//import { Routes, Route, Navigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            showMessage('Please fill in all fields');
            return;
        };

        const body = {
            email,
            password,
        };

        try {
            await login(body);
            setError(null);
            resetForm();
            showMessage('Login successful!');

        } catch (error: any) {
            showMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="Login-container">
            <main>
                <form className="login-form"
                    onSubmit={handleLogin}
                    method="post"
                >
                    <h3>Login</h3>
                    <label className="login-label" htmlFor="email">Email </label>
                    <input className="login-input"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <label className="login-label" htmlFor="password">Password </label>
                    <input className="login-input"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your access password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <button className="login-button" type="submit">
                        Login
                    </button>

                    {error && <p className="error">Error: {error}</p>}
                </form>
                {message && <p className="message">{message}</p>}
            </main>
        </div>
    );
};

export default Login;
