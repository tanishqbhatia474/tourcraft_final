export interface TravelDestination {
    title: string;
    rating?: number;
    reviews?: number;
    description?: string;
    price?: string; // Displayed hotel price as a string (including currency symbol)
    extracted_price?: number; // Numerical hotel price for calculations
    thumbnail?: string; // URL to the thumbnail image
  }