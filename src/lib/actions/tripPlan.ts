"use server";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "@/db/connect";
import TravelFormSchema from "../types/formSchema";
import {
  Eateries,
  Faqs,
  Itinerary,
  ActivityType,
  TimeOfDay,
} from "../types/itinerary";
import { TravelDestination as PopularDestination } from "../types/popularDestinations";

import ItineraryModel from "@/db/models/itineraries";

// ---------- Utility ----------

function getNumberOfDays(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((endDate.getTime() - startDate.getTime()) / oneDay);
}

function parseJson<T>(text: string): T {
  try {
    const regex = /{[\s\S]*}|[\[\{][\s\S]*[\]\}]/;
    const match = text.match(regex);
    if (!match) throw new Error("No valid JSON object found in the response.");
    return JSON.parse(match[0]) as T;
  } catch (e) {
    console.error("❌ Error parsing Groq response:", text);
    throw new Error("Failed to parse JSON from Groq response.");
  }
}

function estimateRatingFromPrice(price: string): number {
  const cleaned = price.replace(/[^\d₹]/g, "").replace("₹", "");
  const amount = parseInt(cleaned) || 300;

  if (amount < 200) return 1;
  if (amount < 400) return 2;
  if (amount < 600) return 3;
  if (amount < 1000) return 4;
  return 5;
}

function extractPriceNumber(price?: string): number | undefined {
  if (!price) return undefined;
  const number = parseInt(price.replace(/[^\d]/g, ""));
  return isNaN(number) ? undefined : number;
}

// ---------- Prompt Builders ----------

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

function buildEateriesPrompt(destination: string, budget: number, days: number) {
  return `
Suggest 5 popular local eateries in ${destination} for a ${days}-day trip.
Each eatery should include:
- Name
- Type (Veg/Non-Veg/Both)
- Cuisine
- Price Level (₹)
- Description

Return JSON:
[
  {
    "name": "...",
    "type": "...",
    "cuisine": "...",
    "price": "...",
    "description": "..."
  }
]
`.trim();
}

function buildFaqPrompt(destination: string): string {
  return `
List 5 frequently asked questions and their answers for a tourist visiting ${destination}. 
Make sure questions are helpful for someone planning a trip and using a travel assistant like TourCraft.

Return JSON:
[
  {
    "ques": "Question here?",
    "ans": "Answer here."
  }
]
`.trim();
}

function buildPopularDestinationsPrompt(destination: string): string {
  return `
List the top 5 tourist attractions in ${destination}. Each should include:
- Name
- Short Description
- Approximate Entry Price in INR (if any)
- Average Google rating out of 5
- Number of reviews
- Thumbnail image URL from google(if known)

Return JSON:
[
  {
    "title": "...",
    "description": "...",
    "price": "₹200",
    "rating": 4.5,
    "reviews": 1234,
    "thumbnail": "https://example.com/image.jpg"
  }
]
`.trim();
}

// ---------- Response Types ----------

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

type RawEateries = {
  name: string;
  type: string;
  cuisine: string;
  price: string;
  description: string;
}[];

type RawFaqs = {
  ques: string;
  ans: string;
}[];

type RawPopularDestination = {
  title: string;
  description?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  thumbnail?: string;
}[];

// ---------- Groq Call ----------

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

// ---------- Get Eateries ----------

async function getEateriesFromGroq(destination: string, budget: number, days: number): Promise<Eateries> {
  const prompt = buildEateriesPrompt(destination, budget, days);
  console.log("🍽️ Prompt sent for eateries:\n", prompt);

  const response = await askGroq(prompt);
  console.log("🍴 Raw eateries response from Groq:\n", response);

  const raw: RawEateries = parseJson<RawEateries>(response);

  return raw.map(eatery => ({
    title: eatery.name,
    location: destination,
    description: `${eatery.cuisine} | ${eatery.type} | ₹${eatery.price} - ${eatery.description}`,
    cost: Math.min(Math.max(1, estimateRatingFromPrice(eatery.price)), 5),
  }));
}

// ---------- Get FAQs ----------

async function getFaqsFromGroq(destination: string): Promise<Faqs> {
  const prompt = buildFaqPrompt(destination);
  console.log("❓ Prompt sent for FAQs:\n", prompt);

  const response = await askGroq(prompt);
  console.log("📘 Raw FAQ response from Groq:\n", response);

  const raw: RawFaqs = parseJson<RawFaqs>(response);
  return raw;
}

// ---------- Get Popular Destinations ----------

async function getPopularDestinationsFromGroq(destination: string): Promise<PopularDestination[]> {
  const prompt = buildPopularDestinationsPrompt(destination);
  console.log("📍 Prompt sent for popular destinations:\n", prompt);

  const response = await askGroq(prompt);
  console.log("📌 Raw destinations response from Groq:\n", response);

  const raw: RawPopularDestination = parseJson<RawPopularDestination>(response);

  return raw.map(place => ({
    title: place.title,
    description: place.description,
    price: place.price,
    extracted_price: extractPriceNumber(place.price),
    rating: place.rating,
    reviews: place.reviews,
    thumbnail: place.thumbnail,
  }));
}

// ---------- Main Function ----------

export const generateFullTravelPlan = async (input: TravelFormSchema) => {
  try {
    await dbConnect();

    const days = getNumberOfDays(input.travelDates.startDate, input.travelDates.endDate);

    // Step 1: Itinerary
    const itineraryPrompt = buildItineraryPrompt(input, days);
    console.log("🟡 Prompt sent to Groq for itinerary:\n", itineraryPrompt);

    const itineraryRes = await askGroq(itineraryPrompt);
    console.log("🟢 Raw itinerary response from Groq:\n", itineraryRes);

    const rawItinerary = parseJson<RawGroqItinerary>(itineraryRes);

    const transformedItinerary: Itinerary["days"] = rawItinerary.days.map((day, idx) => ({
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
    }));

    // Step 2: Eateries
    const eateries = await getEateriesFromGroq(input.destination, input.budget, days);

    // Step 3: FAQs
    const faqs = await getFaqsFromGroq(input.destination);

    // Step 4: Popular Destinations
    const popularDestinations = await getPopularDestinationsFromGroq(input.destination);

    // Step 5: Save to DB
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
