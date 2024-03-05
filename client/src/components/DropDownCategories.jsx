import { useState, useContext } from "react";
import '../styles/header.css'
import { Context } from "../App";



function DropDownCategories() {
  
  const categories = useContext(Context);
  

  return (
    <div className="dropdown-menu">
      <ul>
        {categories.map((categoryItem, index) => {
          return <li key={index}>{<a href={categoryItem.link}>{categoryItem.category}</a>}</li>
        })}
      </ul>
    </div>
  )
}


export default DropDownCategories;