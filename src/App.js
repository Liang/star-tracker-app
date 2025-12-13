import React from 'react';
import Dashboard from './views/Dashboard';
import LoginScreen from './views/LoginScreen';
import { TrackerProvider } from './context/TrackerContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
    const { currentUser } = useAuth(); // Check if a user is logged in

    return (
      <div className="app-container">
        <header className="app-header">
          <h1>⭐ Star Tracker</h1>
          <p>The fun way to manage tasks and earn rewards!</p>
        </header>
        
        {/* Conditional Rendering: Show Dashboard if logged in, otherwise Login */}
        {currentUser ? (
             <TrackerProvider>
                 <Dashboard />
             </TrackerProvider>
        ) : (
             <LoginScreen />
        )}

        <footer className="app-footer">
          <p>&copy; 2025 Star Tracker App</p>
        </footer>
      </div>
    );
}

// Main App component wrapping the AuthProvider
function App() {
  return (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
  );
}

export default App;
