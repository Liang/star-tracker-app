// src/views/Dashboard.js - REVISED to fix unused variable error

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SettingsPage from './SettingsPage';

// The three components that were throwing the unused error
import { useTracker } from '../context/TrackerContext';
import ChoreItem from '../components/ChoreItem';
import RewardCard from '../components/RewardCard';

const Dashboard = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
    const { logout } = useAuth(); 

    // Destructure ALL the context variables here.
    const { 
        childrenData, 
        tasksTemplates, 
        rewardsTemplates 
    } = useTracker(); // <-- This line is where the 'useTracker' error was resolved

    // Conditional render: If settings is open, show the settings page only.
    if (isSettingsOpen) {
        return <SettingsPage />;
    }

    // If we reach this point, settings is NOT open, so we render the dashboard.
    
    // Helper function to assign all template tasks to all children for display
    const getChildTasks = (childId) => {
        // This function USES tasksTemplates, resolving that related error
        return tasksTemplates.map(task => ({
          ...task,
          isCompleted: false, 
          childId: childId 
        }));
    };

    return (
        <div className="dashboard-container">
            <div className="utility-bar">
                <button 
                    className="settings-btn" 
                    onClick={() => setIsSettingsOpen(true)}
                >
                    ⚙️ Settings
                </button>
                <button className="logout-btn" onClick={logout}>Log Out</button>
            </div>

            {childrenData.length === 0 ? (
                <div className="setup-prompt">
                    <h2>Welcome!</h2>
                    <p>Your dashboard is empty. Please ensure your Firebase data is initialized correctly.</p>
                </div>
            ) : (
                childrenData.map(child => (
                    <div key={child.id} className="child-card">
                        <div className="child-header">
                            <h2>{child.name}</h2>
                            <div className="points-display">
                                Total Points: <span>{child.points}</span> ⭐
                            </div>
                        </div>

                        <div className="tasks-section">
                            <h3>Daily Tasks & Behaviors</h3>
                            <div className="tasks-list">
                                {getChildTasks(child.id).map(task => (
                                    // This uses ChoreItem, resolving that related error
                                    <ChoreItem 
                                        key={task.id} 
                                        childId={child.id}
                                        task={task} 
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <div className="rewards-section">
                            <h3>Rewards Catalog</h3>
                            <div className="rewards-list">
                                {rewardsTemplates.map(reward => (
                                    // This uses RewardCard, resolving that related error
                                    <RewardCard
                                        key={reward.id}
                                        childId={child.id}
                                        reward={reward}
                                        currentPoints={child.points}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;
