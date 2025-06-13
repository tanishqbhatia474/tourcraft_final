export enum TimeOfDay {
    EarlyMorning = 'Early Morning', // 5 AM - 8 AM
    Morning = 'Morning',             // 8 AM - 12 PM
    Afternoon = 'Afternoon',         // 12 PM - 3 PM
    LateAfternoon = 'Late Afternoon',// 3 PM - 6 PM
    Evening = 'Evening',             // 6 PM - 9 PM
    Night = 'Night',                 // 9 PM - 12 AM
    LateNight = 'Late Night',        // 12 AM - 5 AM
  }
  export enum ActivityType {
    Sightseeing = 'Sightseeing',        // Visiting landmarks, tourist attractions, etc.
    Adventure = 'Adventure',            // Outdoor activities like hiking, zip-lining, etc.
    Cultural = 'Cultural',              // Visiting museums, galleries, historical sites, etc.
    Relaxation = 'Relaxation',          // Spa visits, beach time, leisure walks, etc.
    Dining = 'Dining',                  // Restaurants, cafes, street food, etc.
    Shopping = 'Shopping',              // Visiting markets, malls, souvenir shops, etc.
    Entertainment = 'Entertainment',    // Shows, concerts, nightlife, etc.
    Nature = 'Nature',                  // Parks, gardens, natural reserves, etc.
    Educational = 'Educational',        // Workshops, classes, lectures, etc.
    Sport = 'Sport',                    // Participating in or watching sports events
    Wellness = 'Wellness',              // Yoga, meditation, fitness activities, etc.
  }
export type Itinerary = {
  days: {
    day_number: number;
    activities: {
      title: string;
      description: string;
      type: ActivityType;
      time: TimeOfDay;
      location: string;
      cost: number; //out of 5
    }[];
  }[];
};

export type Eateries = {
  title: string;
  location: string;
  description: string;
  cost: number; //out of 5
}[];

export type Faqs = {
    ques : string;
    ans : string;
}[];
