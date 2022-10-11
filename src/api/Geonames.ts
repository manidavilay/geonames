import axios from "axios";

export interface IGeo {
  population: number;
  areaInSqKm: number;
  countryName: string;
  continentName: string;
}

// Fetch Geonames API
export const fetchCountries = () => {
  return axios
    .get(
      "http://api.geonames.org/countryInfoJSON?formatted=true&username=manyvilay"
    )
    .then((res) => {
      return(res.data.geonames);
    });
};