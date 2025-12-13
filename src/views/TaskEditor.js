// src/views/TaskEditor.js

import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const TaskEditor = ({ onBack }) => {
    const { householdId } = useAuth();
    const { tasksTemplates } = useTracker();
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskValue, setNewTaskValue] = useState(10);

    // Function to add a new task template to Firebase
    const handleAddTask = async () => {
        if (!newTaskName.trim() || newTaskValue <= 0) return;

        const newTask = { 
            id: Date.now().toString(), 
            name: newTaskName, 
            value: newTaskValue 
        };
        
        const updatedTasks = [...tasksTemplates, newTask];
        
        try {
            const householdRef = doc(db, "households", householdId);
            await updateDoc(householdRef, { tasksTemplate: updatedTasks });
            setNewTaskName('');
            setNewTaskValue(10);
        } catch (error) {
            alert("Error adding task: " + error.message);
        }
    };
    
    // Function to remove a task template from Firebase
    const handleRemoveTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to remove this task template?")) return;
        
        const updatedTasks = tasksTemplates.filter(task => task.id !== taskId);
        
        try {
            const householdRef = doc(db, "households", householdId);
            await updateDoc(householdRef, { tasksTemplate: updatedTasks });
        } catch (error) {
            alert("Error removing task: " + error.message);
        }
    };

    return (
        <div className="editor-container">
            <button onClick={onBack}>← Back to Settings</button>
            <h3>📋 Task Templates ({tasksTemplates.length})</h3>

            {/* List Existing Tasks */}
            <ul className="editor-list">
                {tasksTemplates.map(task => (
                    <li key={task.id}>
                        {task.name} (+{task.value} Pts)
                        <button className="remove-btn" onClick={() => handleRemoveTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>

            {/* Form to Add New Task */}
            <h4>Add New Task</h4>
            <div className="add-form">
                <input 
                    placeholder="Task Name" 
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Points" 
                    value={newTaskValue}
                    onChange={(e) => setNewTaskValue(parseInt(e.target.value))}
                    min="1"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskEditor;
