import React, { useEffect, useRef, useState } from "react";
import "./Heartrate.css";

/*
Heart Rate Tracker sources/inspiration
  - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
  - https://hackernoon.com/canvas-and-react-a-simple-guide-to-data-charts
  - https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 */

export default function Heartrate() {
  const [points, setPoints] = useState([
    // initial sample data
    { t: "07:30", bpm: 72 },
    { t: "08:30", bpm: 95 },
    { t: "09:00", bpm: 88 },
  ]);
  const [time, setTime] = useState("");
  const [bpm, setBpm] = useState("");
  const canvasRef = useRef(null);

  // add data point
  const handleAdd = () => {
    if (!time || !bpm) return;
    const newPoint = { t: time, bpm: parseInt(bpm) };
    setPoints((prev) => [...prev, newPoint].sort((a, b) => a.t.localeCompare(b.t)));
    setTime("");
    setBpm("");
  };

  // clear all data points
  const handleClear = () => setPoints([]);

  // daw chart when points change
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
  
    // size the canvas for HiDPI -----
    const cssHeight = 260;
    const cssWidth  = cvs.clientWidth || 600;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
  
    // set the backing store size (sharp text/lines)
    cvs.width  = Math.round(cssWidth  * dpr);
    cvs.height = Math.round(cssHeight * dpr);
  
    // set the CSS size (what the page sees)
    cvs.style.width  = cssWidth  + "px";
    cvs.style.height = cssHeight + "px";
  
    // scale drawing operations to match DPR
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);
  
    if (!points.length) return;
  
    // helpers
    const toMinutes = (hhmm) => {
      const [hh, mm] = (hhmm || "00:00").split(":").map(Number);
      return (Number.isFinite(hh) ? hh : 0) * 60 + (Number.isFinite(mm) ? mm : 0);
    };
    const fmtTime = (m) =>
      `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  
    const xs = points.map((p) => toMinutes(p.t));
    const ys = points.map((p) => p.bpm);
    let minX = Math.min(...xs), maxX = Math.max(...xs);
    let minY = Math.min(...ys), maxY = Math.max(...ys);
  
    const padY = Math.max(3, Math.round((maxY - minY) * 0.05));
    minY = Math.floor((minY - padY) / 5) * 5;
    maxY = Math.ceil((maxY + padY) / 5) * 5;
  
    const pad = { left: 64, right: 22, top: 18, bottom: 40 };
    const W = cssWidth, H = cssHeight;
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;
  
    const xScale = (x) => pad.left + ((x - minX) * plotW) / (maxX - minX || 1);
    const yScale = (y) => pad.top + plotH - ((y - minY) * plotH) / (maxY - minY || 1);
  
    // theme
    const gridColor  = "#2a2740";
    const axisColor  = "#3b355a";
    const labelColor = "#c5b6ff";
    const lineColor  = "#6ea8ff";
    const pointColor = "#8bb7ff";
  
    // axes
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + plotH);
    ctx.lineTo(pad.left + plotW, pad.top + plotH);
    ctx.stroke();
  
    // grid
    ctx.strokeStyle = gridColor;
    for (let i = 1; i <= 5; i++) {
      const y = pad.top + (plotH * i) / 5;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + plotW, y);
      ctx.stroke();
    }
  
    // labels (sharp with DPR scaling)
    ctx.fillStyle = labelColor;
    ctx.font = "12px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText(`${minY} bpm`, 8, yScale(minY));
    ctx.fillText(`${maxY} bpm`, 8, yScale(maxY));
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    ctx.fillText(fmtTime(minX), pad.left, H - 10);
    ctx.fillText(fmtTime(maxX), pad.left + plotW, H - 10);
  
    // line
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    points
      .slice()
      .sort((a, b) => toMinutes(a.t) - toMinutes(b.t))
      .forEach((p, i) => {
        const x = xScale(toMinutes(p.t));
        const y = yScale(p.bpm);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
    ctx.stroke();
  
    // points
    ctx.fillStyle = pointColor;
    points.forEach((p) => {
      const x = xScale(toMinutes(p.t));
      const y = yScale(p.bpm);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [points]);  

  return (
    <section className="hr-card">
      <div className="hr-header">
        <img src="/img/bpm.png" alt="Heart Icon" className="hr-title-icon" />
        <h2>Heart Rate</h2>
      </div>

      <div className="hr-content">
        {/* Input form */}
        <div className="hr-form">
          <label>
            Time
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <label>
            BPM
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
              placeholder="e.g. 95"
            />
          </label>
          <button onClick={handleAdd}>Add</button>
          <button className="muted" onClick={handleClear}>Clear</button>
        </div>

        {/* Chart */}
        <div className="hr-canvas-wrap">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </section>
  );
}