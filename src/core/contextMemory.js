/**
 * Manages conversation memory and context
 */
export class ContextMemory {
  constructor(systemPrompt) {
    this.messages = [];
    
    if (systemPrompt) {
      this.messages.push({ role: 'system', content: systemPrompt });
    }
  }

  /**
   * Add a user message to memory
   * @param {string} content - User's message
   */
  addUserMessage(content) {
    this.messages.push({ role: 'user', content });
  }

  /**
   * Add an assistant message to memory
   * @param {string} content - Assistant's response
   */
  addAssistantMessage(content) {
    this.messages.push({ role: 'assistant', content });
  }

  /**
   * Get all messages in conversation
   * @returns {Array} - All messages
   */
  getMessages() {
    return this.messages;
  }

  /**
   * Clear conversation history (keeps system prompt)
   */
  clear() {
    const systemMessage = this.messages.find(m => m.role === 'system');
    this.messages = systemMessage ? [systemMessage] : [];
  }

  /**
   * Get the number of messages (excluding system prompt)
   * @returns {number}
   */
  getMessageCount() {
    return this.messages.filter(m => m.role !== 'system').length;
  }
}

