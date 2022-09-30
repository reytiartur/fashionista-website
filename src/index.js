import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { FilterProvider } from './context/FilterContext';
import { CartProvider } from './context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FilterProvider>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </CartProvider>
        </FilterProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

