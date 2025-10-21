import React, { useState } from "react";
import Profile from "./Components/Profile/Profile.jsx";
import DailyGoals from "./Components/DailyGoals/DailyGoals.jsx";
import Heartrate from "./Components/Heartrate/Heartrate";
import Rewards from "./Components/RewardsForGoals/Rewards.jsx";
import Schedule from "./Components/Schedule/Schedule.jsx";
import Fit from "./img/fit.png";
import "./App.css";


export default function App() {
  const [today, setToday] = useState({ steps: 4200, calories: 900, heartRate: 80 });
  const [goals, setGoals] = useState({ steps: 10000, calories: 2000, heartRate: 60 });

  const handleUpdate = ({ todayEntry, goals: nextGoals }) => {
    if (todayEntry) setToday(todayEntry);
    if (nextGoals) setGoals(nextGoals);
  };

  return (
    <>
      {/* App header */}
      <header className="app-header">
        <img src={Fit} alt="Fitness icon" className="app-header-icon" />
        <h1>Fit Journey</h1>
      </header>
    {/* Main Content */}
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
        <Rewards todayEntry={today} goals={goals} />
        {/* <Schedule /> and <Rewards /> will go here later */}
      </div>
    </div>
    </>
  );
}