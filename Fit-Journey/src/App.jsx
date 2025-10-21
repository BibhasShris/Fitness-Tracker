import React, { useState } from "react";
import Profile from "./Components/Profile/Profile.jsx";
import DailyGoals from "./Components/DailyGoals/DailyGoals.jsx";
import "./App.css";
import Schedule from "./Components/Schedule/Schedule.jsx";
import RewardSystem from "./Components/Rewards/Rewards.jsx";

export default function App() {
  const [today, setToday] = useState({ steps: 0, calories: 0, heartRate: 80 });

  const handleUpdate = (updated) => {
    setToday(updated);
    console.log("Updated goals:", updated);
  };
  return (
    <div className="tracker-layout">
      {/* Left Column */}
      <div className="left-column">
        <DailyGoals todayEntry={today} onUpdate={handleUpdate} />
        {/* <Sleep /> will go here later */}
      </div>

      {/* Right Column */}
      <div className="right-column">
        <Profile />
        <Schedule />
        {/* <Schedule /> and <Rewards /> will go here later */}
      </div>
      <div>
        <RewardSystem />
      </div>
    </div>
  );
}
