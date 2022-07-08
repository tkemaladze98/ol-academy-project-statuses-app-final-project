import { Link } from "react-router-dom";
import "../../styles/navBar.scss";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav className="navbar-menu">
        <Link className="nav-page" to="/">
          Home
        </Link>
        <Link className="nav-page" to="/TableList">
          Table-List
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
