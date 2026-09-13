import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { getInitials } from "../utils/helpers";

function Header({ onMenuClick }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name || "Admin"}!</p>
        </div>
      </div>

      <div className="header-right">
        <button
          className="icon-button"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <button className="icon-button">
          🔔
          <span className="notification-dot" />
        </button>

        <div className="profile">
          <div className="avatar">
            {getInitials(user?.name || "Admin User")}
          </div>

          <div className="profile-info">
            <strong>{user?.name || "Admin User"}</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;