import React, { useEffect, useState } from "react";
import { fetchCountries, IGeo } from "./api/Geonames";
import { filterCountries, getUniqueContinents } from "./utils/Functions";
import Home from "./pages/home/Home";
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

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeDialog = (): void => {
    setIsDialogOpened(false);
  };

  const handleResize = (): void => {
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
      window.addEventListener("resize", handleResize);
    }
  }, [countries]);

  let selectedCountries = filterCountries(countries, currentContinent);

  let selectedCapitals = selectedCountries.filter((country) => {
    return country.capital !== "";
  });

  let sumOfSelectedCapitals = selectedCapitals.length;

  return (
    <div className="App">
      <Home
        isCountriesLoading={isCountriesLoading}
        isDialogOpened={isDialogOpened}
        handleContinentChange={handleContinentChange}
        handleMetricChange={handleMetricChange}
        handleMaxResults={handleMaxResults}
        updateCountries={updateCountries}
        uniqueContinents={uniqueContinents}
        selectedCountries={selectedCountries}
        currentMetric={currentMetric}
        currentMaxResults={currentMaxResults}
        sumOfSelectedCapitals={sumOfSelectedCapitals}
        scrollToTop={scrollToTop}
        closeDialog={closeDialog}
      />
    </div>
  );
}

export default App;
