import React, { useEffect, useState } from 'react';
import { fetchCountries, IGeo } from './api/Geonames';
import './App.css';
import Actions from './components/Actions';
import CountriesChart from './components/CountriesChart';
import CountriesTable from './components/CountriesTable';
import Select from './components/Select';
import { filterCountries, getUniqueContinents } from './utils/Functions';

function App() {
  const [countries, setCountries] = useState<IGeo[]>([]);
  const [uniqueContinents, setUniqueContinents] = useState<string[]>([]);

  const [isCountriesLoading, setIsCountriesLoading] = useState<boolean>(true);

  const [currentContinent, setCurrentContinent] = useState<string>("All");
  const [currentMetric, setCurrentMetric] = useState<string>("All");
  const [currentMaxResults, setCurrentMaxResults] = useState<number>(5);

  const metrics = ["All", "AreaInSqKm", "Population"];
  const maxResults = [5, 10, 15, 20];

  const updateCountries = async () => {
    const data = await fetchCountries();
    setCountries(data);
  };

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentContinent(e.target.value);
  };

  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMetric(e.target.value);
  };

  const handleMaxResults = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMaxResults(parseInt(e.target.value));
  };

  useEffect(() => {
    if (countries.length !== 0) {
      setUniqueContinents(getUniqueContinents(countries));
      setIsCountriesLoading(false);
    }
  }, [countries]);

  let selectedCountries = filterCountries(countries, currentContinent);
  
  return (
    <div className="App">
      <Actions onGo={updateCountries}></Actions>
      <Select optionData={uniqueContinents} disabled={isCountriesLoading} onChange={handleContinentChange} />
      <Select optionData={metrics} disabled={isCountriesLoading} onChange={handleMetricChange} />
      <Select optionData={maxResults} disabled={isCountriesLoading} onChange={handleMaxResults} />
      {!isCountriesLoading && (
        <>
        <CountriesChart selectedCountries={selectedCountries} currentMetric={currentMetric} currentMaxResults={currentMaxResults} />
        <CountriesTable selectedCountries={selectedCountries} currentMetric={currentMetric} />
      </>
      )}
    </div>
  );
}

export default App;
