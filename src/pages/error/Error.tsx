import { Link } from "react-router-dom";
import "./Error.scss";

const Error = () => {
    return (
        <div className="error">
            <h2>Oops !</h2>
            <p>Seems that you are not on looking for something on earth right now...</p>
            <p>We don't have anything about space and aliens... but you can always go back and try again !</p>
            <Link to="/">Home</Link>
        </div>
    )
};

export default Error;