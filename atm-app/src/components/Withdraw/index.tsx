import './styles.css';

import React, { useState } from 'react';
import { withdraw } from '../../services/atm';

const Withdraw: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [banknotes, setBanknotes] = useState<Object>({});
  const [error, setError] = useState<string | null>(null);

  const handleWithdraw = async () => {
    try {
      const data = await withdraw({ accountNumber, amount });
      setBanknotes(data.banknotes);
      setBalance(data.balance);
      setError(null);
    } catch (error: any) {
      setBanknotes({});
      setBalance(0);
      setError(error);
    }
  };

  return (
    <div className="Withdraw-container">
      <h2>ATM Withdrawal</h2>
      <input
        className="input"
        type="text"
        value={accountNumber}
        onChange={e => setAccountNumber(e.target.value)}
        placeholder="Enter account number"
      />
      <input
        className="input"
        type="number"
        value={amount}
        onChange={e => setAmount(parseInt(e.target.value))}
        placeholder="Enter amount"
      />
      <button onClick={handleWithdraw}>Withdraw</button>

      {error && <p>Error: {error}</p>}

      {Object.keys(banknotes).length > 0 && (
        <div>
          <h3>Banknotes to dispense:</h3>
          <ul>
            {Object.entries(banknotes).map(([banknote, count]) => (
              <li key={banknote}>
                {banknote} : {count}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h3>
          Balance:{' '}
          {balance.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </h3>
      </div>
    </div>
  );
};

export default Withdraw;
