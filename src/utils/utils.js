import ChatOutput from "../models/chat_output";

export function getChatOutputs(message) {
  message = message.trim();
  if (message.length === 0) return [];
  const chatOutputs = [];
  let index = 0;
  while (message.contains("```")) {
    const startIndex = message.indexOf("```");
    if (startIndex > 0) {
      chatOutputs.push(
        ChatOutput(index, message.substring(0, startIndex), false)
      );
      index++;
      const endIndex = message.indexOf("```", startIndex + 3);

      if (endIndex > 0) {
        chatOutputs.add(
          ChatOutput(index, message.substring(startIndex + 3, endIndex), true)
        );
        message = message.substring(endIndex + 3);
      } else {
        chatOutputs.add(
          ChatOutput(index, message.substring(startIndex + 3), true)
        );
        message = "";
      }
      index++;
    }
  }
  if (message.trim().isNotEmpty) {
    chatOutputs.add(ChatOutput(index, message, false));
  }
  return chatOutputs;
}
function getCategriesGroups(categories) {
  const categoriesGroups = [];
  return categoriesGroups;
}
