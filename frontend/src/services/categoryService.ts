import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
axios.defaults.baseURL = BASE_URL;

export async function createCategory(name: string) {
  try {
    const response = await axios.post(`categories`, {
      name,
    });
    console.log("response", response);
  } catch (err) {}
}
export async function getCategory(categoryId: string) {
  try {
    const response = await axios.get(`categories/${categoryId}`);
    console.log("response", response);
  } catch (err) {}
}
export async function updateCategory(categoryId: string) {
  try {
    await axios.put(`categories/${categoryId}`);
  } catch (err) {}
}
export async function deleteCategory(categoryId: string) {
  try {
    await axios.delete(`categories/${categoryId}`);
  } catch (err) {}
}
