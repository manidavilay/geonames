import { IGeo } from "../api/Geonames";

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
