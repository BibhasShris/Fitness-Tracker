import React, { useState } from "react";
import Profile from "./Components/Profile.jsx";
import DailyGoals from "./Components/DailyGoals/DailyGoals.jsx";
import "./App.css";

export default function App() {
  const [today, setToday] = useState({ steps: 0, calories: 0, heartRate: 80 });

  const handleUpdate = (updated) => {
    setToday(updated);
    console.log("Updated goals:", updated);
  };
  return (
    <>
    <div className="tracker-layout">
      {/* Left Column */}
      <div className="left-column">
        <DailyGoals todayEntry={today} onUpdate={handleUpdate} />
        {/* <Sleep /> will go here later */}
      </div>

      {/* Right Column */}
      <div className="right-column">
        <Profile />
        {/* <Schedule /> and <Rewards /> will go here later */}
      </div>
      <Profile />
    </div>
    <div className="daily-goals">
      <DailyGoals todayEntry={today} onUpdate={handleUpdate} />
    </div>
  </>
  );
}
