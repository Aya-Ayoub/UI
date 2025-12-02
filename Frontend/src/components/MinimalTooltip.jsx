import React from "react";

export default function MinimalTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <p className="text-white text-sm font-semibold drop-shadow-lg">
        {payload[0].value}%
      </p>
    );
  }
  return null;
}
