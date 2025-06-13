"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGeoapifyAutocomplete } from "@/hooks/useGeoapifyAutocomplete";
import TravelFormSchema, {
  Interest,
  TravelCompanion,
  TravelType,
} from "@/lib/types/formSchema";
import { generateFullTravelPlan } from "@/lib/actions/tripPlan";
import { useRouter } from "next/navigation";
import Loader from "./loader";

const initialFormData: TravelFormSchema = {
  destination: "",
  travelDates: { startDate: new Date(), endDate: addDays(new Date(), 1) },
  budget: 0,
  numberOfPeople: 1,
  travelType: "Adventure",
  keyInterests: [],
  travelCompanions: "Solo",
};

const steps = [
  "Destination",
  "Travel Dates",
  "Budget",
  "Travel Type",
  "Key Interests",
  "Travel Companions",
];

export default function TravelForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TravelFormSchema>(initialFormData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { suggestions, fetchSuggestions } = useGeoapifyAutocomplete();

  const updateFormData = (field: keyof TravelFormSchema, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setLoading(true);
      const res = await generateFullTravelPlan(formData);
      router.push(`/itinerary/${res}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const ToggleBox = ({
    label,
    isSelected,
    onClick,
  }: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      className={`p-4 rounded-lg text-center transition-colors ${
        isSelected
          ? "bg-primary text-primary-foreground"
          : "bg-secondary hover:bg-secondary/80"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-3 relative">
            <Label htmlFor="destination">Where do you want to travel to?</Label>
            <Input
              id="destination"
              value={formData.destination}
              className="h-12"
              placeholder="Enter your destination"
              // onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                updateFormData("destination", e.target.value);
                fetchSuggestions(e.target.value);
              }}
            />
            {formData.destination &&
              isDropdownOpen &&
              suggestions.length > 0 && (
                <div className="border w-full z-10 bg-background rounded-lg max-h-32 overflow-y-auto absolute">
                  {suggestions.map((suggestion: any) => (
                    <div
                      onClick={() => {
                        updateFormData(
                          "destination",
                          suggestion.properties.formatted
                        );

                        setIsDropdownOpen(false);
                      }}
                      key={suggestion.properties.place_id}
                      className="p-2 cursor-pointer truncate"
                    >
                      {suggestion.properties.formatted}
                    </div>
                  ))}
                </div>
              )}
          </div>
        );
      case 1:
        return (
          <div className="grid gap-4">
            <div>
              <Label>From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-2 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.travelDates.startDate ? (
                      format(formData.travelDates.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.travelDates.startDate}
                    onSelect={(date) =>
                      updateFormData("travelDates", {
                        ...formData.travelDates,
                        startDate: date || new Date(),
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-2 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.travelDates.endDate ? (
                      format(formData.travelDates.endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.travelDates.endDate}
                    onSelect={(date) =>
                      updateFormData("travelDates", {
                        ...formData.travelDates,
                        endDate: date || new Date(),
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      case 2:
        return (
          <>
            <div>
              <Label htmlFor="budget">
                How much can you spend on your trip per person?{" "}
              </Label>
              <div className="relative mt-2">
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  className="pl-5"
                  onChange={(e) =>
                    updateFormData("budget", parseInt(e.target.value))
                  }
                />
                <span className="absolute top-2 left-2">₹</span>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="numberOfPeople">
                How many people are you travelling with? (including you)
              </Label>

              <Input
                id="numberOfPeople"
                type="number"
                className="mt-2"
                value={formData.numberOfPeople}
                onChange={(e) =>
                  updateFormData("numberOfPeople", parseInt(e.target.value))
                }
              />
            </div>
          </>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                "Adventure",
                "Relaxation",
                "Cultural",
                "Family",
                "Romantic",
                "Business",
              ] as TravelType[]
            ).map((type) => (
              <ToggleBox
                key={type}
                label={type}
                isSelected={formData.travelType === type}
                onClick={() => updateFormData("travelType", type)}
              />
            ))}
          </div>
        );
      case 4:
        return (
          <>
            <Label>Select all that apply</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {(
                [
                  "Nature",
                  "Historical Sites",
                  "Food & Drink",
                  "Shopping",
                  "Nightlife",
                  "Adventure Sports",
                ] as Interest[]
              ).map((interest) => (
                <ToggleBox
                  key={interest}
                  label={interest}
                  isSelected={formData.keyInterests.includes(interest)}
                  onClick={() => {
                    if (formData.keyInterests.includes(interest)) {
                      updateFormData(
                        "keyInterests",
                        formData.keyInterests.filter((i) => i !== interest)
                      );
                    } else {
                      updateFormData("keyInterests", [
                        ...formData.keyInterests,
                        interest,
                      ]);
                    }
                  }}
                />
              ))}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <Label>Who are you travelling with?</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {(
                ["Solo", "Couple", "Family", "Friends"] as TravelCompanion[]
              ).map((companion) => (
                <ToggleBox
                  key={companion}
                  label={companion}
                  isSelected={formData.travelCompanions === companion}
                  onClick={() => updateFormData("travelCompanions", companion)}
                />
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
      {loading ? (
        <Loader/>
      ) : (
        <Card className="w-full border-none shadow-none max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl">Travel Planner</CardTitle>
            <CardDescription>
              Plan your next adventure step by step
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-6 gap-2">
                {steps.map((step, index) => (
                  <div key={step} className="space-y-2">
                    <Progress
                      value={currentStep >= index ? 100 : 0}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
              <div className="pt-4 min-h-[300px]">
                <h3 className="text-2xl font-medium mb-4">
                  {steps[currentStep]}
                </h3>
                {renderStep()}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 0 ? (
              <Button onClick={handlePrevious}>Previous</Button>
            ) : (
              <div></div>
            )}
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
