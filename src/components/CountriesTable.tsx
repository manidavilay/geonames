import { IGeo } from "../api/Geonames";
import { calculateTotalDataCountries } from "../utils/Functions";
import { MetricType } from "../utils/Enums";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = {
    selectedCountries: IGeo[];
    currentMetric: string;
};

const CountriesTable = ({ selectedCountries, currentMetric }: Props) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
  
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }));
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ContinentName</StyledTableCell>
              <StyledTableCell align="right">CountryName</StyledTableCell>
              {currentMetric !== "Population" && (
                <StyledTableCell align="right">AreaInSqKm</StyledTableCell>
              )}
              {currentMetric !== "AreaInSqKm" && (
                <StyledTableCell align="right">Population</StyledTableCell>
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
            >
              <TableCell>Total</TableCell>
              <TableCell align="right">{selectedCountries.length}</TableCell>
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
    );
  };
  
  export default CountriesTable;