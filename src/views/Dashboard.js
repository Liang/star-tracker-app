// src/views/Dashboard.js - UPDATED for Firebase structure

import React from 'react';
import { useTracker } from '../context/TrackerContext';
import { useAuth } from '../context/AuthContext'; // To handle logout
import ChoreItem from '../components/ChoreItem';
import RewardCard from '../components/RewardCard';

const Dashboard = () => {
  // Get data from the new Tracker Context
  const { childrenData, tasksTemplates, rewardsTemplates } = useTracker(); 
  const { logout } = useAuth(); // Get logout function

  // Helper function to assign all template tasks to all children for display
  const getChildTasks = (childId) => {
    // In a final app, this would be customized per child. 
    // For now, we show all templates as pending for all children.
    return tasksTemplates.map(task => ({
      ...task,
      // For display, assume all are pending initially (we handle completion in context)
      isCompleted: false, 
      childId: childId 
    }));
  };

  return (
    <div className="dashboard-container">
        <div className="utility-bar">
            {/* Link to the Settings menu will go here later */}
            <button className="settings-btn" onClick={() => alert("Settings editor coming soon!")}>⚙️ Settings</button>
            <button className="logout-btn" onClick={logout}>Log Out</button>
        </div>

        {childrenData.length === 0 ? (
            <div className="setup-prompt">
                <h2>Welcome!</h2>
                <p>Your dashboard is empty because no children are set up in Firebase yet. Please ensure your 
                **households/DEMO_HOUSEHOLD_ID_123** document has the `children` array defined.</p>
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
