type Props = {
    onGo: () => void;
};

const Actions = ({onGo: handleGo}: Props) => {
    return (
        <div>
            <h1>Geonames API</h1>
            <button onClick={() => handleGo()}>Fetch countries !</button>
        </div>
    )
};

export default Actions;