import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useQuery } from "@apollo/client"
import { Context } from "../App";
import Car from "../assets/car.jpg";
import "../styles/shopByCategory.css";
import { ShopByItem } from "./ShopByItem";
import { GET_CATEGORIES } from "../utils/queries";  

function ShopByCategory() {
  const { loading, error, data } = useQuery(GET_CATEGORIES)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching categories...</p>

  return (
    <div className="shop-by-cat-container">
    {data.categories.map((categoryItem, index) => (
      <div key={index}>
        <Link to={categoryItem.link}>
          <img src={categoryItem.image || Car} alt={categoryItem.name} />
          <h4>{categoryItem.name}</h4>
        </Link>
      </div>
    ))}
  </div>
);
}

export default ShopByCategory;
