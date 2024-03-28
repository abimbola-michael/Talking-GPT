import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
axios.defaults.baseURL = BASE_URL;
//axios.defaults.headers =

export async function createUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string
) {
  await fetch("http://localhost:5000/api/v1/users");

  try {
    const response = await axios.post("users", {
      email,
      password,
      firstname,
      lastname,
    });
    console.log("userResponse", response);
    return response;
  } catch (err) {}
}

export async function getUser(user: object) {
  const response = await axios.get("user");
  console.log("userResponse", response);
}

export async function genToken(email: string, password: string) {
  const token = await axios.post("login", {
    email,
    password,
  });
  return token;
}
