import { IGeo } from "../api/Geonames";
import { ResponsivePie } from "@nivo/pie";

interface dataChart {
  id: string;
  value: number;
}

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
  let populationData: dataChart[] = [];
  let areaInSqKmData: dataChart[] = [];

  let sortedPopulationCountries = selectedCountries.sort(
    (a, b) => b.population - a.population
  );
  let sortedAreaInSqKmCountries = selectedCountries.sort(
    (a, b) => b.areaInSqKm - a.areaInSqKm
  );

  sortedPopulationCountries.map((country, index) => {
    if (index < currentMaxResults) {
      populationData.push({
        id: country.countryName,
        value: country.population,
      });
    }
  });

  sortedAreaInSqKmCountries.map((country, index) => {
    if (index < currentMaxResults) {
      areaInSqKmData.push({
        id: country.countryName,
        value: country.areaInSqKm,
      });
    }
  });

  return (
    <div style={{ height: 800 }}>
      {currentMetric !== "AreaInSqKm" && (
        <>
          <h2>Countries sorted by population: </h2>
          <ResponsivePie
            data={populationData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            borderWidth={1}
            colors={{ scheme: "paired" }}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLabelsSkipAngle={10}
            arcLabel={() => {return " "}}
            arcLinkLabel={(e) => {return e.id+" : "+e.value+" people"}}
            arcLinkLabelsDiagonalLength={36}
            arcLinkLabelsStraightLength={36}
            arcLinkLabelsTextOffset={15}
            arcLinkLabelsThickness={3}
            arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
            arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
          />
        </>
      )}
      {currentMetric !== "Population" && (
        <>
          <h2>Countries sorted by area: </h2>
          <ResponsivePie
            data={areaInSqKmData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            borderWidth={1}
            colors={{ scheme: "dark2" }}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLabelsSkipAngle={10}
            arcLabel={() => {return " "}}
            arcLinkLabel={(e) => {return e.id+" : "+e.value+" sqKm"}}
            arcLinkLabelsDiagonalLength={36}
            arcLinkLabelsStraightLength={36}
            arcLinkLabelsTextOffset={15}
            arcLinkLabelsThickness={3}
            arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
            arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
          />
        </>
      )}
    </div>
  );
};

export default CountriesChart;