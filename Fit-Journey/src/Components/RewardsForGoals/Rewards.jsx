// src/Components/RewardsForGoals/Rewards.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./Rewards.css";
import Trophy from "../../img/trophy.png";
/**
 * Rewards panel
 * - Awards trophies ONLY for Steps and Calories (no heart-rate goal)
 * - Stores trophies in localStorage and filters out any legacy heart-rate entries
 * - Stacked, labeled list with a count badge
 *
 * Props:
 *  - todayEntry: { steps, calories }
 *  - goals:      { steps, calories }
 */
export default function Rewards({ todayEntry = {}, goals = {} }) {
  const STORAGE_KEY = "fitjourney.rewards.v1";
  const GOAL_KEYS = ["steps", "calories"]; // <- heartRate removed

  const LABELS = {
    steps: "Steps goal",
    calories: "Calories goal",
  };

  const todayKey = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const [rewards, setRewards] = useState([]);

  // load (and sanitize legacy heart-rate trophies)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const cleaned = Array.isArray(saved)
        ? saved.filter((r) => r && GOAL_KEYS.includes(r.key)) // drop heartRate entries
        : [];
      setRewards(cleaned);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    } catch {
      setRewards([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveRewards = (next) => {
    setRewards(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  // determine which goals are met (steps & calories only)
  const metFlags = {
    steps:
      Number(todayEntry?.steps ?? 0) >=
      Number(goals?.steps ?? Number.POSITIVE_INFINITY),
    calories:
      Number(todayEntry?.calories ?? 0) >=
      Number(goals?.calories ?? Number.POSITIVE_INFINITY),
  };

  // award new trophies once per day per goal
  useEffect(() => {
    let next = rewards.slice();
    GOAL_KEYS.forEach((key) => {
      if (!metFlags[key]) return;
      const alreadyToday = next.some((r) => r.key === key && r.date === todayKey);
      if (!alreadyToday) {
        next.unshift({
          id: `${todayKey}:${key}`,
          key,
          label: `${LABELS[key]} — ${todayKey}`,
          date: todayKey,
        });
      }
    });
    if (next.length !== rewards.length) saveRewards(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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