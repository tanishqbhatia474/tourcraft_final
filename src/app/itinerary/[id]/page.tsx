"use client";
import { get_itinerary } from "@/lib/actions/itinerariesActions";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Clock,
  HelpCircle,
  Compass,
  IndianRupee,
  Binoculars,
  Mountain,
  Leaf,
  HandPlatter,
  ShoppingCart,
  GraduationCap,
  LoaderPinwheel,
  Flower,
  TvMinimal,
  Landmark,
  TentTree,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TravelDestination } from "@/lib/types/popularDestinations";
import { ActivityType, Eateries, Faqs } from "@/lib/types/itinerary";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type Activity = {
  title: string;
  description: string;
  type: string;
  time: string;
  location: string;
  cost: number;
};

type ItineraryDay = {
  day_number: number;
  activities: Activity[];
};

type ItineraryDisplayProps = {
  itinerary: ItineraryDay[];
  eateries: Eateries;
  faqs: Faqs;
  popularDestinations: TravelDestination[];
};

type Itinerary = {
  uuid: string;
  itinerary: ItineraryDay[];
  eateries: Eateries;
  faqs: Faqs;
  popularDestinations: TravelDestination[];
};

type IconComponentType = React.ComponentType<{ className?: string }>;

const ActivityIcons: Record<ActivityType, IconComponentType> = {
  Sightseeing: Binoculars,
  Adventure: Mountain,
  Cultural: Landmark,
  Relaxation: TentTree,
  Dining: HandPlatter,
  Shopping: ShoppingCart,
  Entertainment: TvMinimal,
  Nature: Leaf,
  Educational: GraduationCap,
  Sport: LoaderPinwheel,
  Wellness: Flower,
};

const IteneraryPage = ({ id }: { id: string }) => {
  const [itinerary, setItinerary] = useState<Itinerary>({} as Itinerary);

  useEffect(() => {
    console.log("CALLING", id);
    get_itinerary(id).then((res) => {
      console.log("Fetched Itinerary Response:", res); // 🔍 Added this line
      if (!res.error) {
        setItinerary(res);
        console.log("Itinerary Data Set:", res); // 🔍 Also log here after setting state
      } else {
        console.error("Failed to fetch itinerary:", res.error);
      }
    });
  }, [id]);
  

  console.log(itinerary);

  return (
    <ItineraryDisplay
      itinerary={itinerary.itinerary}
      eateries={itinerary.eateries}
      faqs={itinerary.faqs}
      popularDestinations={itinerary.popularDestinations}
    />
  );
};

function ItineraryDisplay({
  itinerary,
  eateries,
  faqs,
  popularDestinations,
}: ItineraryDisplayProps) {
  return (
    <Tabs defaultValue="itinerary" className="w-full my-3 max-w-4xl mx-auto">
      <TabsList className="grid w-full mb-5 grid-cols-4">
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="eateries">Eateries</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
        <TabsTrigger value="destinations">Popular Destinations</TabsTrigger>
      </TabsList>
      <TabsContent value="itinerary">
        <ItineraryTab itinerary={itinerary} />
      </TabsContent>
      <TabsContent value="eateries">
        <EateriesTab eateries={eateries} />
      </TabsContent>
      <TabsContent value="faqs">
        <FAQsTab faqs={faqs} />
      </TabsContent>
      <TabsContent value="destinations">
        <DestinationsTab destinations={popularDestinations} />
      </TabsContent>
    </Tabs>
  );
}

function ItineraryTab({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [currentPage, setCurrentPage] = useState(0);

  if (itinerary === undefined) {
    return (
      <div className="flex items-center justify-center h-[555px] w-full">
        <h3 className="text-lg text-muted-foreground">Loading Itinerary...</h3>
      </div>
    );
  }

  if (itinerary.length === 0) {
    return (
      <div className="flex items-center justify-center h-[555px] w-full">
        <h3 className="text-lg text-muted-foreground">
          No activities planned for this itinerary.
        </h3>
      </div>
    );
  }

  const goToPreviousDay = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextDay = () => {
    setCurrentPage((prev) => Math.min(itinerary.length - 1, prev + 1));
  };

  const currentDay = itinerary[currentPage];

  return (
    <div className="w-full">
      <Card className="mb-4">
        <ScrollArea className="h-[515px] w-full rounded-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">
                Day {currentDay.day_number}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {currentDay.activities.map((activity, index) => {
              const IconComponent =
                ActivityIcons[activity.type as ActivityType] || Compass;
              return (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <IconComponent className="h-4 w-4 mr-2" />
                      <h4 className="font-semibold">{activity.title}</h4>
                    </div>
                    <div className="flex bg-white/10 px-2 rounded-full py-2">
                      {activity.cost > 0 ? (
                        Array.from({ length: activity.cost }).map((_, i) => (
                          <IndianRupee size={15} key={i} />
                        ))
                      ) : (
                        <IndianRupee size={15} />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" /> {activity.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" /> {activity.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </ScrollArea>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={goToPreviousDay}
          disabled={currentPage === 0}
        >
          Previous Day
        </Button>
        <span>
          Day {currentPage + 1} of {itinerary.length}
        </span>
        <Button
          variant="outline"
          onClick={goToNextDay}
          disabled={currentPage === itinerary.length - 1}
        >
          Next Day
        </Button>
      </div>
    </div>
  );
}

function EateriesTab({ eateries }: { eateries: Eateries }) {
  return (
    <ScrollArea className="h-[555px] w-full rounded-md">
      {eateries.map((eatery, index) => (
        <Card key={index} className="mb-4">
          <CardHeader className="pt-6 pb-2">
            <div className="flex justify-between w-full">
              <CardTitle>{eatery.title}</CardTitle>
              <div className="flex bg-white/10 px-2 rounded-full py-2">
                {Array.from({ length: eatery.cost }).map((_, i) => (
                  <IndianRupee size={15} key={i} />
                ))}
              </div>
            </div>
            <CardDescription className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" /> {eatery.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {eatery.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}

function FAQsTab({ faqs }: { faqs: Faqs }) {
  return (
    <ScrollArea className="h-[555px] w-full rounded-md">
      {faqs.map((faq, index) => (
        <Card key={index} className="mb-4">
          <CardHeader className="pt-6 pb-2">
            <CardTitle className="flex items-center text-lg">
              <HelpCircle className="mr-2 h-5 w-5" />
              {faq.ques}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{faq.ans}</p>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}

function DestinationsTab({
  destinations,
}: {
  destinations: TravelDestination[];
}) {
  return (
    <ScrollArea className="h-[555px] w-full rounded-md px-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {destinations?.map((destination, index) => (
          <Card key={index} className="flex w-40 p-3 flex-col h-full">
            <CardHeader className="flex-shrink-0 p-0">
              <CardTitle className="text-base line-clamp-1">
                {destination.title}
              </CardTitle>

              <CardDescription className="my-1 text-yellow-400">
                {destination.rating ?? "-"}/5
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-0 mt-2 justify-between">
              {destination.thumbnail && (
                <div className="relative w-full h-28 overflow-hidden rounded-md">
                  <Image
                    src={destination.thumbnail}
                    alt={destination.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

const Page = ({ params }: { params: { id: string } }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/chatbot-plugin.js";
    script.async = true;
    document.body.appendChild(script);
  },[]);
  return <IteneraryPage id={params.id} />;
};

export default Page;
