import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";

function Settings() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [twoFactor, setTwoFactor] =
    useState(false);

  const saveSettings = (event) => {
    event.preventDefault();
    showToast("Settings saved successfully!");
  };

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="page-content">
          <div className="page-heading">
            <div>
              <h2>Settings</h2>
              <p>Configure your dashboard</p>
            </div>
          </div>

          <div className="settings-grid">
            <form
              className="card settings-card"
              onSubmit={saveSettings}
            >
              <h3>General Settings</h3>

              <label>Company Name</label>
              <input
                defaultValue="My Company"
              />

              <label>Admin Email</label>
              <input
                type="email"
                defaultValue="admin@example.com"
              />

              <label>Language</label>
              <select defaultValue="English">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>

              <button
                className="primary-button"
                type="submit"
              >
                Save Changes
              </button>
            </form>

            <div className="card settings-card">
              <h3>Appearance</h3>

              <label>Theme</label>

              <select
                value={theme}
                onChange={(e) =>
                  setTheme(e.target.value)
                }
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>

              <h3 className="settings-section">
                Notifications
              </h3>

              <div className="setting-row">
                <div>
                  <strong>Email notifications</strong>
                  <p>
                    Receive important updates by email
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) =>
                    setEmailNotifications(
                      e.target.checked
                    )
                  }
                />
              </div>

              <div className="setting-row">
                <div>
                  <strong>Two-factor authentication</strong>
                  <p>
                    Add an extra layer of security
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) =>
                    setTwoFactor(e.target.checked)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;