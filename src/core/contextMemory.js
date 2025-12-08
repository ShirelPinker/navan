export class ContextMemory {
  constructor(systemPrompt) {
    this.messages = [];
    
    if (systemPrompt) {
      this.messages.push({ role: 'system', content: systemPrompt });
    }
  }


  addUserMessage(content) {
    this.messages.push({ role: 'user', content });
  }


  addAssistantMessage(content) {
    this.messages.push({ role: 'assistant', content });
  }


  getMessages() {
    return this.messages;
  }


  clear() {
    const systemMessage = this.messages.find(m => m.role === 'system');
    this.messages = systemMessage ? [systemMessage] : [];
  }

  getMessageCount() {
    return this.messages.filter(m => m.role !== 'system').length;
  }
}

