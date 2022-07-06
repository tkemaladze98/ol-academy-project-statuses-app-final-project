import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to="CreateNewTable" >
        <button>Create Table</button>
      </Link>
    </div>
  );
};

export default HomePage;
