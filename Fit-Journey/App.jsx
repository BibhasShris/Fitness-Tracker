import React, { useState } from "react";
import DailyGoals from "./Components/DailyGoals/DailyGoals";
import Heartrate from "./Components/Heartrate/Heartrate";
import Rewards from "./Components/Rewards/Rewards";
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
      {/* Daily Goals (top) */}
      <div className="daily-goals">
        <DailyGoals todayEntry={today} goals={goals} onUpdate={handleUpdate} />
      </div>

      {/* Heart Rate (underneath) */}
      <Heartrate />

      {/* Trophy when any goal is met (bottom-right) */}
      <Rewards todayEntry={today} goals={goals} />
    </>
  );
}