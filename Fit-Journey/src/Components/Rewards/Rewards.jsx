import { useState, useEffect } from "react";
import "./Rewards.css";

export default function RewardSystem({ triggerReward }) {
  const [showPopup, setShowPopup] = useState(false);
  const [points, setPoints] = useState(0);

  // Load saved points on mount
  useEffect(() => {
    const saved = localStorage.getItem("rewardPoints");
    if (saved) setPoints(parseInt(saved));
  }, []);

  // Listen for trigger (when a reward event happens)
  useEffect(() => {
    if (triggerReward) {
      setPoints((prevPoints) => {
        const newTotal = prevPoints + 10;
        localStorage.setItem("rewardPoints", newTotal);
        setShowPopup(true);
        return newTotal;
      });
    }
  }, [triggerReward]);

  return (
    <>
      {showPopup && (
        <div className="reward-overlay">
          <div className="reward-popup">
            <h2>🎉 Great Job!</h2>
            <p>
              You earned <strong>10 points!</strong>
            </p>
            <p>
              Total: <strong>{points}</strong> points
            </p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
