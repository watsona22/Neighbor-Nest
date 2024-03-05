import { useState, useContext } from "react";
import { Context } from "../App";
import placeholderImage from "../assets/placeholderImage.jpg";
import "../styles/categoryPage.css";

function CategoryPage(props) {
  const images = [
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
  ];

  const categories = useContext(Context);

  return (
    <div className="category-page-container">
      <h2>{categories[props.index].category}</h2>
      <div className="products-container">
        {images.map((image) => {
          return (
            <div>
              <a href="">
                <img src={image} alt="" />
              </a>
              <p>Placeholder Name</p>
              <h5>$100.92</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryPage;
