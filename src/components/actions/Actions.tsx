import "./Actions.scss";

type Props = {
  onGo: () => void;
  isCountriesLoading: boolean;
};

const Actions = ({ onGo: handleGo, isCountriesLoading }: Props) => {
  return (
    <div className="actions">
      <h1 className="actions__title">Geonames API</h1>
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
