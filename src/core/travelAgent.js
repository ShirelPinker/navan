import { ContextMemory } from './contextMemory.js';
import { sendMessage } from '../services/llmService.js';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt.js';


export class TravelAgent {
  constructor() {
    this.memory = new ContextMemory(SYSTEM_PROMPT);
  }


  async chat(userInput) {
    this.memory.addUserMessage(userInput);

    const response = await sendMessage(this.memory.getMessages());

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

