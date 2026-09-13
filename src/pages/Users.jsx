import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

import { users } from "../data/mockData";
import { useToast } from "../context/ToastContext";

function Users() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const { showToast } = useToast();

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
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
              <h2>Users</h2>
              <p>Manage your application users</p>
            </div>

            <button
              className="primary-button"
              onClick={() => setModalOpen(true)}
            >
              + Add User
            </button>
          </div>

          <div className="card">
            <div className="toolbar">
              <input
                className="search-input"
                placeholder="Search users..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select>
                <option>All Roles</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>User</option>
              </select>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <strong>{user.name}</strong>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span
                          className={`status ${
                            user.status === "Active"
                              ? "status-completed"
                              : "status-cancelled"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="table-action"
                          onClick={() =>
                            showToast(
                              `Editing ${user.name}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={1}
              totalPages={3}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New User"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModalOpen(false);
            showToast("User added successfully!");
          }}
        >
          <label>Name</label>
          <input placeholder="Full name" required />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email address"
            required
          />

          <label>Role</label>
          <select>
            <option>User</option>
            <option>Editor</option>
            <option>Admin</option>
          </select>

          <button
            className="primary-button full-width"
            type="submit"
          >
            Add User
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Users;