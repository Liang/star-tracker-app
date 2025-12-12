import React from 'react';
import ReactDOM from 'client'; // Use 'client' for React 18
import './styles/global.css'; // Import global styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
