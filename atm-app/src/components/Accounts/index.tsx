import './styles.css';

import React, { useEffect, useState } from 'react';
import { createAccount, getAccounts } from '../../services/atm';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCreateAccount = async () => {
    try {
      const data = await createAccount();
      setAccounts([...accounts, data.account]);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleAccounts = async () => {
    try {
      const data = await getAccounts('');
      setAccounts(data);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    handleAccounts();
  }, []);

  return (
    <div className="Accounts-container">
      <h2>Accounts</h2>
      <button className="button" onClick={handleCreateAccount}>
        Create Account
      </button>

      {error && <p className="error">Error: {error}</p>}

      {accounts.length > 0 && (
        <div>
          <h3>Accounts List:</h3>
          <ul>
            {accounts.map(({ accountNumber }) => (
              <li key={accountNumber}>Account Number: {accountNumber}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accounts;
