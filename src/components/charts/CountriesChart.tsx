import { IGeo } from "../../api/Geonames";
import { MetricType } from "../../utils/Enums";
import Pie from "../pie/Pie";
import "./CountriesChart.scss";

type Props = {
  selectedCountries: IGeo[];
  currentMetric: string;
  currentMaxResults: number;
};

const CountriesChart = ({
  selectedCountries,
  currentMetric,
  currentMaxResults,
}: Props) => {
  return (
    <div className="charts">
      {currentMetric !== "AreaInSqKm" && (
        <Pie
          selectedCountries={selectedCountries}
          option={MetricType.population}
          currentMaxResults={currentMaxResults}
          title="Population pie chart"
          label="people"
        />
      )}
      {currentMetric !== "Population" && (
        <Pie
          selectedCountries={selectedCountries}
          option={MetricType.areaInSqKm}
          currentMaxResults={currentMaxResults}
          title="Area in sqKm pie chart"
          label="km²"
        />
      )}
    </div>
  );
};

export default CountriesChart;