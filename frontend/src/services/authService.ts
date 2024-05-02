import axios from "axios";

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
    //const response = await axios.get("status");
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
  const response = await axios.post("login", {
    email,
    password,
  });
  console.log("response", response);
  // localStorage.setItem("token", response.token);

  // return token;
}
