import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../App";
import Car from "../assets/car.jpg";
import "../styles/shopByCategory.css";
import { ShopByItem } from "./ShopByItem";
import { GET_CATEGORIES } from "../utils/queries";
import { useQuery } from "@apollo/client";

function ShopByCategory() {
const items  = useContext(Context)
const [loading, error, data ] = useQuery(GET_CATEGORIES)
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>; 

  return (
    <div className="shop-by-cat-container">
      {/* <ShopByItem /> */}
      {data.items.map((categoryItem, index) => {
        return (
          <div key={index}>
            <Link to={categoryItem.link}>
              <h4>{categoryItem.category}</h4>
              <img src={categoryItem.image} alt="" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ShopByCategory;
