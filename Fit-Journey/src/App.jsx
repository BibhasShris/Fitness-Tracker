import React, { useState } from "react";
import DailyGoals from "./Components/DailyGoals/DailGoals";
import './App.css'


function App() {
  const [today, setToday] = useState({ steps: 0, calories: 0, heartRate: 80 });

  const handleUpdate = (updated) => {
    setToday(updated);
    console.log("Updated goals:", updated);
  };

  return (
    <div>
      <DailyGoals todayEntry={today} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
