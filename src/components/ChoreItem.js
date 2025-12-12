import React from 'react';
import { useTracker } from '../context/TrackerContext';

const ChoreItem = ({ childId, task }) => {
  const { updateTaskCompletion } = useTracker();

  const handleToggle = () => {
    updateTaskCompletion(childId, task.id);
  };

  const statusClass = task.isCompleted ? 'chore-completed' : 'chore-pending';

  return (
    <div className={`chore-item ${statusClass}`}>
      <span className="task-name">{task.name}</span>
      <span className="point-value">+{task.value} Pts</span>
      
      <button 
        className="completion-btn"
        onClick={handleToggle}
        disabled={task.isCompleted} 
      >
        {task.isCompleted ? '✅ Done' : 'Mark Complete'}
      </button>
    </div>
  );
};

export default ChoreItem;
