import React, { createContext, useState, useContext, useEffect } from 'react';

// --- INITIAL DATA STRUCTURE ---
const initialData = [
    {
        id: 1,
        name: "Liam",
        points: 450,
        tasks: [
            { id: 'c1', name: "Make Bed", value: 10, isCompleted: false },
            { id: 'c2', name: "Read for 20 mins", value: 20, isCompleted: false },
        ],
        rewards: [
            { id: 'r1', name: "Extra 30 mins Screen Time", cost: 100 },
            { id: 'r2', name: "Choose Dinner for the Family", cost: 300 },
        ]
    },
    {
        id: 2,
        name: "Ella",
        points: 820,
        tasks: [
            { id: 'c3', name: "Tidy Desk", value: 15, isCompleted: false },
            { id: 'c4', name: "Brush Teeth (Behavior)", value: 5, isCompleted: false },
        ],
        rewards: [
            { id: 'r3', name: "New Book", cost: 500 },
        ]
    }
];

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
