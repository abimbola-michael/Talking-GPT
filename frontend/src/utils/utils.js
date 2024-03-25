import ChatOutput from "../models/chat_output";
import CategoryGroup from "../models/category_group";

export const isDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

export function getChatOutputs(message) {
  if (!message) return [];
  message = message.trim();
  if (message.length === 0) return [];
  const chatOutputs = [];
  let index = 0;
  while (message.includes("```")) {
    const startIndex = message.indexOf("```");
    if (startIndex > 0) {
      chatOutputs.push(
        new ChatOutput(index, message.substring(0, startIndex), false)
      );
      index++;
      const endIndex = message.indexOf("```", startIndex + 3);

      if (endIndex > 0) {
        chatOutputs.push(
          new ChatOutput(
            index,
            message.substring(startIndex + 3, endIndex),
            true
          )
        );
        message = message.substring(endIndex + 3);
      } else {
        chatOutputs.push(
          new ChatOutput(index, message.substring(startIndex + 3), true)
        );
        message = "";
      }
      index++;
    }
  }
  if (message?.trim().length > 0) {
    chatOutputs.push(new ChatOutput(index, message, false));
  }
  return chatOutputs;
}

function getRelativeDate(date) {
  const now = new Date();
  const difference = Math.floor((now - date) / (1000 * 3600 * 24)); // Difference in days

  if (difference <= 0) {
    return "Today";
  } else if (difference === 1) {
    return "Yesterday";
  } else if (difference <= 7) {
    return "Previous 7 days";
  } else if (difference <= 30) {
    return "Previous 30 days";
  } else {
    return date.getFullYear().toString();
  }
}
export function getCategoriesGroups(categories) {
  categories.sort((a, b) => b.date - a.date);
  const categoriesGroups = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const catTitle = getRelativeDate(new Date(category.date));
    const catIndex = categoriesGroups.findIndex(
      (cat) => cat.title === catTitle
    );

    if (catIndex === -1) {
      categoriesGroups.push(
        new CategoryGroup(catIndex, [category], category.time)
      );
    } else {
      categoriesGroups[catIndex].categories.push(category);
    }
  }
  return categoriesGroups;
}

export function getChatCategories(chats) {
  chats.sort((a, b) => b.date - a.date);
  const categories = [];

  for (let i = 0; i < chats.length; i++) {
    const chat = chats[i];
    const catTitle = getRelativeDate(new Date(chat.date));
    const catIndex = categories.findIndex((cat) => cat.title === catTitle);

    if (catIndex === -1) {
      categories.push({ title: catTitle, chats: [chat] });
    } else {
      categories[catIndex].chats.push(chat);
    }
  }
  return categories;
}
export function getChatsFromCategory(categories, selectedCategory) {
  const catIndex = categories.findIndex(
    (cat) => cat.title === selectedCategory
  );
  return catIndex === -1 ? [] : categories[catIndex].chats;
}

export function generateRandomString(length = 50) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function formatTime(milliseconds) {
  // Convert milliseconds to seconds
  let totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate hours, minutes, and seconds
  let hours = Math.floor(totalSeconds / 3600) % 12 || 12; // Convert to 12-hour format
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  //let seconds = totalSeconds % 60;

  // Determine AM or PM
  let period = totalSeconds < 43200 ? "AM" : "PM"; // 12 hours * 60 minutes * 60 seconds = 43200 seconds

  // Format the time string
  let timeString = hours.toString() + ":";
  //let timeString = hours.toString().padStart(2, "0") + ":";
  timeString += minutes.toString().padStart(2, "0");
  // timeString += seconds.toString().padStart(2, "0");
  timeString += " " + period;

  return timeString;
}
