import React, { useState } from "react";

function normalize(data) {
  return (data || []).map((d, i) => ({
    label: String(d.label ?? d.name ?? d.month ?? d.day ?? d.category ?? d.title ?? `Item ${i + 1}`),
    value: Number(d.value ?? d.amount ?? d.sales ?? d.revenue ?? d.count ?? d.total ?? 0),
  }));
}

function LineChart({ data, color = "#4f46e5", prefix = "" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const items = normalize(data);

  if (!items.length) return null;

  const w = 600, h = 240, pad = 35;
  const max = Math.max(...items.map((d) => d.value), 1);
  const step = items.length > 1 ? (w - pad * 2) / (items.length - 1) : 0;

  const points = items.map((d, i) => ({
    ...d,
    x: pad + i * step,
    y: h - pad - (d.value / max) * (h - pad * 2),
  }));

  const path = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = items.length > 1 ? `${pad},${h - pad} ${path} ${w - pad},${h - pad}` : "";
  const active = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {/* grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={pad} x2={w - pad}
            y1={h - pad - t * (h - pad * 2)}
            y2={h - pad - t * (h - pad * 2)}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
        ))}

        {area && <polygon points={area} fill={`${color}22`} />}
        {items.length > 1 && (
          <polyline
            points={path}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        )}

        {points.map((p, i) => (
          <g key={p.label + i}>
            <circle cx={p.x} cy={p.y} r={hoveredIndex === i ? 7 : 4} fill={color} />
            {/* invisible bigger circle = easy hover target */}
            <circle
              cx={p.x} cy={p.y} r={20}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            <text x={p.x} y={h - 10} textAnchor="middle" fontSize="11" fill="#94a3b8">
              {p.label}
            </text>
          </g>
        ))}
      </svg>

      {active && (
        <div
          style={{
            position: "absolute",
            left: `${(active.x / w) * 100}%`,
            top: `${(active.y / h) * 100}%`,
            transform: "translate(-50%, -140%)",
            background: "#1e293b",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 12,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          <strong>{active.label}</strong> — {prefix}{active.value.toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default LineChart;