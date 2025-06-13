import mongoose, { Schema, Document, model } from 'mongoose';
import { Itinerary, Eateries, Faqs } from '../../lib/types/itinerary'; // Adjust the import path accordingly
import { ActivityType, TimeOfDay } from '@/lib/types/itinerary';
import TravelFormSchema from '@/lib/types/formSchema';
import { TravelDestination } from '@/lib/types/popularDestinations';

// Interface that extends Mongoose's Document with the existing types
export interface ItineraryDocument extends Document, TravelFormSchema {
  uuid: string;
  itinerary: Itinerary['days'];
  eateries: Eateries;
  faqs: Faqs;
  popularDestinations: TravelDestination[];
}

// Define the Mongoose Schema using the existing TypeScript types
const ItinerarySchema = new Schema<ItineraryDocument>({
  uuid: { type: String, required: true, unique: true }, // Add the UUID field

    destination: { type: String, required: true },

  travelDates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  budget: { type: Number, required: true }, // in INR
  travelType: { type: String, enum: ['Adventure', 'Relaxation', 'Cultural', 'Family', 'Romantic'], required: true },
  keyInterests: { type: [String], enum: ['Nature', 'Historical Sites', 'Food & Drink', 'Shopping', 'Nightlife','Adventure Sports'], required: true },
  numberOfPeople: { type: Number, required: true },
  travelCompanions: { type: String, enum: ['Solo', 'Couple', 'Family', 'Friends'], required: true },

  itinerary: [{
    day_number: { type: Number, required: true, default: 0 },
    activities: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      type: { type: String, required: true },
      time: { type: String, required: true },
      location: { type: String, required: true },
      cost: { type: Number, required: true }, // Rating out of 5
    }]
  }],

  eateries: [{
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true }, // Rating out of 5
  }],

  faqs: [{
    ques: { type: String, required: true },
    ans: { type: String, required: true },
  }],

  popularDestinations: [{
    title: { type: String, required: true },
    rating: { type: Number }, // Not required
    reviews: { type: Number }, // Not required
    description: { type: String }, // Not required
    price: { type: String }, // Not required
    extracted_price: { type: Number }, // Not required
    thumbnail: { type: String }, // Not required
  }]
});

// Create the Mongoose model
const ItineraryModel = mongoose.models.Itinerary || model<ItineraryDocument>('Itinerary', ItinerarySchema);

export default ItineraryModel;
