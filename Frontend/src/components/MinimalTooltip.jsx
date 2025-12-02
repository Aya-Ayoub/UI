import React from "react";

export default function MinimalTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="text-white-500 font-bold text-sm">
        {payload[0].value}%
      </div>
    );
  }
  return null;
}
