# Travel Trip Planner Agent

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
- **LLM:** I chose to use OpenAI GPT-4.1 since it supports tool use, excels at following complex instructions and has relatively low cost.
- **Interface:** CLI with conversation reset and exit commands


---


## Example Conversation

```
🌴 Traveler: Hey, help me plan a trip with my partner for next weekend!

✈️  Planning...

🗺️  Agent: That sounds fun! Where do you want to go? 

🌴 Traveler: I had some christmas/winter vacation in mind..

✈️  Planning...

🗺️  Agent: Great choice! Which city or country would you love to visit for that cozy winter vibe? 

🌴 Traveler: What can you suggest?

✈️  Planning...

🗺️  Agent: Head to Prague for a magical Christmas market experience, charming old town, and romantic winter atmosphere. Would you like to go there? 

🌴 Traveler: What nice foods does Prague has to offer?

✈️  Planning...

🗺️  Agent: Prague is famous for hearty dishes like roast pork with dumplings, trdelník (sweet pastry), mulled wine, and rich goulash. Would you like travel tips or an itinerary for Prague next weekend? 

🌴 Traveler: Are there any available flights for Prague? are they expensive?

✈️  Planning...

🗺️  Agent: What city will you be flying from? 

🌴 Traveler: Tel-Aviv

✈️  Planning...

➡️ Model called tool: getFlights { depIata: 'TLV', arrIata: 'PRG', date: '2025-12-13' } 

🗺️  Agent: There are direct flights from Tel-Aviv to Prague next Saturday, with prices starting at $146.38 per person for a 4-hour trip. Want an itinerary for your romantic Prague weekend? 

🌴 Traveler: Will the weather be convinient for sightseeing?

✈️  Planning...

➡️ Model called tool: getWeather { city: 'Prague', date: '2025-12-13' } 

🗺️  Agent: Prague will be chilly on December 13, with temperatures around 4–6°C and cloudy skies—nice for sightseeing and enjoying the festive atmosphere. Want some ideas for your weekend itinerary? 

🌴 Traveler: Yes give me some ideas why not

✈️  Planning...

🗺️  Agent: Here’s a cozy Prague weekend plan:
- Stroll the iconic Charles Bridge and Old Town Square.
- Sip mulled wine at the Christmas markets.
- Tour Prague Castle and its magical courtyards.
- Warm up with Czech cuisine at a local pub.
- Enjoy a romantic evening walk around the illuminated city. 

Want more details on any of these? 

🌴 Traveler: No, that's sounds amazing. Give me a summary for my vacation!

✈️  Planning...

🗺️  Agent: Here’s your Prague winter getaway:
- Fly from Tel-Aviv to Prague next Saturday.
- Enjoy festive Christmas markets, iconic sights like Charles Bridge, and Prague Castle.
- Taste local winter treats and cozy Czech meals.
- Expect chilly, romantic weather—perfect for exploring and festive strolling! 

🌴 Traveler: bye

👋 Safe travels! Goodbye!
```

---

## Agent Demo

![Agent Example 1](assets/agent_1.png)

![Agent Example 2](assets/agent_2.png)

![Agent Example 3](assets/agent_3.png)
