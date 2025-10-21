// src/Components/Rewards/RewardsSection.jsx
import React from "react";
import { badges } from "./badgeData";
import "./RewardsSection.css";

export default function RewardsSection() {
  return (
    <div className="rewards-card">
      <h2 className="rewards-title"> Rewards & Badges</h2>

      <div className="badge-list">
        {badges.map((badge, index) => (
          <div
            key={badge.id}
            className={`badge-box ${index === 0 ? "unlocked" : "locked"}`}
          >
            <img
              src={badge.icon}
              alt={badge.name}
              className={`badge-img ${index === 0 ? "unlocked" : "locked"}`}
            />
            <p className="badge-name">{badge.name}</p>
            <p className="badge-desc">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
