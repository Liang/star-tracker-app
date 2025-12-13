// src/context/TrackerContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config'; // Import Firestore connection
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext'; // Import user authentication details

const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
    const { currentUser, householdId } = useAuth(); // Get current user and household ID
    const [trackerData, setTrackerData] = useState({
        children: [],
        tasksTemplate: [],
        rewardsTemplate: []
    });
    const [loadingData, setLoadingData] = useState(true);

    // 1. Real-time Listener for Household Data
    useEffect(() => {
        if (!currentUser || !householdId) {
            setLoadingData(false);
            return;
        }

        // Connect to the specific household document in Firestore
        const householdRef = doc(db, "households", householdId);

        // onSnapshot sets up a real-time listener: when the DB changes, this updates instantly
        const unsubscribe = onSnapshot(householdRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTrackerData({
                    children: data.children || [],
                    tasksTemplate: data.tasksTemplate || [],
                    rewardsTemplate: data.rewardsTemplate || []
                });
            } else {
                console.log("No household data found! Initializing setup required.");
                // NOTE: In a finished app, this would trigger an initial setup function.
            }
            setLoadingData(false);
        }, (error) => {
            console.error("Error fetching household data: ", error);
            setLoadingData(false);
        });

        return () => unsubscribe(); // Cleanup the listener when component unmounts
    }, [currentUser, householdId]);

    // --- CORE LOGIC FUNCTIONS (Now updating Firebase) ---

    // 2. Function to toggle task completion and update points in Firebase
    const updateTaskCompletion = async (childId, taskId) => {
        const childToUpdate = trackerData.children.find(c => c.id === childId);
        if (!childToUpdate) return;

        // Find the task template to get its point value
        const taskTemplate = trackerData.tasksTemplate.find(t => t.id === taskId);
        if (!taskTemplate) return;

        // Create a new child array with the updated points
        const updatedChildren = trackerData.children.map(child => {
            if (child.id === childId) {
                // NOTE: For simplicity, we assume the task is completed and points are added.
                // A more complex app would track daily completion state per child.
                return { 
                    ...child, 
                    points: child.points + taskTemplate.value 
                };
            }
            return child;
        });

        // Update the database
        const householdRef = doc(db, "households", householdId);
        await updateDoc(householdRef, { children: updatedChildren });
    };

    // 3. Function to redeem a reward and update points in Firebase
    const redeemReward = async (childId, rewardId) => {
        const childToUpdate = trackerData.children.find(c => c.id === childId);
        const reward = trackerData.rewardsTemplate.find(r => r.id === rewardId);

        if (!childToUpdate || !reward || childToUpdate.points < reward.cost) return;
        
        const updatedChildren = trackerData.children.map(child => {
            if (child.id === childId) {
                return { 
                    ...child, 
                    points: child.points - reward.cost 
                };
            }
            return child;
        });
        
        // Update the database
        const householdRef = doc(db, "households", householdId);
        await updateDoc(householdRef, { children: updatedChildren });
    };


    if (loadingData) {
        // Return a loading state while fetching data
        return <div className="loading-screen">Loading Star Tracker Data...</div>;
    }

    return (
        <TrackerContext.Provider value={{ 
            childrenData: trackerData.children, 
            tasksTemplates: trackerData.tasksTemplate, 
            rewardsTemplates: trackerData.rewardsTemplate,
            updateTaskCompletion, 
            redeemReward 
        }}>
            {children}
        </TrackerContext.Provider>
    );
};

export const useTracker = () => useContext(TrackerContext);
