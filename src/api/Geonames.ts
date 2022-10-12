import axios from "axios";

export interface IGeo {
  population: number;
  areaInSqKm: number;
  countryName: string;
  capital: string;
  continentName: string;
}

// Fetch Geonames API
export const fetchCountries = () => {
  return axios
    .get(
      `${process.env.REACT_APP_URL}/.netlify/functions/proxy`
      )
    .then((res) => {
      return(res.data.geonames);
    });
};