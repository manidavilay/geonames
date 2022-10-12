import { useState } from "react";
import { IGeo } from "../../api/Geonames";
import { MetricType, sortType } from "../../utils/Enums";
import { calculateTotalDataCountries, sortData } from "../../utils/Functions";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TiArrowUnsorted } from "react-icons/ti";
import "./CountriesTable.scss";

type Props = {
  selectedCountries: IGeo[];
  currentMetric: string;
  sumOfSelectedCapitals: number;
};

const CountriesTable = ({
  selectedCountries,
  currentMetric,
  sumOfSelectedCapitals,
}: Props) => {
  const [continentAlphabetically, setContinentAlphabetically] =
    useState<boolean>(true);
  const [countryAlphabetically, setCountryAlphabetically] =
    useState<boolean>(true);
  const [capitalAlphabetically, setCapitalAlphabetically] =
    useState<boolean>(true);
  const [populationAscending, setPopulationAscending] = useState<boolean>(true);
  const [areaInSqKmAscending, setAreaInSqKmAscending] = useState<boolean>(true);

  // Material IU for table cell
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#61CDBB",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  // Material IU for table row
  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#E8F3F1",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    "&:last-child": {
      backgroundColor: "#C4E9E3",
    }
  }));

  // Handleclick for each sort type: continent, country, population and areaInSqKm and sort depending on those type
  const handleClick = (optionSort: sortType) => {
    if (optionSort === sortType.continent) {
      sortData(continentAlphabetically, optionSort, selectedCountries);
      setContinentAlphabetically(!continentAlphabetically);
    } else if (optionSort === sortType.country) {
      sortData(countryAlphabetically, optionSort, selectedCountries);
      setCountryAlphabetically(!countryAlphabetically);
    } else if (optionSort === sortType.capital) {
      sortData(capitalAlphabetically, optionSort, selectedCountries);
      setCapitalAlphabetically(!capitalAlphabetically);
    } else if (optionSort === sortType.population) {
      sortData(populationAscending, optionSort, selectedCountries);
      setPopulationAscending(!populationAscending);
    } else if (optionSort === sortType.areaInSqKm) {
      sortData(areaInSqKmAscending, optionSort, selectedCountries);
      setAreaInSqKmAscending(!areaInSqKmAscending);
    }
  };

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead sx={{ maxHeight: 440 }}>
            <TableRow className="table__row">
              <StyledTableCell>
                Continent
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleClick(sortType.continent)
                  }
                  className="table__sort-btn"
                >
                  <TiArrowUnsorted size={18} color="#FFFFFF" />
                </button>
              </StyledTableCell>
              <StyledTableCell align="right">
                Country
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleClick(sortType.country)
                  }
                  className="table__sort-btn"
                >
                  <TiArrowUnsorted size={18} color="#FFFFFF" />
                </button>
              </StyledTableCell>
              <StyledTableCell align="right">
                Capital
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleClick(sortType.capital)
                  }
                  className="table__sort-btn"
                >
                  <TiArrowUnsorted size={18} color="#FFFFFF" />
                </button>
              </StyledTableCell>
              {currentMetric !== "Population" && (
                <StyledTableCell align="right">
                  Area (km²)
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleClick(sortType.areaInSqKm)
                    }
                    className="table__sort-btn"
                  >
                    <TiArrowUnsorted size={18} color="#FFFFFF" />
                  </button>
                </StyledTableCell>
              )}
              {currentMetric !== "AreaInSqKm" && (
                <StyledTableCell align="right">
                  Population
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleClick(sortType.population)
                    }
                    className="table__sort-btn"
                  >
                    <TiArrowUnsorted size={18} color="#FFFFFF" />
                  </button>
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedCountries.map((country) => (
              <StyledTableRow
                key={country.countryName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {country.continentName}
                </TableCell>
                <TableCell align="right">{country.countryName}</TableCell>
                <TableCell align="right">{country.capital}</TableCell>
                {currentMetric !== "Population" && (
                  <TableCell align="right">{country.areaInSqKm}</TableCell>
                )}
                {currentMetric !== "AreaInSqKm" && (
                  <TableCell align="right">{country.population}</TableCell>
                )}
              </StyledTableRow>
            ))}
            <StyledTableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="table__last-row"
            >
              <TableCell>Total</TableCell>
              <TableCell align="right">{selectedCountries.length}</TableCell>
              <TableCell align="right">{sumOfSelectedCapitals}</TableCell>
              {currentMetric !== "Population" && (
                <TableCell align="right">
                  {calculateTotalDataCountries(
                    MetricType.areaInSqKm,
                    selectedCountries
                  )}
                </TableCell>
              )}
              {currentMetric !== "AreaInSqKm" && (
                <TableCell align="right">
                  {calculateTotalDataCountries(
                    MetricType.population,
                    selectedCountries
                  )}
                </TableCell>
              )}
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CountriesTable;
