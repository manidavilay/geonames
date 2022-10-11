import { IGeo } from "../../api/Geonames";
import { MetricType } from "../../utils/Enums";
import { ResponsivePie } from "@nivo/pie";
import "./Pie.css";

interface dataChart {
  id: string;
  value: number;
}

type Props = {
  selectedCountries: IGeo[];
  option: MetricType;
  currentMaxResults: number;
  title: string;
  label: string;
};

const Pie = ({
  selectedCountries,
  option,
  currentMaxResults,
  title,
  label,
}: Props) => {
  let pieData: dataChart[] = [];
  let totalOther: number = 0;
  const selectedCountriesLength: number = selectedCountries.length;

  // If the metric is population, sort population, if not, sort areaInSqKm
  if (option === MetricType.population) {
    selectedCountries.sort((a, b) => b.population - a.population);
  } else {
    selectedCountries.sort((a, b) => b.areaInSqKm - a.areaInSqKm);
  }

  // Push countries into pieData array depending on the metric
  selectedCountries.map((country, index) => {
    // Metric population
    if (option === MetricType.population) {
      if (index < currentMaxResults && country.population > 0) {
        pieData.push({
          id: country.countryName,
          value: country.population,
        });
      } else {
        // Also return an "other" value which aggregates all the remaining population not shown
        totalOther += +country.population;
        if (selectedCountriesLength === index + 1 && country.population > 0) {
          pieData.push({
            id: "Other",
            value: totalOther,
          });
        }
      }
    // Metric areaInSqKm
    } else {
      if (index < currentMaxResults) {
        pieData.push({
          id: country.countryName,
          value: country.areaInSqKm,
        });
      } else {
        // Also return an "other" value which aggregates all the remaining areaInSqKm not shown
        totalOther += +country.areaInSqKm;
        if (selectedCountriesLength === index + 1 && country.areaInSqKm > 0) {
          pieData.push({
            id: "Other",
            value: totalOther,
          });
        }
      }
    }
  });

  return (
    <div className="pie">
      <h2>{title}</h2>
      <ResponsivePie
        data={pieData}
        sortByValue={true}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        borderWidth={1}
        colors={{ scheme: "paired" }}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLabelsSkipAngle={10}
        arcLabel={() => {
          return " ";
        }}
        arcLinkLabel={(e) => {
          return e.id + " : " + e.value + " " + label;
        }}
        arcLinkLabelsDiagonalLength={36}
        arcLinkLabelsStraightLength={36}
        arcLinkLabelsTextOffset={15}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      />
    </div>
  );
};

export default Pie;