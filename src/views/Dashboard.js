import React from 'react';
import { useTracker } from '../context/TrackerContext';
import ChoreItem from '../components/ChoreItem';
import RewardCard from '../components/RewardCard';

const Dashboard = () => {
  const { childrenData } = useTracker(); 

  return (
    <div className="dashboard-container">
      {childrenData.map(child => (
        <div key={child.id} className="child-card">
          <div className="child-header">
            <h2>{child.name}</h2>
            <div className="points-display">
              Total Points: <span>{child.points}</span> ⭐
            </div>
          </div>

          <div className="tasks-section">
            <h3>Daily Tasks & Behaviors</h3>
            <div className="tasks-list">
              {child.tasks.length > 0 ? (
                child.tasks.map(task => (
                  <ChoreItem 
                    key={task.id} 
                    childId={child.id}
                    task={task} 
                  />
                ))
              ) : (<p>No tasks configured for today.</p>)}
            </div>
          </div>
          
          <div className="rewards-section">
            <h3>Rewards Catalog</h3>
            <div className="rewards-list">
              {child.rewards.map(reward => (
                <RewardCard
                  key={reward.id}
                  childId={child.id}
                  reward={reward}
                  currentPoints={child.points}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
