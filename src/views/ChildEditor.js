// src/views/ChildEditor.js - CORRECTED

import React from 'react';

const ChildEditor = ({ onBack }) => {
    return (
        <div className="editor-container">
            <button onClick={onBack}>← Back to Settings</button>
            <h3>👶 Child Profiles Editor (Coming Soon)</h3>
            <p>This is where you will add, remove, and rename children.</p>
        </div>
    );
};

export default ChildEditor; // <-- CRITICAL: This line makes the component available for import
