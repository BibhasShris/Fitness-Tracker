import React, { useMemo, useState } from "react";
import "./DailyGoals.css";
import Steps from "../../img/steps.png";
import Cal from "../../img/cal.png";
import Goal from "../../img/goal.png";

export default function DailyGoals({
  todayEntry = { steps: 0, calories: 0 },
  goals = { steps: 10000, calories: 2000 },
  onUpdate = () => {},
}) {
  // keep inputs as STRINGS so we can strip leading zeros while typing
  const [vals, setVals] = useState({
    steps: String(todayEntry.steps ?? 0),
    calories: String(todayEntry.calories ?? 0),
  });
  const [goalVals, setGoalVals] = useState({
    steps: String(goals.steps ?? 10000),
    calories: String(goals.calories ?? 2000),
  });
  const [saved, setSaved] = useState(false);

  const fields = useMemo(
    () => [
      { key: "steps", label: "Steps", unit: "", icon: Steps },
      { key: "calories", label: "Calories", unit: "kcal", icon: Cal },
    ],
    []
  );

  const cleanNumStr = (s) => {
    const only = String(s ?? "").replace(/[^\d]/g, "");
    // remove leading zeros but keep single "0"
    return only.replace(/^0+(?=\d)/, "");
  };

  const toNum = (s, fallback = 0) => {
    const n = Number(cleanNumStr(s));
    return Number.isFinite(n) ? n : fallback;
  };

  const percent = (k) => {
    const cur = toNum(vals[k], 0);
    const goal = toNum(goalVals[k], 0);
    if (!goal) return 0;
    return Math.min(100, Math.round((cur / goal) * 100));
  };

  const handleSave = () => {
    const nextToday = {
      steps: toNum(vals.steps, 0),
      calories: toNum(vals.calories, 0),
    };
    const nextGoals = {
      steps: toNum(goalVals.steps, 10000),
      calories: toNum(goalVals.calories, 2000),
    };
    onUpdate({ todayEntry: nextToday, goals: nextGoals });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <section className="daily-goals">
      {/* Tttle aligned with Heart Rate - added fit icon */}
      <div className="dg-header">
        <img src={Goal} alt="Goals Icon" className="dg-title-icon" />
        <h2 className="dg-title">Daily Goals</h2>
      </div>

      <div className="dg-grid">
        {fields.map(({ key, label, unit, icon }) => {
          const p = percent(key);
          return (
            <div className="dg-card" key={key}>
              <div className="dg-top">
                <img src={icon} alt="" className="dg-icon" />
                <div className="dg-text">
                  <span className="dg-name">{label}</span>
                  <span className="dg-sub">
                    {toNum(vals[key])}{unit && ` ${unit}`} / {toNum(goalVals[key])}{unit && ` ${unit}`}
                  </span>
                </div>
              </div>

              <div className="dg-inputs">
                <input
                  type="text" inputMode="numeric" pattern="\d*"
                  value={vals[key]}
                  onChange={(e) =>
                    setVals((prev) => ({ ...prev, [key]: cleanNumStr(e.target.value) }))
                  }
                  placeholder="Today"
                />
                <input
                  type="text" inputMode="numeric" pattern="\d*"
                  value={goalVals[key]}
                  onChange={(e) =>
                    setGoalVals((prev) => ({ ...prev, [key]: cleanNumStr(e.target.value) }))
                  }
                  placeholder="Goal"
                />
              </div>

              <div className="dg-progress">
                <div className="dg-bar" style={{ width: `${p}%` }} />
              </div>
              <div className="dg-percent">{p}%</div>
            </div>
          );
        })}
      </div>

      <button className="dg-save" onClick={handleSave}>Save</button>
      {saved && <div className="dg-toast">✅ Saved!</div>}
    </section>
  );
}