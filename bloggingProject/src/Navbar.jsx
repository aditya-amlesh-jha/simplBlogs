import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from './context/authContext';



const Navbar = () => {

    const {state,logout} = useContext(AuthContext);
    const {isLogged} = state;

    const handleLogout = (e)=>{
        e.preventDefault();
        logout();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg py-3">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold text-white" to="/">simplBlogs</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul className="navbar-nav ms-auto">
                            {
                                !isLogged && 
                                <li className="nav-item">
                                    <Link className='nav-link text-white' to="/login">Login</Link>
                                </li>
                            }
                            {
                                !isLogged &&
                                <li className="nav-item">
                                    <Link className='nav-link text-white' to="/signup">Register</Link>
                                </li>
                            }
                            {
                                isLogged &&
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle text-white" to="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Account
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                        <li><Link className="dropdown-item" to="/blogs">Your blogs</Link></li>
                                        <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                                        <li><button onClick={(event)=>{handleLogout(event)}} className="dropdown-item">Logout</button></li>
                                    </ul>
                                </li>
                            }
                            {
                                isLogged &&
                                <li className="nav-item">
                                    <Link className='nav-link text-white' to="/add-blog">Add Blog</Link>
                                </li>
                            }
                            
                            
                        </ul>
                    </div>
                    
                </div>
            </nav>
            <hr className="m-0 text-dark" />
        </>
    );
}

export default Navbar;