This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

1. Technology Stack

● Frontend:
○ Next.js: Full-stack framework used for both server-side rendering and static site generation.
○ Tailwind CSS: Utility-first CSS framework used for designing the UI.
○ Framer Motion: Used for animations and enhancing user interactions with smooth transitions.

● Backend:
○ Axios: HTTP client used for making API requests to external services.
○ groq APIs: Leveraged for providing a seamless wrapper to GPT-4o prompts for creating custom
itinerary content, FAQs, and more.
○ SerpAPI: Used for scraping Google search results to fetch popular destinations and other relevant data.
○ MongoDB: NoSQL database used for storing itineraries and other user-generated content. The choice of
MongoDB allows for flexible schema design and easy scalability.

● Language: TypeScript for type safety across the application, reducing errors, and improving code quality.

2. Key Features
   
● Interactive Form: A crisp and minimalistic form for users to input their travel preferences.

● Dynamic Itinerary Generation: Custom itineraries generated in real-time based on current data, including
activities, eateries, FAQs, and popular destinations.

● Shareable Links: Users receive a unique link to their itinerary, which can be shared with others.

● Chatbot Integration: An AI-powered chatbot is available to assist users with their travel planning questions.

● Loading Screen: A thoughtfully designed loading screen keeps users engaged with rotating images and texts
while the itinerary is being generated.

3. Challenges and Solutions
   
● User Interface Design: It was initially challenging to organize the itinerary details, especially when displaying
day-wise activities in a single tab. Feedback from peers led to changes in the color scheme and improved the
overall UI.

● Error Handling: For GPT-4o prompts, a retry mechanism was implemented to handle occasional errors in
generating valid JSON responses. The function attempts to generate the correct result up to three times, though the
error rate remains at about 1/100 requests. Future improvements could involve refining the prompts or using
parallel requests to increase success rates.
