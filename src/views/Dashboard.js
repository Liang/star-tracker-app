// src/views/Dashboard.js - UPDATED for Firebase structure

import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { useAuth } from '../context/AuthContext'; // To handle logout
import ChoreItem from '../components/ChoreItem';
import RewardCard from '../components/RewardCard';
import SettingsPage from './SettingsPage';

const Dashboard = () => {
    // NEW STATE: Tracks whether the settings page is open
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
    // ... other contexts
    const { logout } = useAuth(); 

    if (isSettingsOpen) {
        // If settings is open, show the SettingsPage instead of the dashboard
        return <SettingsPage />;
    }

    return (
        <div className="dashboard-container">
            <div className="utility-bar">
                {/* UPDATE the settings button */}
                <button 
                    className="settings-btn" 
                    onClick={() => setIsSettingsOpen(true)} // <-- SETS isSettingsOpen to true
                >
                    ⚙️ Settings
                </button>
                <button className="logout-btn" onClick={logout}>Log Out</button>
            </div>

            {/* ... rest of the dashboard view code ... */}
        </div>
    );
};

export default Dashboard;
