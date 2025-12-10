import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({quiet: true});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const LLM_MODEL = 'gpt-4.1';

export async function sendMessage(messages, tools) {
    const completion = await openai.chat.completions.create({
        model: LLM_MODEL,
        messages,
        tools,
        tool_choice: "auto"
    });
    return completion.choices[0].message;
}
