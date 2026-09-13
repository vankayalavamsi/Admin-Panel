import React, { useState } from "react";

/* Auto-detects key names in your data */
function normalize(data) {
  return (data || []).map((d, i) => ({
    label: String(d.label ?? d.name ?? d.month ?? d.day ?? d.category ?? d.title ?? `Item ${i + 1}`),
    value: Number(d.value ?? d.amount ?? d.sales ?? d.revenue ?? d.count ?? d.total ?? 0),
  }));
}

function BarChart({ data, color = "#4f46e5", prefix = "" }) {
  const [hovered, setHovered] = useState(null);
  const items = normalize(data);
  const max = Math.max(...items.map((d) => d.value), 1);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 230, padding: "0 5px" }}>
      {items.map((item) => (
        <div
          key={item.label}
          onMouseEnter={() => setHovered(item.label)}
          onMouseLeave={() => setHovered(null)}
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 42,
              height: `${(item.value / max) * 80}%`,
              minHeight: item.value > 0 ? 4 : 0,
            }}
          >
            {hovered === item.label && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#1e293b",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  zIndex: 10,
                }}
              >
                {prefix}{item.value.toLocaleString()}
              </div>
            )}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: color,
                borderRadius: "6px 6px 0 0",
                opacity: hovered && hovered !== item.label ? 0.3 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
          </div>
          <span
            style={{
              marginTop: 8,
              fontSize: 12,
              whiteSpace: "nowrap",
              color: hovered === item.label ? "#1e293b" : "#64748b",
              fontWeight: hovered === item.label ? 700 : 400,
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;