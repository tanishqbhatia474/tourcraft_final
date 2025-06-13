  export type TravelType = 'Adventure' | 'Relaxation' | 'Cultural' | 'Family' | 'Romantic' | 'Business';
  
  export type Interest = 'Nature' | 'Historical Sites' | 'Food & Drink' | 'Shopping' | 'Nightlife' | 'Adventure Sports';
  
  export type TravelCompanion = 'Solo' | 'Couple' | 'Family' | 'Friends';
  
  interface TravelFormSchema {
    destination: string;
    travelDates: {
      startDate: Date;
      endDate: Date;
    };
    budget: number; // in INR // mcq -> 
    travelType: TravelType;
    keyInterests: Interest[];
    numberOfPeople : number;
    travelCompanions: TravelCompanion;
  }
  
  export default TravelFormSchema;
  