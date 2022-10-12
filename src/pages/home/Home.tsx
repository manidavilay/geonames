import { IGeo } from "../../api/Geonames";
import Actions from "../../components/actions/Actions";
import Filters from "../../components/filters/Filters";
import CountriesChart from "../../components/charts/CountriesChart";
import CountriesTable from "../../components/table/CountriesTable";
import Dialog from "../../components/dialog/Dialog";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import Footer from "../../layout/Footer";
import "./Home.scss";

type Props = {
  isCountriesLoading: boolean;
  isDialogOpened: boolean;
  handleContinentChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleMetricChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleMaxResults: React.ChangeEventHandler<HTMLSelectElement>;
  uniqueContinents: string[];
  selectedCountries: IGeo[];
  currentMetric: string;
  currentMaxResults: number;
  sumOfSelectedCapitals: number;
  updateCountries: () => void;
  scrollToTop: () => void;
  closeDialog: () => void;
};

const Home = ({
  isCountriesLoading,
  isDialogOpened,
  handleContinentChange,
  handleMetricChange,
  handleMaxResults,
  uniqueContinents,
  selectedCountries,
  currentMetric,
  currentMaxResults,
  sumOfSelectedCapitals,
  updateCountries,
  scrollToTop,
  closeDialog
}: Props) => {
  return (
    <div className="home">
      {isCountriesLoading && (
        <Actions
          updateCountries={updateCountries}
          isCountriesLoading={isCountriesLoading}
        ></Actions>
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
          <FaRegArrowAltCircleUp
            size={30}
            color="#d75e49"
            className="home__scroll-up"
            onClick={scrollToTop}
          />
        </>
      )}
      {isDialogOpened && <Dialog closeDialog={closeDialog} />}
      <Footer />
    </div>
  );
};

export default Home;
