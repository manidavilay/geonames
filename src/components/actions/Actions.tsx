import "./Actions.scss";

type Props = {
  onGo: () => void;
  isCountriesLoading: boolean;
};

const Actions = ({ onGo: handleGo, isCountriesLoading }: Props) => {
  return (
    <div className="actions">
      <h1 className="actions__title">Geonames API</h1>
      <p className="actions__text">
        The GeoNames geographical database covers all countries and contains over eleven million placenames that are available for download free of charge.
      </p>
      <p className="actions__text">
        Here you can fetch all countries informations such as their capital, population or area in km², displayed in pie charts and table, try it !
      </p>
      {isCountriesLoading ? (
        <button onClick={() => handleGo()} className="actions__button">
          Fetch countries !
        </button>
      ) : (
        <p className="actions__button--fetched">
          Countries Fetched !
        </p>
      )}
    </div>
  );
};

export default Actions;
