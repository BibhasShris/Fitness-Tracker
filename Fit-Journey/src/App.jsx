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
    <div className="tracker-layout">
    <Profile />
    <DailyGoals todayEntry={today} onUpdate={handleUpdate} />
    </div>
  );
}