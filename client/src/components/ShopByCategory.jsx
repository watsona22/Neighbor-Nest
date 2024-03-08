import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../App";
import Car from "../assets/car.jpg";
import "../styles/shopByCategory.css";
import { ShopByItem } from "./ShopByItem";

function ShopByCategory() {
  const categories = useContext(Context);

  return (
    <div className="shop-by-cat-container">
      {categories.map((categoryItem, index) => {
        return (
          <div>
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
