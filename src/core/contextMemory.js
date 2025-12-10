export class ContextMemory {
  constructor(systemPrompt) {
    this.systemPrompt = systemPrompt
    this.messages = [];
    this.messages.push({ role: 'system', content: this.systemPrompt });
  }

  addUserMessage(content) {
    this.messages.push({ role: 'user', content });
  }

  addAssistantMessage(content) {
    this.messages.push({ role: 'assistant', content });
  }

  addMessage(message) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }

  clear() {
    this.messages = [this.systemPrompt]
  }
}

