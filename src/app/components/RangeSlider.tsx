"use client";
import { useState } from "react";

export default function RangeSlider() {
  const [val, setVal] = useState(50);
  return (
    <div className="range-slider-wrap">
      <label className="range-label" htmlFor="volume-slider">
        Data Volume: <strong>{val} GB</strong>
        <span className="range-discount">
          {val >= 200 ? " (20% discount)" : val >= 100 ? " (10% discount)" : ""}
        </span>
      </label>
      <div className="range-input-wrap">
        <input
          id="volume-slider"
          type="range"
          className="range-slider"
          min="10"
          max="500"
          step="10"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          aria-label="Data volume in GB"
        />
        <div className="range-track-fill" style={{ width: `${(val / 500) * 100}%` }} />
      </div>
      <div className="range-labels">
        <span>10 GB</span>
        <span>500 GB</span>
      </div>
    </div>
  );
}
