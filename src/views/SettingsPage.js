// src/views/SettingsPage.js

import React, { useState } from 'react';
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

// Add onBack to the function argument list
const SettingsPage = ({ onBack }) => { 
    // ... inside renderEditor() ...

    return (
        <div className="settings-page">
            {/* ADD A BACK BUTTON AT THE TOP OF THE SETTINGS PAGE */}
            <button className="back-to-dashboard-btn" onClick={onBack}>
                ← Back to Dashboard
            </button>
            {renderEditor()}
        </div>
    );
};

const SettingsPage = () => {
    const [currentView, setCurrentView] = useState(EDITOR_VIEWS.MAIN);

    const renderEditor = () => {
        switch (currentView) {
            case EDITOR_VIEWS.CHILDREN:
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
            {renderEditor()}
        </div>
    );
};

export default SettingsPage;
