import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";

import {
  stats,
  revenueData,
  salesData,
  categoryData,
  orders
} from "../data/mockData";

import { formatCurrency } from "../utils/helpers";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {
    document.title = "Dashboard | AdminPanel";
  }, []);

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
          <section className="stats-grid">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                {...stat}
              />
            ))}
          </section>

          <section className="charts-grid">
            <div className="card chart-card large">
              <div className="card-header">
                <div>
                  <h3>Revenue Overview</h3>
                  <p>Monthly revenue performance</p>
                </div>

                <select>
                  <option>Last 9 months</option>
                  <option>Last 6 months</option>
                  <option>Last 12 months</option>
                </select>
              </div>

              <LineChart data={revenueData} />
            </div>

            <div className="card chart-card">
              <div className="card-header">
                <div>
                  <h3>Sales</h3>
                  <p>This week's sales</p>
                </div>
              </div>

              <BarChart data={salesData} />
            </div>

            <div className="card chart-card">
              <div className="card-header">
                <div>
                  <h3>Categories</h3>
                  <p>Sales by category</p>
                </div>
              </div>

              <DonutChart data={categoryData} />
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <div>
                <h3>Recent Orders</h3>
                <p>Latest customer orders</p>
              </div>

              <a href="/orders" className="view-link">
                View all →
              </a>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.id}</strong>
                      </td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>
                        {formatCurrency(order.amount)}
                      </td>
                      <td>
                        <span
                          className={`status status-${order.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;