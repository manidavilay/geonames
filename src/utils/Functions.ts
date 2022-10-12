import { IGeo } from "../api/Geonames";
import { MetricType, sortType } from "./Enums";

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

// Sort data by sortType
export const sortData = (
  sorted: boolean,
  option: sortType,
  selectedCountries: IGeo[]
): IGeo[] => {
  switch (option) {
    case sortType.continent:
      if (sorted) {
        selectedCountries.sort((a, b) =>
          a.continentName.localeCompare(b.continentName)
        );
      } else {
        selectedCountries.sort((a, b) =>
          b.continentName.localeCompare(a.continentName)
        );
      }
      break;
    case sortType.country:
      if (sorted) {
        selectedCountries.sort((a, b) =>
          a.countryName.localeCompare(b.countryName)
        );
      } else {
        selectedCountries.sort((a, b) =>
          b.countryName.localeCompare(a.countryName)
        );
      }
      break;
    case sortType.capital:
      if (sorted) {
        selectedCountries.sort((a, b) => 
          a.capital.localeCompare(b.capital)
        );
      } else {
        selectedCountries.sort((a, b) => 
          b.capital.localeCompare(a.capital)
        );
      }
      break;
    case sortType.population:
      if (sorted) {
        selectedCountries.sort((a, b) => a.population - b.population);
      } else {
        selectedCountries.sort((a, b) => b.population - a.population);
      }
      break;
    case sortType.areaInSqKm:
      if (sorted) {
        selectedCountries.sort((a, b) => a.areaInSqKm - b.areaInSqKm);
      } else {
        selectedCountries.sort((a, b) => b.areaInSqKm - a.areaInSqKm);
      }
      break;
  }
  return selectedCountries;
};