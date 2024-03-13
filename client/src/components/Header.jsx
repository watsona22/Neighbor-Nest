import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import CategoryDropDown from "./CategoryDropDown";
import AuthService from "../utils/auth.js";
import { GET_USER } from "../utils/queries.js";
import { useQuery } from "@apollo/client";

function Header() {
  const [search, setSearch] = useState("");
  const { loading, data } = useQuery(GET_USER);
  // if statement below allows page to render even when loading
  if (loading) {
    return (<p>...</p>);
  }
  
  
  return (
    <div className="header-container">
      <div className="left-div">
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
      </div>
      <div className="login-container">
        {!AuthService.loggedIn() ? (
          <>
            <Link to="login">
              <h3>Login</h3>
            </Link>
            <Link to="/sign-up">
              <h3>Sign-Up</h3>
            </Link>
          </>
        ) : (
          <>
            {" "}
            <h3>Welcome, {data.user.firstName}</h3>
            <Link to="/post-item">
              <h3>Sell Something</h3>
            </Link>
            <h3 onClick={AuthService.logout}>Logout</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
