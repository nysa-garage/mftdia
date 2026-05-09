import OpenAI from 'openai';

const OPENAI_API_KEY = "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";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY.trim(),
  dangerouslyAllowBrowser: true 
});

export const generateTasks = async (onboardingData) => {
  const { from, to, visa, stage } = onboardingData;

  const prompt = `You are an expert immigration consultant. 
  Someone is moving from ${from} to ${to} on a ${visa} visa.
  They are currently in the stage: ${stage}.
  
  Generate a COMPLETE 30-day roadmap.
  If they are in "Preparing to move", focus on pre-migration tasks (Day 1-20) and arrival (Day 21-30).
  If they are "Just arrived", focus on immediate settling.
  
  CRITICAL: You MUST generate exactly 30 objects in the array, one for each day from Day 1 to Day 30.
  Do NOT truncate. Do NOT stop after Day 1.
  
  Format the response as a JSON object:
  { 
    "days": [
      { "day": 1, "tasks": ["Specific Task 1", "Specific Task 2"] },
      ...
      { "day": 30, "tasks": ["Specific Task X"] }
    ] 
  }
  
  Ensure tasks are specific to ${to} and ${visa} visa. Mention local neighborhoods (e.g., Astoria, Flushing, Midtown), specific banks, and local transport.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 4000
    });

    const content = JSON.parse(response.choices[0].message.content);
    
    let daysArray = [];

    // 1. If it's already an array, use it
    if (Array.isArray(content)) {
      daysArray = content;
    } 
    // 2. If it's an object with a 'days' or 'timeline' key that is an array
    else if (content.days && Array.isArray(content.days)) {
      daysArray = content.days;
    } 
    else if (content.timeline && Array.isArray(content.timeline)) {
      daysArray = content.timeline;
    }
    // 3. If it's a single day object (has 'day' and 'tasks' keys)
    else if (content.day && content.tasks) {
      daysArray = [content];
    }
    // 4. Fallback: find any array in the object
    else {
      const firstArrayKey = Object.keys(content).find(key => Array.isArray(content[key]));
      if (firstArrayKey) {
        // If the array items are strings, wrap them in a day object
        if (typeof content[firstArrayKey][0] === 'string') {
          daysArray = [{ day: 1, tasks: content[firstArrayKey] }];
        } else {
          daysArray = content[firstArrayKey];
        }
      }
    }

    return daysArray;
  } catch (error) {
    console.error("Error generating tasks:", error);
    return [];
  }
};

export const getChatCompletion = async (messages, onboardingData) => {
  const { to, visa } = onboardingData;

  const systemPrompt = `You are an immigration guide for someone moving to ${to} on a ${visa} visa. 
  You have access to community knowledge shared by people who have already immigrated. 
  Always answer with specific, actionable advice. Prioritize practical tips. 
  Be warm but direct. Never be vague.`;

  try {
    return await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      stream: true,
    });
  } catch (error) {
    console.error("Error in chat completion:", error);
    throw error;
  }
};

export default openai;
