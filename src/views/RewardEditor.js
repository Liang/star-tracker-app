// src/views/RewardEditor.js - FULLY FUNCTIONAL

import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const RewardEditor = ({ onBack }) => {
    const { householdId } = useAuth();
    // Get the rewardsTemplates from the global context
    const { rewardsTemplates } = useTracker(); 
    
    // Local state for the new reward form
    const [newRewardName, setNewRewardName] = useState('');
    const [newRewardCost, setNewRewardCost] = useState(100);

    // --- Add Reward Logic ---
    const handleAddReward = async () => {
        if (!newRewardName.trim() || newRewardCost <= 0) return;

        const newReward = { 
            id: Date.now().toString(), 
            name: newRewardName, 
            cost: newRewardCost 
        };
        
        // Create the new array by spreading the old array and adding the new reward
        const updatedRewards = [...rewardsTemplates, newReward];
        
        try {
            const householdRef = doc(db, "households", householdId);
            // Write the new array back to the Firebase document
            await updateDoc(householdRef, { rewardsTemplate: updatedRewards });
            
            // Clear the form inputs
            setNewRewardName('');
            setNewRewardCost(100);
        } catch (error) {
            alert("Error adding reward: " + error.message);
        }
    };
    
    // --- Remove Reward Logic ---
    const handleRemoveReward = async (rewardId) => {
        if (!window.confirm("Are you sure you want to remove this reward?")) return;
        
        // Filter out the reward we want to remove
        const updatedRewards = rewardsTemplates.filter(reward => reward.id !== rewardId);
        
        try {
            const householdRef = doc(db, "households", householdId);
            // Write the new, filtered array back to the Firebase document
            await updateDoc(householdRef, { rewardsTemplate: updatedRewards });
        } catch (error) {
            alert("Error removing reward: " + error.message);
        }
    };

    return (
        <div className="editor-container">
            <button onClick={onBack}>← Back to Settings</button>
            <h3>🎁 Reward Catalog Templates ({rewardsTemplates.length})</h3>

            {/* List Existing Rewards */}
            <ul className="editor-list">
                {rewardsTemplates.map(reward => (
                    <li key={reward.id}>
                        {reward.name} ({reward.cost} Pts)
                        <button className="remove-btn" onClick={() => handleRemoveReward(reward.id)}>Remove</button>
                    </li>
                ))}
            </ul>

            {/* Form to Add New Reward */}
            <h4>Add New Reward</h4>
            <div className="add-form">
                <input 
                    placeholder="Reward Name (e.g., Ice Cream)" 
                    value={newRewardName}
                    onChange={(e) => setNewRewardName(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Point Cost" 
                    value={newRewardCost}
                    onChange={(e) => setNewRewardCost(parseInt(e.target.value))}
                    min="1"
                />
                <button onClick={handleAddReward}>Add Reward</button>
            </div>
        </div>
    );
};

export default RewardEditor;
