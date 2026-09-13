import React, { useState } from "react";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6", "#ec4899"];

function normalize(data) {
  return (data || []).map((d, i) => ({
    label: String(d.label ?? d.name ?? d.month ?? d.day ?? d.category ?? d.title ?? `Item ${i + 1}`),
    value: Number(d.value ?? d.amount ?? d.sales ?? d.revenue ?? d.count ?? d.total ?? 0),
  }));
}

function DonutChart({ data }) {
  const [hovered, setHovered] = useState(null);

  const items = normalize(data);
  const total = items.reduce((s, d) => s + d.value, 0);

  if (!items.length || total === 0) {
    return <p style={{ color: "#94a3b8", textAlign: "center", padding: 40 }}>No data available</p>;
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const activeItem = items.find((d) => d.label === hovered);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
      {/* Donut */}
      <div style={{ position: "relative", width: 180, flexShrink: 0 }}>
        <svg viewBox="0 0 160 160" width="180" style={{ display: "block" }}>
          {items.map((d, i) => {
            const dash = (d.value / total) * circumference;
            const el = (
              <circle
                key={d.label + i}
                cx="80" cy="80" r={radius} fill="none"
                stroke={COLORS[i % COLORS.length]}
                strokeWidth={hovered === d.label ? 32 : 24}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 80 80)"
                style={{
                  cursor: "pointer",
                  opacity: hovered && hovered !== d.label ? 0.3 : 1,
                  transition: "opacity 0.2s ease, stroke-width 0.2s ease",
                }}
                onMouseEnter={() => setHovered(d.label)}
                onMouseLeave={() => setHovered(null)}
              />
            );
            offset += dash;
            return el;
          })}
        </svg>

        {/* Center text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {activeItem ? (
            <>
              <strong style={{ fontSize: 15 }}>{activeItem.label}</strong>
              <span style={{ fontSize: 13, color: "#64748b" }}>
                {Math.round((activeItem.value / total) * 100)}%
              </span>
            </>
          ) : (
            <>
              <strong style={{ fontSize: 24 }}>{total.toLocaleString()}</strong>
              <span style={{ fontSize: 11, color: "#64748b" }}>Total</span>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((d, i) => (
          <div
            key={d.label + i}
            onMouseEnter={() => setHovered(d.label)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
              cursor: "pointer",
              fontWeight: hovered === d.label ? 700 : 400,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: COLORS[i % COLORS.length],
                flexShrink: 0,
              }}
            />
            <span>
              {d.label} <strong>({d.value.toLocaleString()})</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;