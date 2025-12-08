import { ContextMemory } from './contextMemory.js';
import { sendMessage } from '../integrations/llmService.js';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt.js';

/**
 * Main Travel Agent orchestrator
 */
export class TravelAgent {
  constructor() {
    this.memory = new ContextMemory(SYSTEM_PROMPT);
  }

  /**
   * Process user input and get agent response
   * @param {string} userInput - User's message
   * @returns {Promise<string>} - Agent's response
   */
  async chat(userInput) {
    // Add user message to memory
    this.memory.addUserMessage(userInput);

    // Get response from LLM
    const response = await sendMessage(this.memory.getMessages());

    // Add assistant response to memory
    this.memory.addAssistantMessage(response);

    return response;
  }

  /**
   * Reset the conversation
   */
  reset() {
    this.memory.clear();
  }

  /**
   * Get conversation history length
   * @returns {number}
   */
  getConversationLength() {
    return this.memory.getMessageCount();
  }
}

