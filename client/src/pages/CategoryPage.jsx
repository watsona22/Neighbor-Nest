import { useState, useContext } from "react";
import { Context } from "../App";
import placeholderImage from "../assets/placeholderImage.jpg";
import "../styles/categoryPage.css";
import art from "../assets/art.jpg";
import car from "../assets/car.jpg";
import clothing from "../assets/clothing.jpg";
import dog from "../assets/dog.jpg";
import electronics from "../assets/electronics.webp";
import home from "../assets/home.jpg";
import industry from "../assets/industry.avif";
import jewelry from "../assets/jewelry.jpg";
import other from "../assets/other.jpeg";
import sports from "../assets/sports.jpg";



function CategoryPage(props) {
  const images = [
    art,
    car,
    clothing,
    dog,
    electronics,
    home,
    industry,
    jewelry,
    other,
    sports,
  ];

  const categories = useContext(Context);

  return (
    
    <div className="category-page-container">
      <h2>{categories[props.index].category}</h2>
      <div className="products-container">
        {images.map((image) => {
          return (
            <div>
              <Link to="categoriesForSale.link">
                <a href="">
                  <img src={image} alt="" />
                </a>
                <p>Placeholder Name</p>
                <h5>$100.92</h5>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryPage;
