import React from "react";
import {Link} from "react-router-dom";
import "../../styles/homePage.scss"

const HomePage = () => {
  return (
    <div className="home-page">
      <Link className="create-table-link" to="CreateNewTable" >
        <button>Create Table</button>
      </Link>
    </div>
  );
};

export default HomePage;
