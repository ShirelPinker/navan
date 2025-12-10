import {ContextMemory} from './contextMemory.js';
import * as llmService from '../services/llmService.js';
import {SYSTEM_PROMPT} from '../prompts/systemPrompt.js';
import {weatherTool} from './tools/weatherTool.js';
import {flightsTool} from './tools/flightsTool.js';
import {getWeather} from '../services/weatherService.js';
import {getFlights} from '../services/flightsService.js';

const availableTools = [weatherTool, flightsTool];

const toolFunctions = {
    getWeather,
    getFlights
};

export class TravelAi {
    MAX_ITERATIONS = 5;

    constructor() {
        this.memory = new ContextMemory(SYSTEM_PROMPT);
    }

    async chat(userInput) {
        this.memory.addUserMessage(userInput);
        let iterationsCount = 0;

        while (true) {
            iterationsCount++
            const response = await llmService.sendMessage(this.memory.getMessages(), availableTools);

            if (this.shouldCallTool(response)) {
               await this.handleToolCalls(response, iterationsCount);
            } else {
                this.memory.addAssistantMessage(response.content);
                return response.content;
            }
        }
    }

    shouldCallTool(response) {
        return response.tool_calls && response.tool_calls.length > 0;
    }

    async handleToolCalls(response, iterationsCount) {
      this.validateIterationsLimit(iterationsCount);
      this.memory.addMessage(response);

      for (const toolCall of response.tool_calls) {
          await this.executeTool(toolCall);
      }
    }

    validateIterationsLimit(iterationsCount) {
        if (iterationsCount > this.MAX_ITERATIONS) {
            console.error("llm exceeded max iteration");
            throw new Error("Looks like something went wrong.. Please contact our support or try again later");
        }

        if (iterationsCount === this.MAX_ITERATIONS) {
            this.memory.addUserMessage(
                "This is your last chance to use tools. After this, please provide a final answer."
            );
        }
    }

    async executeTool(toolCall) {
        const toolName = toolCall.function.name
        const toolArguments = JSON.parse(toolCall.function.arguments)

        console.log("➡️ Model called tool:", toolName, toolArguments);

        const toolFunction = toolFunctions[toolName];
        const toolResult = await toolFunction(...Object.values(toolArguments));

        this.memory.addMessage({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult)
        });
    }

    reset() {
        this.memory.clear();
    }
}
