import "./Actions.css";

type Props = {
    onGo: () => void
};

const Actions = ({onGo: handleGo}: Props) => {
    return (
        <div className="actions">
            <h1 className="actions__title">Geonames API</h1>
            <button onClick={() => handleGo()} className="actions__button">GO</button>
        </div>
    )
};

export default Actions;