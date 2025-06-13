"use server";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "@/db/connect";
import TravelFormSchema from "../types/formSchema";
import { Eateries, Faqs, Itinerary, ActivityType, TimeOfDay } from "../types/itinerary";
import ItineraryModel from "@/db/models/itineraries";
import { getPopularDestinations } from "./getPopularDestinations";

// ---------- Utility ----------

function getNumberOfDays(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / oneDay);
}

function parseJson<T>(text: string): T {
  try {
    const regex = /{[\s\S]*}/; // Matches the first full JSON block
    const match = text.match(regex);
    if (!match) throw new Error("No valid JSON object found in the response.");
    return JSON.parse(match[0]) as T;
  } catch (e) {
    console.error("❌ Error parsing Groq response:", text);
    throw new Error("Failed to parse itinerary JSON from Groq response.");
  }
}

// ---------- Prompt ----------

function buildItineraryPrompt(input: TravelFormSchema, days: number) {
  return `
Create a ${days}-day itinerary for a trip to ${input.destination}.
Dates: ${input.travelDates.startDate.toISOString().slice(0, 10)} to ${input.travelDates.endDate.toISOString().slice(0, 10)}
People: ${input.numberOfPeople}, Budget/person: ₹${input.budget}
Type: ${input.travelType}
Interests: ${input.keyInterests.join(", ")}
Companions: ${input.travelCompanions}

Return JSON:
{
  "days": [
    { "day": "Day 1", "morning": "...", "afternoon": "...", "evening": "...", "budget": "...", "notes": "..." }
  ]
}
`.trim();
}

// ---------- Raw Groq Response Type ----------

type RawGroqItinerary = {
  days: {
    day: string;
    morning: string;
    afternoon: string;
    evening: string;
    budget?: string;
    notes?: string;
  }[];
};

// ---------- Ask Groq ----------

async function askGroq(prompt: string): Promise<string> {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: "You are a helpful travel planner." },
        { role: "user", content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}

// ---------- Main Function ----------

export const generateFullTravelPlan = async (input: TravelFormSchema) => {
  try {
    await dbConnect();
    const days = getNumberOfDays(
      input.travelDates.startDate,
      input.travelDates.endDate
    );

    const prompt = buildItineraryPrompt(input, days);
    console.log("🟡 Prompt sent to Groq:\n", prompt);

    const itineraryRes = await askGroq(prompt);
    console.log("🟢 Raw response from Groq:\n", itineraryRes);

    const rawItinerary = parseJson<RawGroqItinerary>(itineraryRes);

    const transformedItinerary: Itinerary["days"] = rawItinerary.days.map(
      (day, idx) => ({
        day_number: idx + 1,
        activities: [
          {
            title: "Morning Activity",
            description: day.morning,
            type: ActivityType.Sightseeing,
            time: TimeOfDay.Morning,
            location: input.destination,
            cost: 0,
          },
          {
            title: "Afternoon Activity",
            description: day.afternoon,
            type: ActivityType.Relaxation,
            time: TimeOfDay.Afternoon,
            location: input.destination,
            cost: 0,
          },
          {
            title: "Evening Activity",
            description: day.evening,
            type: ActivityType.Dining,
            time: TimeOfDay.Evening,
            location: input.destination,
            cost: 0,
          },
        ],
      })
    );

    const eateries: Eateries = [];
    const faqs: Faqs = [];
    const popularDestinations: string[] = [];

    const uuid = uuidv4();

    const travelPlan = {
      uuid,
      destination: input.destination,
      travelDates: input.travelDates,
      budget: input.budget,
      travelType: input.travelType,
      keyInterests: input.keyInterests,
      numberOfPeople: input.numberOfPeople,
      travelCompanions: input.travelCompanions,
      itinerary: transformedItinerary,
      eateries,
      faqs,
      popularDestinations,
    };

    console.log("📦 Final travelPlan to save:\n", JSON.stringify(travelPlan, null, 2));

    await ItineraryModel.create(travelPlan);
    console.log("✅ Travel plan saved:", uuid);
    return uuid;
  } catch (error) {
    console.error("❌ Error generating travel plan with Groq:", error);
    throw new Error("Failed to generate Groq-based travel plan");
  }
};
