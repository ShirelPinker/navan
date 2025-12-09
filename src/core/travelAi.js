import { ContextMemory } from './contextMemory.js';
import * as llmService from '../services/llmService.js';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt.js';
import { weatherTool, getWeather } from './tools/weatherTool.js';
import { hotelTool, searchHotels } from './tools/hotelTool.js';

const tools = [weatherTool, hotelTool];

const functionMap = {
  getWeather,
  searchHotels
};

export class TravelAi {
  constructor() {
    this.memory = new ContextMemory(SYSTEM_PROMPT);
  }

  async chat(userInput) {
    this.memory.addUserMessage(userInput);

    while (true) {
      const msg = await llmService.sendMessage(this.memory.getMessages(), tools);

      if (msg.tool_calls && msg.tool_calls.length > 0) {
        this.memory.addMessage(msg);

        for (const toolCall of msg.tool_calls) {
          const { name, arguments: argsJSON } = toolCall.function;
          const args = JSON.parse(argsJSON);

          console.log("➡️ Model called tool:", name, args);

          const fn = functionMap[name];
          const result = await fn(...Object.values(args));

          this.memory.addMessage({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(result)
          });
        }

        continue;
      }

      this.memory.addAssistantMessage(msg.content);
      return msg.content;
    }
  }

  reset() {
    this.memory.clear();
  }

  getConversationLength() {
    return this.memory.getMessageCount();
  }
}
