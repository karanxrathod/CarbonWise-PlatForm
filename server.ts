import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON payloads
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not configured or uses placeholder. Dynamic AI Coach calls will use fallback guidance.");
}

// REST Backend API for dynamic playbooks
app.post("/api/coach-deepdive", async (req, res) => {
  try {
    const { actionId, actionTitle, userFootprint } = req.body;

    if (!actionTitle || !userFootprint) {
      return res.status(400).json({ error: "Missing required fields: actionTitle or userFootprint" });
    }

    if (!ai) {
      // Elegant, comprehensive backup response to avoid crashes if keys aren't configured yet
      return res.json({
        plan: `### 💡 Smart Playbook: ${actionTitle}\n\n*Note: To receive a dynamically tailored, AI-personalized report from your Smart Climate Coach, please configure a real **GEMINI_API_KEY** in the Secrets panel inside the AI Studio dashboard. Showing high-fidelity static recommendation plan based on your action selection:*\n\n#### 📈 Impact Analysis\n- **Target Category**: ${actionId.startsWith('t') ? 'Transport' : actionId.startsWith('h') ? 'Home' : actionId.startsWith('d') ? 'Diet' : 'Consumption & Shopping'}\n- **Difficulty**: Estimating impact based on average habits.\n- **Carbon Reduction**: Committing to this action systematically shifts your trajectory toward the Paris Climate Accord targets.\n\n#### 🗓️ Recommended Implementation Steps\n1. **Week 1: Baseline Audit**\n   Monitor how often you currently interact with this activity. Set a minor, friction-free goal.\n2. **Week 2: Trial Runs**\n   Try the change once or twice under optimal conditions (e.g., commute on a pleasant weather day, cook a main plant-based recipe over the weekend).\n3. **Week 3: Habits Integration**\n   Incorporate mechanical helpers like calendar blockings, recurring energy settings, or shopping notifications to lock this routine down.\n4. **Week 4: Continuous Tracking**\n   Add your streak counts directly into the **Tracker Tab** on CarbonWise to watch your global sustainability score step up!\n\n#### 🛠️ Feasibility Tips\n- **Anchor Habit**: Tie this new action to something you already do every single day (like making morning coffee or reviewing your calendar).\n- **Identify Allies**: Change is easier with community. Invite a fellow student, co-worker, or family member to partner on this mission!`
      });
    }

    const prompt = `You are the Expert Smart Climate Coach for CarbonWise, a leading carbon footprint awareness platform.
The user is looking for a deeply personalized, data-backed implementation playbook and transition plan for the following specific mission target:
"Action: ${actionTitle}" (ID: ${actionId})

Here is the user's current carbon footprint and activity profile:
- Weekly car travel distance: ${userFootprint.transport?.carKmPerWeek ?? 100} km
- Short-haul flights per year: ${userFootprint.transport?.shortFlightsPerYear ?? 1}
- Long-haul flights per year: ${userFootprint.transport?.longFlightsPerYear ?? 0}
- Public transit usage rate: ${userFootprint.transport?.publicTransitUse ?? 'Rarely'}
- Monthly home electricity usage: ${userFootprint.home?.electricityKwhPerMonth ?? 250} kWh
- Monthly household gas usage: ${userFootprint.home?.gasUsage ?? 50} units
- Home renewable integration: ${userFootprint.home?.renewablePercent ?? 0}%
- Diet style: ${userFootprint.diet ?? 'moderate'}
- Monthly online shipping orders: ${userFootprint.shopping?.onlineOrdersPerMonth ?? 4}
- Monthly new clothing items: ${userFootprint.shopping?.newClothesPerMonth ?? 2}
- Annual new electronic purchases: ${userFootprint.shopping?.electronicsPerYear ?? 1}

Based on this specific profile, generate a highly custom, actionable, and encouraging step-by-step master plan. 
Structure your response clearly with these specific markdown headers:

### 📈 Personalized Carbon Math
Provide a custom estimation of how much carbon they will personally save annually if they execute this transition, referencing elements of their current consumption profile (e.g., "Since you drive ${userFootprint.transport?.carKmPerWeek ?? 100} km a week..."). Talk about concrete figures and equivalents (e.g. tree months of absorption).

### 🗓️ Four-Week Micro-Step Playbook
Break down the implementation into a 4-week progression to maximize behavioral success and prevent burnout:
- **Week 1: Frictionless Start**: A completely basic task to establish awareness.
- **Week 2: Initial Action**: Engaging with the core habit once or twice.
- **Week 3: Habit Automation & Mechanics**: Creating structural supports (such as reminders or calendar events) to solidify the routine.
- **Week 4: Scale and Share**: Full adoption, tracking streaks in CarbonWise, and inviting others.

### 🛡️ Hurdle Workarounds
List 2 specific friction points (psychological or structural) they will likely encounter with this action, and provide high-quality life-hacks/workarounds to overcome them.

### 🔗 Recommended Grounding Search Terms
Provide a descriptive bulleted list of 2 specific search queries or open-source calculators they should search online (e.g., "Google Maps route transit layer to optimize time", "Local energy cooperative audits for renewable providers") to implement this. Do NOT output raw external URLs that might be broken; instead, output specific, highly actionable searched tool names.

Keep your tone professional, motivational, scientifically objective, and deeply encouraging.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const markdownText = response.text || "No plan could be generated at this moment. Please try again!";
    res.json({ plan: markdownText });

  } catch (error: any) {
    console.error("Gemini coach endpoint error:", error);
    res.status(500).json({ error: "Failed to generate dynamic AI plan. " + error.message });
  }
});

// Setup Vite Dev server or Production static serving
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CarbonWise Server running on http://localhost:${PORT}`);
  });
}

setupViteOrStatic().catch((err) => {
  console.error("Failed to start server:", err);
});
