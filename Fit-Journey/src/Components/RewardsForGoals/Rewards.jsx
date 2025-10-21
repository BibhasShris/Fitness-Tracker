import React, { useEffect, useMemo, useState } from "react";
import "./Rewards.css";
import Trophy from "../../img/trophy.png";


export default function Rewards({ todayEntry = {}, goals = {} }) {
  const STORAGE_KEY = "fitjourney.rewards.v1";
  const [rewards, setRewards] = useState([]);

  const todayKey = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  // load saved rewards on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setRewards(Array.isArray(saved) ? saved : []);
    } catch {
      setRewards([]);
    }
  }, []);

  // helper to persist
  const saveRewards = (next) => {
    setRewards(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  // check which goals are met
  const metFlags = {
    steps:
      Number(todayEntry?.steps ?? 0) >= Number(goals?.steps ?? Number.MAX_SAFE_INTEGER),
    calories:
      Number(todayEntry?.calories ?? 0) >= Number(goals?.calories ?? Number.MAX_SAFE_INTEGER),
    heartRate:
      Number(todayEntry?.heartRate ?? 0) >= Number(goals?.heartRate ?? Number.MAX_SAFE_INTEGER),
  };

  const LABELS = {
    steps: "Steps goal",
    calories: "Calories goal",
    heartRate: "Heart Rate goal",
  };

  // when props change, award any new trophies - only once per day per goal
  useEffect(() => {
    const next = [...rewards];
    ["steps", "calories", "heartRate"].forEach((key) => {
      if (!metFlags[key]) return;
      // already awarded today
      const already = next.some((r) => r.key === key && r.date === todayKey);
      if (!already) {
        next.unshift({
          id: `${todayKey}:${key}`,
          key,
          label: `${LABELS[key]} — ${todayKey}`,
          date: todayKey,
        });
      }
    });
    if (next.length !== rewards.length) saveRewards(next);
  }, [todayEntry, goals, todayKey]);

  if (!rewards.length) return null;

  return (
    <aside className="rewards-panel" aria-live="polite">
      <div className="rewards-header">
        <img src={Trophy} alt="Trophy" className="rewards-icon" />
        <span className="rewards-title">Rewards</span>
        <span className="rewards-count">{rewards.length}</span>
      </div>

      <ul className="rewards-list">
        {rewards.map((r) => (
          <li key={r.id} className="reward-item">
            <img src={Trophy} alt="Trophy" className="reward-trophy" />
            <span className="reward-label">{r.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}