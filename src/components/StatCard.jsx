function StatCard({
  title,
  value,
  change,
  icon,
  positive
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div>
          <p className="stat-title">{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="stat-icon">
          {icon}
        </div>
      </div>

      <div
        className={`stat-change ${
          positive ? "positive" : "negative"
        }`}
      >
        {positive ? "↗" : "↘"} {change}
        <span> vs last month</span>
      </div>
    </div>
  );
}

export default StatCard;