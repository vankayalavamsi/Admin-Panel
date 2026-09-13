import {
  users,
  products,
  orders,
  stats
} from "../data/mockData";

const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardStats() {
  await delay();
  return stats;
}

export async function getUsers() {
  await delay();
  return users;
}

export async function getProducts() {
  await delay();
  return products;
}

export async function getOrders() {
  await delay();
  return orders;
}