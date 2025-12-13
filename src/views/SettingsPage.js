// src/views/SettingsPage.js - UPDATED for Back-to-Dashboard Functionality

import React, { useState } from 'react';
// These three imports are necessary for the rendering logic below
import ChildEditor from './ChildEditor';
import TaskEditor from './TaskEditor';
import RewardEditor from './RewardEditor';

// Define the editor options
const EDITOR_VIEWS = {
    CHILDREN: 'children',
    TASKS: 'tasks',
    REWARDS: 'rewards',
    MAIN: 'main'
};

// Component receives the 'onBack' function from Dashboard.js
const SettingsPage = ({ onBack }) => {
    const [currentView, setCurrentView] = useState(EDITOR_VIEWS.MAIN);

    const renderEditor = () => {
        switch (currentView) {
            case EDITOR_VIEWS.CHILDREN:
                // Note: The editors themselves have a back button to return to the MAIN settings menu
                return <ChildEditor onBack={() => setCurrentView(EDITOR_VIEWS.MAIN)} />;
            case EDITOR_VIEWS.TASKS:
                return <TaskEditor onBack={() => setCurrentView(EDITOR_VIEWS.MAIN)} />;
            case EDITOR_VIEWS.REWARDS:
                return <RewardEditor onBack={() => setCurrentView(EDITOR_VIEWS.MAIN)} />;
            case EDITOR_VIEWS.MAIN:
            default:
                return (
                    <div className="settings-main-menu">
                        <h2>🛠️ Household Settings</h2>
                        <button onClick={() => setCurrentView(EDITOR_VIEWS.CHILDREN)}>
                            👶 Edit Children Profiles & Points
                        </button>
                        <button onClick={() => setCurrentView(EDITOR_VIEWS.TASKS)}>
                            📋 Edit Task & Behavior Templates
                        </button>
                        <button onClick={() => setCurrentView(EDITOR_VIEWS.REWARDS)}>
                            🎁 Edit Rewards Catalog
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="settings-page">
            {/* THIS BUTTON USES THE 'onBack' PROP to switch the state in Dashboard.js */}
            <button className="back-to-dashboard-btn" onClick={onBack}>
                ← Back to Dashboard
            </button>
            
            {renderEditor()}
        </div>
    );
};

export default SettingsPage;
