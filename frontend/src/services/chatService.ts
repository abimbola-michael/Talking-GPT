import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
axios.defaults.baseURL = BASE_URL;

export async function createChat(
  categoryId: string,
  prompt: string,
  apiResponse: string,
  status: string
) {
  try {
    const response = await axios.post(`categories/${categoryId}/chats`, {
      prompt,
      response: apiResponse,
      status,
    });
    console.log("response", response);
  } catch (err) {}
}
export async function getChat(chatId: string) {
  try {
    const response = await axios.get(`chats/${chatId}`);
    console.log("response", response);
  } catch (err) {}
}
export async function updateChat(chatId: string) {
  try {
    await axios.put(`chat/${chatId}`);
  } catch (err) {}
}
export async function deleteChat(chatId: string) {
  try {
    await axios.delete(`chat/${chatId}`);
  } catch (err) {}
}
