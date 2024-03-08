import { useState } from "react";
import "../styles/postItem.css";
import { useContext } from "react";
import { Context } from "../App";
import svg from '../assets/svg.svg'

function PostItem() {
  const categories = useContext(Context);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  function handleCategoryState(event) {
    setCategory(event.target.value);

    console.log(event.target.value);
  }

  function handlePriceChange(event) {
    const value = event.target.value.replace(/\D/g, "");
    setPrice(value);
  }

  return (
    <div className="post-item-container">
      <form action="" className="post-item-form">
        <label htmlFor="item">
          Product
          <input type="text" name="item" id="item" required />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
        </label>
        <label htmlFor="price">
          Price
          <input
            type="text"
            name="price"
            id="price"
            value={"$" + price} // Display the price with "$" symbol
            onChange={handlePriceChange}
            required
          />
        </label>
        <label htmlFor="category" className="radio-label">
          Category
          {categories.map((categoryItem, index) => {
            return (
              <div className="radio-category">
                <input
                  type="radio"
                  name="category"
                  id={categoryItem.category}
                  value={categoryItem.category}
                  onChange={handleCategoryState}
                />
                <label htmlFor={categoryItem.category}>
                  {categoryItem.category}
                </label>
              </div>
            );
          })}
        </label>
        <button type="submit">Post Item</button>
      </form>

     
      <img src={svg} alt="SVG Image" />
      
    </div>
  );
}

export default PostItem;
