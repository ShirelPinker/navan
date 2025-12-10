# ✈️ Travel Trip Planner Agent

An AI-powered conversational assistant that helps users plan trips by combining LLM intelligence with real-time flight and weather data.

## Setup

```bash
npm install
```

Create a `.env` file:
```
OPENAI_API_KEY=your_key
AMADEUS_API_KEY=your_key
AMADEUS_API_SECRET=your_secret
```

Run the CLI:
```bash
npm start
```

---

## Assignment Requirements

### 1. Conversation-Oriented Design

**Three Task Types:**
- **Flight Lookup** – Search real-time flights between airports
- **Weather Lookup** – Get current weather or forecasts for any city
- **Itinerary Creation** – Generate travel plans combining both data sources with LLM knowledge

**Context & Continuity:**  
The `ContextMemory` class maintains full conversation history, allowing the assistant to reference previous messages, reuse tool results, and handle follow-up questions naturally.

---

### 2. Advanced Prompt Engineering

**Chain-of-Thought Reasoning:**  
The system prompt includes a hidden 7-step reasoning framework (THINK section) that guides the LLM.

**Control Strategies:**
- Explicit data source rules: "Always call getFlights for flight data, always call getWeather for weather data"
- Response style constraints: short answers (3-4 sentences), single recommendations, max one clarifying question
- Strict separation between API data (real-time) and LLM knowledge (general advice)

---

### 3. External Data Integration

**Two APIs:**

| API | Purpose | Data Returned |
|-----|---------|---------------|
| **Amadeus** | Flight search | Airlines, prices, times, durations |
| **Open-Meteo** | Weather | Temperature, conditions, forecasts |

**Decision Logic:**  
The system prompt explicitly instructs the LLM when to use each source:
- APIs → Any time-sensitive data (flights, weather)
- LLM → Itineraries, recommendations, cultural info, logistics

Tool definitions with strict schemas ensure the LLM calls APIs correctly.

---

### 4. Hallucination Detection & Management

**Prevention:**
- System prompt rules: "Never invent specific statistics, times, prices, or conditions"
- Mandatory tool usage for real-time data
- "If a tool returns nothing, say: I couldn't find that information"

**Detection & Recovery:**
- Pre-response verification step in the reasoning chain
- Self-correction instruction: "If a mistake is made, briefly correct it"
- Max iteration limit (5) prevents infinite tool-calling loops

---

### 5. Technical Implementation

- **Language:** JavaScript (Node.js)
- **LLM:** I chose to use OpenAI GPT-4.1 since it supports tool use and excels at following complex instructions
- **Interface:** CLI with conversation reset and exit commands


---


## Example Conversation

```
🌴 Traveler: I want to go to Paris next week

🗺️  Agent: Paris in December is magical! What city will you be departing from?

🌴 Traveler: Tel Aviv, leaving Monday

➡️ Model called tool: getFlights { depIata: 'TLV', arrIata: 'CDG', date: '2024-12-16' }
➡️ Model called tool: getWeather { city: 'Paris', date: '2024-12-16' }

🗺️  Agent: Found a flight on Air France departing 08:45, arriving 13:20 (5h 35m) for $342. 
Paris will be 8°C with light rain – pack layers and an umbrella!

🌴 Traveler: Can you suggest what to do there?

🗺️  Agent: Day 1: Settle in, evening walk along the Seine. Day 2: Louvre + Tuileries Garden...
```
