import Select from "../select/Select";
import "./Filters.scss";

type Props = {
  disabled: boolean;
  uniqueContinents: string[];
  handleContinentChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleMetricChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleMaxResults: React.ChangeEventHandler<HTMLSelectElement>;
};

const Filters = ({
  disabled,
  uniqueContinents,
  handleContinentChange,
  handleMetricChange,
  handleMaxResults,
}: Props) => {
  const metrics = ["All", "AreaInSqKm", "Population"];
  const maxResults = [3, 5, 10];
  
  return (
    <div className="filters">
      <div className="filter">
        {!disabled && (
          <p className="filter__label">Select a continent</p>
        )}
        <Select
          optionData={uniqueContinents}
          disabled={disabled}
          onChange={handleContinentChange}
        />
      </div>
      <div className="filter">
        {!disabled && (
          <p className="filter__label">Select a metric</p>
        )}
        <Select
          optionData={metrics}
          disabled={disabled}
          onChange={handleMetricChange}
        />
      </div>
      <div className="filter">
        {!disabled && (
          <p className="filter__label">Select max results to display</p>
        )}
        <Select
          optionData={maxResults}
          disabled={disabled}
          onChange={handleMaxResults}
        />
      </div>
    </div>
  );
};

export default Filters;