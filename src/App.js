import React from 'react';
import Dashboard from './views/Dashboard';
import { TrackerProvider } from './context/TrackerContext';

function App() {
  return (
    <TrackerProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>⭐ Star Tracker</h1>
          <p>The fun way to manage tasks and earn rewards!</p>
        </header>
        <Dashboard />
        <footer className="app-footer">
          <p>&copy; 2025 Star Tracker App</p>
        </footer>
      </div>
    </TrackerProvider>
  );
}

export default App;
