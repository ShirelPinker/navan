import { ContextMemory } from './contextMemory.js';
import * as llmService from '../services/llmService.js';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt.js';
import { weatherTool } from './tools/weatherTool.js';
import { flightsTool } from './tools/flightsTool.js';
import { getWeather } from '../services/weatherService.js';
import { getFlights } from '../services/flightsService.js';
const tools = [weatherTool, flightsTool];

const functionMap = {
  getWeather,
  getFlights
};

export class TravelAi {
  constructor() {
    const today = new Date().toISOString().split('T')[0];
    const systemPromptWithDate = `${SYSTEM_PROMPT}\n\nCURRENT DATE: ${today}`;
    this.memory = new ContextMemory(systemPromptWithDate);
  }

  async chat(userInput) {
    this.memory.addUserMessage(userInput);

    while (true) {
      const response = await llmService.sendMessage(this.memory.getMessages(), tools);

      if (response.tool_calls && response.tool_calls.length > 0) {
        this.memory.addMessage(response);

        for (const toolCall of response.tool_calls) {
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

      this.memory.addAssistantMessage(response.content);
      return response.content;
    }
  }

  reset() {
    this.memory.clear();
  }

  getConversationLength() {
    return this.memory.getMessageCount();
  }
}
