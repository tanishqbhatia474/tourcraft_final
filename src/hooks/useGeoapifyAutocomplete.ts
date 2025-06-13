import axios from "axios";
import { useState } from "react";
import { debounce } from "lodash";

const useGeoapifyAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = debounce(async (query: any) => {
    if (query) {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete`,
          {
            params: {
              text: query,
              apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_KEY,
            },
          }
        );
        setSuggestions(response.data.features);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    }
  }, 100); // 100ms debounce

  return { suggestions, fetchSuggestions };
};

export { useGeoapifyAutocomplete };
