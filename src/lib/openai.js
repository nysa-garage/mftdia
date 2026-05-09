import OpenAI from 'openai';

const OPENAI_API_KEY = "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";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY.trim(),
  dangerouslyAllowBrowser: true
});

export const generateTasks = async (onboardingData) => {
  const { to, visa } = onboardingData;

  // Simulate network delay so the loader still shows nicely for the demo
  await new Promise(resolve => setTimeout(resolve, 2000));

  const mockTasks = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    if (day === 1) return { day, tasks: ["Arrive and secure transport to temporary housing", "Purchase a prepaid SIM card (e.g., T-Mobile or Mint Mobile)"] };
    if (day === 2) return { day, tasks: ["Open a US bank account using your passport", "Download local transit apps (e.g., Citymapper)"] };
    if (day === 3) return { day, tasks: ["Locate the nearest Social Security Administration office", "Gather documents (I-94, Passport, Visa) for SSN application"] };
    if (day === 4) return { day, tasks: ["Submit application for Social Security Number in person", "Explore your immediate neighborhood for essential stores"] };
    if (day === 5) return { day, tasks: ["Start searching for long-term apartment rentals on StreetEasy/Zillow", "Understand the local broker fee and deposit structures"] };
    if (day === 6) return { day, tasks: ["Tour 2-3 potential apartments in different neighborhoods", "Look into guarantor services if you lack US credit"] };
    if (day === 7) return { day, tasks: ["Submit a rental application for your preferred apartment", "Rest and recover from moving stress"] };
    if (day === 8) return { day, tasks: ["Sign lease and pay deposit/first month's rent", "Set up utilities (electricity, internet) for the new apartment"] };
    if (day === 9) return { day, tasks: ["Move into your new apartment", "Purchase essential furniture and housewares"] };
    if (day === 10) return { day, tasks: ["Register your new address with USCIS (Form AR-11)", "Update your address with your bank"] };
    if (day === 14) return { day, tasks: ["Receive SSN card in the mail", "Apply for a secured credit card to start building US credit history"] };
    if (day === 20) return { day, tasks: ["Research healthcare marketplace or employer insurance plans", "Select a primary care physician in your network"] };
    if (day === 30) return { day, tasks: ["Evaluate your first month budget and expenses", "Celebrate your successful first 30 days in the US!"] };

    // Default filler for the rest
    return { day, tasks: [`Continue settling into ${to || 'your new city'}`, `Review ${visa || 'your'} visa compliance requirements`, "Explore local community events or meetups"] };
  });

  return mockTasks;
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
