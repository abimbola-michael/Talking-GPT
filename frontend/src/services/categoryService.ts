import axios from "axios";
import Category from "../models/category";

const BASE_URL = "http://localhost:5000/api/v1/";
axios.defaults.baseURL = BASE_URL;

export async function createCategory(name: string) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.post(`categories`, {
      name,
    });
    const category = response.data.category;
    console.log("category", category);
    return new Category(
      category.id,
      category.name,
      category.createdAt,
      category.chats
    );
  } catch (err) {}
}
export async function getCategory(categoryId: string) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get(`categories/${categoryId}`);
    const category = response.data.category;
    console.log("category", category);
    return new Category(
      category.id,
      category.name,
      category.createdAt,
      category.chats
    );
  } catch (err) {}
}
export async function updateCategory(categoryId: string) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    await axios.put(`categories/${categoryId}`);
  } catch (err) {}
}
export async function deleteCategory(categoryId: string) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    await axios.delete(`categories/${categoryId}`);
  } catch (err) {}
}
