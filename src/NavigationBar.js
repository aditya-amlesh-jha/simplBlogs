// import { Link } from "react-router-dom";

// // Link is used instead of anchor tag to hand over control
// // to react router instead of server

// const Navbar = () => {
//     return (
// <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//   <Link className="navbar-brand ms-3" to="/">
//     SimplBlogs
//   </Link>
//   <button
//     className="navbar-toggler"
//     type="button"
//     data-toggle="collapse"
//     data-target="#navbarNavDropdown"
//     aria-controls="navbarNavDropdown"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNavDropdown">
//     <ul className="navbar-nav ml-auto">
//       <li className="nav-item active">
//         <Link className="nav-link" to="/">
//           Home
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link" to="/create">
//           Create
//         </Link>
//       </li>
//     </ul>
//   </div>
// </nav>
//     );
// }

// export default Navbar;


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>SimplBlogs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/create">Create</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;