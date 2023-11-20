import './styles.css';

import React, { useEffect, useState } from 'react';
import { createAccount, deleteAccount, deleteAllAccounts, getAccounts } from '../../services/atm';
import { Copy, Delete, Edit } from 'react-feather';

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
      const data = await getAccounts();
      setAccounts(data);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const data = await deleteAccount('_id');
      setAccounts([...accounts, data.account]);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleDeleteAllAccounts = async () => {
    try {
      alert("This action is irreversible! Do you want to permanently delete all accounts?");
      await deleteAllAccounts();
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
      <button className="button-delete-all" onClick={handleDeleteAllAccounts}>
        Delete all Accounts
      </button>
      {error && <p className="error">Error: {error}</p>}

      {
        accounts.length > 0 && (
          <div>
            <h3>Accounts List:</h3>
            <ul>
              {accounts.map(({ accountNumber, fullName, email, phone, balance }) => (
                <li key={accountNumber}>
                  <p>
                    Account Number: {accountNumber}
                    <button className='icon-copy'
                      onClick={() => navigator.clipboard.writeText(accountNumber)}
                      disabled={!accountNumber}
                    >
                      <Copy />
                    </button>
                    <button className='icon-edit'>
                      <Edit />
                    </button>
                    <button className='icon-delete' onClick={handleDeleteAccount}>
                      <Delete />
                    </button>
                  </p>
                  <p>
                    <ul>
                      Full Name: {fullName} <br />
                      Email: {email} <br />
                      Phone: {phone} <br />
                    </ul>
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
        )
      }
    </div >
  );
};

export default Accounts;
