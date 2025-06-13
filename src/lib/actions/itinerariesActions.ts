"use server";
import ItineraryModel from "@/db/models/itineraries";
import dbConnect from "@/db/connect";

export const get_itinerary = async (id: string) => {
  await dbConnect();
  try {
    const itinerary = await ItineraryModel.findOne({ uuid: id });

    if (!itinerary) {
      return { error: "Itinerary not found" };
    }

    // Manually convert the Mongoose document to a plain object
    const plainItinerary = itinerary.toObject();
    //console log this 
    console.log("Fetched Itinerary:", plainItinerary);
    // Ensure all nested objects are also plain objects
    return JSON.parse(JSON.stringify(plainItinerary));
  } catch (error) {
    console.error("Error fetching itinerary", error);
    return { error: "Error fetching itinerary" };
  }
};
