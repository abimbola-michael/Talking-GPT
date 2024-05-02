import ChatOutput from "../models/chat_output";
import CategoryGroup from "../models/category_group";
import { symbolMap } from "./symbols";
import Category from "../models/category";

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
    const newCategory = new Category(
      category.id,
      category.name,
      category.time,
      category.chats
    );

    if (catIndex === -1) {
      categoriesGroups.push(new CategoryGroup(catTitle, [newCategory]));
    } else {
      categoriesGroups[catIndex].categories.push(newCategory);
    }
  }
  return categoriesGroups;
}

export function getChatCategories(chats) {
  chats.sort((a, b) => b.createdAt - a.createdAt);
  const categories = [];

  for (let i = 0; i < chats.length; i++) {
    const chat = chats[i];
    const catTitle = getRelativeDate(chat.createdAt);
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

export function getPrompt(chats) {
  //const extraMessage = "ai:";
  const maxTokens = 4096;
  let strings = [];
  let tokenCount = 0;

  for (let i = chats.length - 1; i >= 0; i--) {
    const chat = chats[i];
    const prompt = chat.prompt;
    const response = chat.response;

    const newPrompt = `${prompt}\n`;
    const newResponse = `${response}\n`;

    let tokens = trimmed(newPrompt.split(" "));
    if (tokenCount + tokens.length > maxTokens) {
      const remaining = tokenCount + tokens.length - maxTokens;
      const newPrompt = newPrompt.slice(0, remaining).join(" ");
      strings.push(newPrompt);
      break;
    }
    tokenCount += tokens.length;
    strings.push(newPrompt);

    tokens = trimmed(newResponse.split(" "));
    if (tokenCount + tokens.length > maxTokens) {
      const remaining = tokenCount + tokens.length - maxTokens;
      const newResponse = newPrompt.slice(0, remaining).join(" ");
      strings.push(newResponse);
      break;
    }
    tokenCount += tokens.length;
    strings.push(newResponse);
  }

  // strings = strings.reverse();
  const prompt = strings.join("");
  return prompt;
}

// Function to trim array of strings
function trimmed(tokens) {
  return tokens.map((token) => token.trim()).filter(Boolean);
}
function isSymbol(character) {
  const asciiValue = character.charCodeAt(0);
  // Check if the ASCII value falls within the range of ASCII values reserved for symbols
  return (
    (asciiValue >= 32 && asciiValue <= 47) ||
    (asciiValue >= 58 && asciiValue <= 64) ||
    (asciiValue >= 91 && asciiValue <= 96) ||
    (asciiValue >= 123 && asciiValue <= 126)
  );
}
function isConvertibleToNumber(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}

export function getReadableMessages(message, prevMessages = []) {
  let messages = prevMessages;
  const words = message.split(" ");
  let wordMessage =
    prevMessages && prevMessages.length > 0
      ? prevMessages[prevMessages.length - 1]
      : "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let backTickCount = 0;
    let isCode = false;
    for (let j = 0; j < word.length; j++) {
      const char = word[j];
      if (isSymbol(char)) {
        if (char === "`") {
          if (isCode) {
            backTickCount--;
          } else {
            backTickCount++;
          }
          if (isCode && backTickCount === 0) {
            isCode = false;
            wordMessage += "Ending a Code block ";
          } else if (!isCode && backTickCount === 3) {
            isCode = true;
            wordMessage += "Beginning a Code block ";
          }
          continue;
        }
        let symbolName = symbolMap[char] || "";
        if (symbolName === "Hyphen") {
          const nextChar =
            j + 1 < word.length && word[j + 1] !== " "
              ? word[j + 1]
              : j + 2 < word.length && word[j + 2] !== " "
              ? word[j + 2]
              : "";
          if (nextChar.length > 0 && isConvertibleToNumber(nextChar)) {
            symbolName = "Minus";
          }
        } else if (
          symbolName === "Dot" &&
          (j == word.length - 1 ||
            (j + 1 < word.length && isSymbol(word[j + 1])))
        ) {
          symbolName = "Full Stop";
        }
        //wordMessage = wordMessage.trim() + ` ${symbolName} `;
        if (
          char === "'" &&
          j - 1 >= 0 &&
          word[j - 1] !== " " &&
          j + 1 <= word.length - 1 &&
          word[j + 1] !== " "
        ) {
          wordMessage += char;
          continue;
        }
        if (wordMessage.trim().length > 0) {
          messages.push(wordMessage.trim());
        }
        if (symbolName.length > 0) {
          messages.push(symbolName);
        }
        wordMessage = "";
      } else {
        wordMessage += char;
      }
    }
    wordMessage += " ";

    // readableMessage += wordMessage.trim() + " ";
  }
  messages.push(wordMessage.trim());

  // if (wordMessage.trim().length > 0) {
  // }
  // return readableMessage.trim();
  return messages;
}
