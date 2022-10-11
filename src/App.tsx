import React, { useEffect, useState } from 'react';
import { fetchCountries, IGeo } from './api/Geonames';
import { filterCountries, getUniqueContinents } from './utils/Functions';
import Actions from './components/actions/Actions';
import Filters from './components/filters/Filters';
import CountriesTable from './components/table/CountriesTable';
import CountriesChart from './components/charts/CountriesChart';
import './App.css';

function App() {
  const [countries, setCountries] = useState<IGeo[]>([]);
  const [uniqueContinents, setUniqueContinents] = useState<string[]>([]);

  const [isCountriesLoading, setIsCountriesLoading] = useState<boolean>(true);

  const [currentContinent, setCurrentContinent] = useState<string>("All");
  const [currentMetric, setCurrentMetric] = useState<string>("All");
  const [currentMaxResults, setCurrentMaxResults] = useState<number>(5);

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
      <Filters disabled={isCountriesLoading} uniqueContinents={uniqueContinents} handleContinentChange={handleContinentChange} handleMetricChange={handleMetricChange} handleMaxResults={handleMaxResults} />
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
