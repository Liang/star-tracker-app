import React from 'react';
import { useTracker } from '../context/TrackerContext';

const RewardCard = ({ childId, reward, currentPoints }) => {
  const { redeemReward } = useTracker();
  const canRedeem = currentPoints >= reward.cost;

  const handleRedeem = () => {
    if (canRedeem) {
      redeemReward(childId, reward.id);
      alert(`Reward "${reward.name}" redeemed for ${reward.cost} points!`);
    }
  };

  return (
    <div className={`reward-card ${canRedeem ? 'redeemable' : 'locked'}`}>
      <h4>{reward.name}</h4>
      <p>Cost: {reward.cost} Points</p>
      
      <button 
        onClick={handleRedeem}
        disabled={!canRedeem}
        className="redeem-btn"
      >
        {canRedeem ? 'Redeem Now' : `Need ${reward.cost - currentPoints} More`}
      </button>
    </div>
  );
};

export default RewardCard;
