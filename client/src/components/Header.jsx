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
        <h3>Login</h3>
        <h3>Sign-Up</h3>
      </div>

      
    </div>
  );
}

export default Header;
