import { useState, useContext } from "react";
import '../styles/header.css'
import { GET_CATEGORIES } from "../utils/queries";
import { useQuery } from "@apollo/client";



function DropDownCategories() {
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; 
  let index = 0;
  

  return (
    <div className="dropdown-menu">
      <ul>
        {data.categories.map((categoryItem, index) => {
          return <li key={index}>{<a href={categoryItem.link}>{categoryItem.name}</a>}</li>
        })}
      </ul>
    </div>
  )
}


export default DropDownCategories;