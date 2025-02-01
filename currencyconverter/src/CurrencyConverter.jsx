import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';


const CurrencyConverter = () => {
  const [amounts, setAmounts] = useState({
    inr: '',
    usd: 0,
    eur: 0,
  });
  const [exchangeRates, setExchangeRates] = useState({ USD: 0, EUR: 0 });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (value <= 0) {
      setErrorMessage('Please enter a valid number.');
      setAmounts({ inr: '', usd: 0, eur: 0 });
    } else {
      setErrorMessage('');
      const usd = (value * exchangeRates.USD).toFixed(2);
      const eur = (value * exchangeRates.EUR).toFixed(2);
      setAmounts({ inr: value, usd, eur });
    }
  };

  return (
    <div className="currency-converter"> 
      <h2>Currency Converter</h2>
      <div className="converter-container">
        <div className="input-container">
          <label>Amount in INR:</label>
          <input
            type="number"
            value={amounts.inr}
            onChange={handleInputChange}
            placeholder="Enter amount in INR"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="output-container">
          <h3>Converted Amounts:</h3>
          <table>
            <tbody>
              <tr>
                <td>USD:</td>
                <td>{amounts.usd}$</td>
              </tr>
              <tr>
                <td>EUR:</td>
                <td>{amounts.eur}€</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
