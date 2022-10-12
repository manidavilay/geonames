import React, { useEffect, useState } from "react";
import { fetchCountries, IGeo } from "./api/Geonames";
import { filterCountries, getUniqueContinents } from "./utils/Functions";
import Actions from "./components/actions/Actions";
import Filters from "./components/filters/Filters";
import CountriesTable from "./components/table/CountriesTable";
import CountriesChart from "./components/charts/CountriesChart";
import Dialog from "./components/dialog/Dialog";
import Footer from "./layout/Footer";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import "./App.scss";

function App() {
  const [countries, setCountries] = useState<IGeo[]>([]);
  const [uniqueContinents, setUniqueContinents] = useState<string[]>([]);

  const [isCountriesLoading, setIsCountriesLoading] = useState<boolean>(true);
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);

  const [currentContinent, setCurrentContinent] = useState<string>("All");
  const [currentMetric, setCurrentMetric] = useState<string>("All");
  const [currentMaxResults, setCurrentMaxResults] = useState<number>(3);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const closeDialog = () => {
    setIsDialogOpened(false);
  };

  const handleResize = () => {
    if (window.innerWidth < 767) {
      setIsDialogOpened(true);
    } else {
      setIsDialogOpened(false);
    }
  };
 
  useEffect(() => {
    if (countries.length !== 0) {
      setUniqueContinents(getUniqueContinents(countries));
      setIsCountriesLoading(false);
      window.addEventListener('resize', handleResize);
    };
  }, [countries]);

  let selectedCountries = filterCountries(countries, currentContinent);

  let selectedCapitals = selectedCountries.filter((country) => {
    return country.capital !== "";
  });
  
  let sumOfSelectedCapitals = selectedCapitals.length;

  return (
    <div className="App">
      {isCountriesLoading && (
        <Actions onGo={updateCountries} isCountriesLoading={isCountriesLoading}></Actions>
      )}
      {!isCountriesLoading && (
        <>
          <Filters
            disabled={isCountriesLoading}
            uniqueContinents={uniqueContinents}
            handleContinentChange={handleContinentChange}
            handleMetricChange={handleMetricChange}
            handleMaxResults={handleMaxResults}
          />
          <CountriesChart
            selectedCountries={selectedCountries}
            currentMetric={currentMetric}
            currentMaxResults={currentMaxResults}
          />
          <CountriesTable
            selectedCountries={selectedCountries}
            currentMetric={currentMetric}
            sumOfSelectedCapitals={sumOfSelectedCapitals}
          />
          <FaRegArrowAltCircleUp size={30} color="#d75e49" className="App__scroll-up" onClick={scrollToTop} />
        </>
      )}
      {isDialogOpened && (
        <Dialog closeDialog={closeDialog} />
      )}
      <Footer />
    </div>
  );
}

export default App;

