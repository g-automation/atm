import './styles.css';

import React, { useEffect, useState } from 'react';
import { createAccount, getAccounts } from '../../services/atm';
import { Clipboard } from 'react-feather';

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
      <button className="button" onClick={handleCreateAccount}>
        Create Account
      </button>

      {error && <p className="error">Error: {error}</p>}

      {accounts.length > 0 && (
        <div>
          <h3>Accounts List:</h3>
          <ul>
            {accounts.map(({ accountNumber, balance }) => (
              <li key={accountNumber}>
                <p>
                  Account Number: {accountNumber}
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      border: 0,
                      cursor: 'pointer',
                    }}
                    onClick={() => navigator.clipboard.writeText(accountNumber)}
                    disabled={!accountNumber}
                  >
                    <Clipboard />
                  </button>
                </p>
                <span>
                  Balance:{' '}
                  {balance.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accounts;
