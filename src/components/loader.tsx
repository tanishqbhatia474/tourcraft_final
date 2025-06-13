//jab load hora hoga sab tab ye ayga
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Loader() {
  const slides = ["1.gif", "2.gif", "3.gif", "4.gif"];
  const loadingTexts = [
    "Compiling your travel checklist...",
    "Searching for the best experiences...",
    "Mapping out your travel itinerary...",
    "Packing your essentials...",
  ];

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [slide]);

  return (
    <div className="mainLoader flex items-center justify-center h-screen">
      <div className="h-1/2 grid w-full">
        <div className="loadingImage object-contain relative flex flex-col justify-end items-center">
          <Image
            src={`/${slides[slide]}`}
            height={300}
            width={300}
            className="object-contain"
            alt="loading..."
          />
        </div>
        <p className="text-center text-xl font-medium">
          {loadingTexts[slide]}
        </p>
      </div>
    </div>
  );
}
