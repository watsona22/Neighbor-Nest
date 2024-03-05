import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import CategoryDropDown from "./CategoryDropDown";

function Header() {
  const [search, setSearch] = useState("");

  return (
    <div className="header-container">
      

      <Link to="/">
        <h1>NeighborNest</h1>
      </Link>

      <div className="search-container">
        <CategoryDropDown />
        <p>Categories</p>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
        />
      </div>
      <div className="login-container">
        <Link to="login">
          <h3>Login</h3>
        </Link>
        <Link to="/sign-up">
          <h3>Sign-Up</h3>
        </Link>
      </div>

      
    </div>
  );
}

export default Header;
