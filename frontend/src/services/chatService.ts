import axios from "axios";
import Chat from "../models/chat";

//const BASE_URL = "http://localhost:5000/api/v1/";
const BASE_URL = "https://talking-gpt-1.onrender.com/api/v1/";

axios.defaults.baseURL = BASE_URL;

export async function createChat(
  categoryId: string,
  prompt: string,
  aiResponse: string,
  status: string
) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.post(`categories/${categoryId}/chats`, {
      prompt,
      response: aiResponse,
      status,
    });
    const chat = response.data.chat;
    console.log("chat", chat);
    return new Chat(
      chat.id,
      chat.prompt,
      chat.response,
      chat.createdAt,
      chat.status
    );
  } catch (err) {}
}
export async function getChat(chatId: string) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get(`chats/${chatId}`);
    const chat = response.data.chat;
    console.log("chat", chat);
    return new Chat(
      chat.id,
      chat.prompt,
      chat.response,
      chat.createdAt,
      chat.status
    );
  } catch (err) {}
}
export async function updateChat(chatId: string) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    await axios.put(`chat/${chatId}`);
  } catch (err) {}
}
export async function deleteChat(chatId: string) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    await axios.delete(`chat/${chatId}`);
  } catch (err) {}
}
