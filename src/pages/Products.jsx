import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Modal from "../components/Modal";

import { products } from "../data/mockData";
import { formatCurrency } from "../utils/helpers";
import { useToast } from "../context/ToastContext";

function Products() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [modalOpen, setModalOpen] =
    useState(false);

  const { showToast } = useToast();

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
              <h2>Products</h2>
              <p>Manage your product inventory</p>
            </div>

            <button
              className="primary-button"
              onClick={() => setModalOpen(true)}
            >
              + Add Product
            </button>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  📦
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <strong>
                      {formatCurrency(product.price)}
                    </strong>

                    <span
                      className={`status ${
                        product.stock === 0
                          ? "status-cancelled"
                          : product.stock < 15
                          ? "status-pending"
                          : "status-completed"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <p>
                    {product.stock} units available
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Product"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModalOpen(false);
            showToast("Product added successfully!");
          }}
        >
          <label>Product Name</label>
          <input
            placeholder="Product name"
            required
          />

          <label>Category</label>
          <input
            placeholder="Category"
            required
          />

          <label>Price</label>
          <input
            type="number"
            placeholder="0.00"
            required
          />

          <label>Stock</label>
          <input
            type="number"
            placeholder="0"
            required
          />

          <button
            className="primary-button full-width"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Products;