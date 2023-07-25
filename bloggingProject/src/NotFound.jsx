import { Link } from "react-router-dom";
import './css/NotFound.css'

const NotFound = () => {
  return (
    <>
        <div className="d-flex align-items-center justify-content-center error-page">
          <div className="text-center">
            <h1 className="display-1 fw-bold text-light">404</h1>
            <p className="fs-3 text-light">
              <span className="text-danger">Oops!</span> Page not found.
            </p>
            <p className="lead text-light">The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
    </>
  );
};

export default NotFound;
