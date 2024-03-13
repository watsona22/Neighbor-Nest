import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Car from "../assets/car.jpg";
import "../styles/shopByCategory.css";
import { ShopByItem } from "./ShopByItem";
import { GET_CATEGORIES } from "../utils/queries";
import { useQuery } from "@apollo/client";

import carImage from '../assets/car.jpg'
import clothingImage from '../assets/clothing.jpg'
import sportsImage from '../assets/sports.jpg'
import electronicsImage from '../assets/electronics.webp'
import industryImage from '../assets/industry.avif'
import jewelryImage from '../assets/jewelry.jpg'
import artImage from '../assets/art.jpg'
import homeImage from '../assets/home.jpg'
import dogImage from '../assets/dog.jpg'
import otherImage from '../assets/other.jpeg'

const imageObj = [
  { name: 'carImage', url: carImage },
  { name: 'clothingImage', url: clothingImage },
  { name: 'sportsImage', url: sportsImage },
  { name: 'electronicsImage', url: electronicsImage },
  { name: 'industryImage', url: industryImage },
  { name: 'jewelryImage', url: jewelryImage },
  { name: 'artImage', url: artImage },
  { name: 'homeImage', url: homeImage },
  { name: 'dogImage', url: dogImage },
  { name: 'otherImage', url: otherImage },
];


function ShopByCategory() {
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; 
  let index = 0;
  

  return (
    <div className="shop-by-cat-container">
      {data.categories.map((categoryItem, index) => {
        return (
          <div key={index}>
            <Link to={categoryItem.link}>
              <h4>{categoryItem.name}</h4>
              <img src={imageObj[index].url} alt="Image" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ShopByCategory;
