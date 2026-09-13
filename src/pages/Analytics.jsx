import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";

import {
  revenueData,
  salesData,
  categoryData
} from "../data/mockData";

function Analytics() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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
              <h2>Analytics</h2>
              <p>
                Detailed insights into your business
              </p>
            </div>

            <select>
              <option>Last 9 months</option>
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          </div>

          <div className="analytics-grid">
            <div className="card chart-card">
              <div className="card-header">
                <div>
                  <h3>Revenue</h3>
                  <p>Revenue trend</p>
                </div>
              </div>

              <LineChart data={revenueData} />
            </div>

            <div className="card chart-card">
              <div className="card-header">
                <div>
                  <h3>Sales</h3>
                  <p>Weekly sales</p>
                </div>
              </div>

              <BarChart data={salesData} />
            </div>

            <div className="card chart-card">
              <div className="card-header">
                <div>
                  <h3>Product Categories</h3>
                  <p>Category distribution</p>
                </div>
              </div>

              <DonutChart data={categoryData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;