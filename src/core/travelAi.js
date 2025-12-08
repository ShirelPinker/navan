import { ContextMemory } from './contextMemory.js';
import * as llmService from '../services/llmService.js';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt.js';


export class TravelAi {
  constructor() {
    this.memory = new ContextMemory(SYSTEM_PROMPT);
  }


  async chat(userInput) {
    this.memory.addUserMessage(userInput);
    const availableTools = [] // add here the tools desc and name etc. i assume we would import them from a different file.
    const response = await llmService.sendMessage(this.memory.getMessages());

    this.memory.addAssistantMessage(response);

    return response;
  }

  reset() {
    this.memory.clear();
  }

  getConversationLength() {
    return this.memory.getMessageCount();
  }
}

