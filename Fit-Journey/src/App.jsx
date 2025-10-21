import React, { useState } from "react";
import Profile from "./Components/Profile/Profile.jsx";
import DailyGoals from "./Components/DailyGoals/DailyGoals.jsx";
import Heartrate from "./Components/Heartrate/Heartrate";
import Rewards from "./Components/RewardsForGoals/Rewards.jsx";
import "./App.css";
import Schedule from "./Components/Schedule/Schedule.jsx";
// import RewardsSection from "./Components/Rewards/RewardsSection.jsx";

export default function App() {
  const [today, setToday] = useState({
    steps: 4200,
    calories: 900,
    heartRate: 80,
  });
  const [goals, setGoals] = useState({
    steps: 10000,
    calories: 2000,
    heartRate: 60,
  });

  const handleUpdate = ({ todayEntry, goals: nextGoals }) => {
    if (todayEntry) setToday(todayEntry);
    if (nextGoals) setGoals(nextGoals);
  };

  return (
    <div className="tracker-layout">
      {/* Left Column */}
      <div className="left-column">
        <DailyGoals todayEntry={today} goals={goals} onUpdate={handleUpdate} />
        <Heartrate />
        <Rewards todayEntry={today} goals={goals} />
        {/* <Sleep /> will go here later */}
      </div>

      {/* Right Column */}
      <div className="right-column">
        <Profile />
        <Schedule />
        {/* <Schedule /> and <Rewards /> will go here later */}
      </div>
      {/* <div>
        <RewardsSection />
      </div> */}
    </div>
  );
}
