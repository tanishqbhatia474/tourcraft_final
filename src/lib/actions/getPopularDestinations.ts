'use server'
import { getJson } from "serpapi";
import { TravelDestination } from "../types/popularDestinations";

export const getPopularDestinations = async (location: string): Promise<TravelDestination[]> => {
  try {
    const response = await getJson({
      engine: "google",
      api_key: process.env.SERP_API_KEY, // Get your API_KEY from https://serpapi.com/manage-api-key
      q: `tourist spots in ${location}`,
    });
    console.log(response);
    if (typeof response !== 'object' || response === null) {
      throw new Error("Invalid response format: Not a JSON object");
    }

    // console.log(response['top_sights']);

    if (!response['top_sights'] || !response['top_sights']['sights']) {
      throw new Error("Invalid response structure: Missing 'top_sights' or 'sights' property");
    }

    return response['top_sights']['sights'] as TravelDestination[];
  } catch (error) {
    console.error('Error fetching popular destinations:', (error as Error).message);
    throw new Error('Failed to fetch popular destinations. Please try again later.');
  }
};