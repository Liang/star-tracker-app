// src/views/RewardEditor.js - CORRECTED

import React from 'react';

const RewardEditor = ({ onBack }) => {
    return (
        <div className="editor-container">
            <button onClick={onBack}>← Back to Settings</button>
            <h3>🎁 Reward Catalog Editor (Coming Soon)</h3>
            <p>This is where you will set up rewards and their point costs.</p>
        </div>
    );
};

export default RewardEditor; // <-- CRITICAL: Default export
