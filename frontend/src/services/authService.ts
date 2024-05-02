import axios from "axios";
import User from "../models/user.js";
import Category from "../models/category.js";

//const BASE_URL = "http://localhost:5000/api/v1/";
const BASE_URL = "https://talking-gpt-1.onrender.com/api/v1/";
axios.defaults.baseURL = BASE_URL;
//axios.defaults.headers =

export async function createUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string
) {
  try {
    const response = await axios.post("users", {
      email,
      password,
      firstname,
      lastname,
    });
    const user = response.data.user;
    return new User(
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.timeJoined,
      user.categories,
      user.createdAt
    );
  } catch (err) {}
}

export async function getUser() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get("user");
    const user = response.data?.user;

    return new User(
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.timeJoined,
      user.categories.map(
        (cat) => new Category(cat._id, cat.name, cat.createdAt, cat.chats)
      ),
      user.createdAt
    );
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getLoginToken(email: string, password: string) {
  const response = await axios.post("login", {
    email,
    password,
  });
  const token = response.data.token;
  localStorage.setItem("token", token);
  return token;
}
