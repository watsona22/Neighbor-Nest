import { useState } from "react";
import ProductBar from "./ProductBar";
import '../styles/homepage.css'
import ShopByCategory from "./ShopByCategory";
import AuthService from "../utils/auth.js";
import { GET_USER } from "../utils/queries.js";
import { useQuery } from "@apollo/client";

function HomepageBody() {
  const { loading, data } = useQuery(GET_USER);
  // if statement belows allows page to render even when loading
  if (loading) {
    return (<p>...</p>);
  }
  console.log(data);
  return (
    <div className="homepage-body-container">
      <h2>Shop By Category</h2>
      <ShopByCategory />
      <ProductBar />
      <ProductBar />
      <ProductBar />
    </div>
  )
}

export default HomepageBody;