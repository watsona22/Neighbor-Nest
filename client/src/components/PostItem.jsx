import { useState } from "react";
import "../styles/postItem.css";
import { GET_CATEGORIES } from "../utils/queries";
import { ADD_ITEM } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

function PostItem() {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function handleCategoryState(event) {
    setCategory(event.target.value);
  }

  function handlePriceChange(event) {
    const value = event.target.value.replace(/\D/g, "");
    setPrice(value);
  }

  const [addItemMutation, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(ADD_ITEM)
  
  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const name = formData.get('item');
    const description = formData.get('description')
    const price2 = parseFloat(price);
    const categoryName= formData.get('category')

    addItemMutation({
      variables: {
        name: name,
        description: description,
        price: price2,
        category: categoryName,
      }
    })

    e.target.reset();
    setPrice("");
    window.location.reload();
  }

  

  return (
    <div className="post-item-container">
      <form action="" className="post-item-form" onSubmit={handleFormSubmit}>
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
          {data.categories.map((categoryItem, index) => {
            return (
              <div className="radio-category">
                <input
                  type="radio"
                  name="category"
                  id={categoryItem.name}
                  value={categoryItem.name}
                  onChange={handleCategoryState}
                />
                <label htmlFor={categoryItem.name}>{categoryItem.name}</label>
              </div>
            );
          })}
        </label>
        <button type="submit">Post Item</button>
      </form>
    </div>
  );
}

export default PostItem;
