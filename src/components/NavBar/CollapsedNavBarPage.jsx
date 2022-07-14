import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import "./colapsedNavBar.scss";

const CollapsedNavBarPage = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const showMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };
  return (
    <div className="collapsed-navbar">
      <AiOutlineMenu className="menu-icon" onClick={() => showMenu()} />
      {isMenuClicked && (
        <nav className="collapsed-navbar-menu">
          <Link className="nav-page" to="/">
            Home
          </Link>
          <Link className="nav-page" to="/TableList">
            Table-List
          </Link>
        </nav>
      )}
    </div>
  );
};

export default CollapsedNavBarPage;
