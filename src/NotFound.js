import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>The page does not exist</h2>
            <Link to="/">Go to Homepage</Link>
        </div>
     );
}
 
export default NotFound;