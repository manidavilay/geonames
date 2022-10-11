import { IGeo } from "../api/Geonames";
import { MetricType } from "./Enums";

// Once countries are fetched, only get the unique continents and avoid duplicates
export const getUniqueContinents = (countries: IGeo[]): string[] => {
  const uniqueContinents: string[] = ["All"];
  countries.sort((a, b) => a.continentName.localeCompare(b.continentName));
  countries.map((country) => {
    if (!uniqueContinents.includes(country.continentName)) {
      uniqueContinents.push(country.continentName);
    }
  });
  return uniqueContinents;
};

// Filter countries depending on selected continent
export const filterCountries = (
  countries: IGeo[],
  currentContinent: string
) => {
  const filteredCountries: IGeo[] = [];
  countries.map((country) => {
    if (
      country.continentName === currentContinent ||
      currentContinent === "All"
    ) {
      filteredCountries.push(country);
    }
  });
  return filteredCountries;
};

// Calculate total of population or areainsqkm
export const calculateTotalDataCountries = (
  option: MetricType,
  countries: IGeo[]
): number => {
  let total = 0;
  countries.map((country) => {
    if (option === MetricType.population) {
      total += +country.population;
    } else {
      total += +country.areaInSqKm;
    }
  });
  return total;
};
