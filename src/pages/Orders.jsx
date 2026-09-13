import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { orders } from "../data/mockData";
import { formatCurrency } from "../utils/helpers";

function Orders() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [statusFilter, setStatusFilter] =
    useState("All");

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter(
          (order) =>
            order.status === statusFilter
        );

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
              <h2>Orders</h2>
              <p>Track and manage customer orders</p>
            </div>
          </div>

          <div className="card">
            <div className="toolbar">
              <input
                className="search-input"
                placeholder="Search orders..."
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option>All</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orders;