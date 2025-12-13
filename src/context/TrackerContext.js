import React, { createContext, useState, useContext, useEffect } from 'react';

const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
    // Load data from localStorage or use initialData
    const [childrenData, setChildrenData] = useState(() => {
        const savedData = localStorage.getItem('starTrackerData');
        return savedData ? JSON.parse(savedData) : initialData;
    });

    // Effect to save data to localStorage whenever childrenData changes
    useEffect(() => {
        localStorage.setItem('starTrackerData', JSON.stringify(childrenData));
    }, [childrenData]);

    // --- CORE LOGIC FUNCTIONS ---

    const updateTaskCompletion = (childId, taskId) => {
        setChildrenData(prevData => {
            return prevData.map(child => {
                if (child.id === childId) {
                    const taskIndex = child.tasks.findIndex(t => t.id === taskId);
                    if (taskIndex !== -1 && !child.tasks[taskIndex].isCompleted) {
                        const taskValue = child.tasks[taskIndex].value;
                        const updatedTasks = [...child.tasks];
                        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], isCompleted: true };
                        
                        return { 
                            ...child, 
                            points: child.points + taskValue, 
                            tasks: updatedTasks 
                        };
                    }
                }
                return child;
            });
        });
    };

    const redeemReward = (childId, rewardId) => {
        setChildrenData(prevData => {
            return prevData.map(child => {
                if (child.id === childId) {
                    const reward = child.rewards.find(r => r.id === rewardId);
                    if (reward && child.points >= reward.cost) {
                        return { 
                            ...child, 
                            points: child.points - reward.cost 
                        };
                    }
                }
                return child;
            });
        });
    };

    return (
        <TrackerContext.Provider value={{ childrenData, updateTaskCompletion, redeemReward }}>
            {children}
        </TrackerContext.Provider>
    );
};

export const useTracker = () => useContext(TrackerContext);
