import { useContext, useState } from "react";
import { Context } from "../App";
import { Link } from "react-router-dom";

export const ShopByItem = () => {
  const items = [
    {id: 1, title: 'Item1', description: 'First item for sale'},
    {id: 2, title: 'Item2', description: 'Second item for sale'},
    {id: 3, title: 'Item3', description: 'Third item for sale'},
    {id: 4, title: 'Item4', description: 'Fourth item for sale'},
    {id: 5, title: 'Item5', description: 'Fifth item for sale'},
    {id: 6, title: 'Item6', description: 'Sixth item for sale'},
    {id: 7, title: 'Item7', description: 'Seventh item for sale'},
    {id: 8, title: 'Item8', description: 'Eigth item for sale'},
    {id: 9, title: 'Item9', description: 'Ninth item for sale'},
    {id: 10, title: 'Item10', description: 'Tenth item for sale'},
]

  return (
    <div>
        {items.map((Item, index) => {
            return (
                <div>
                    <Link to={Item.link}>
                        <h4>{Item}</h4>
                        <img src={Item.image} alt="Items for sale" />
                    </Link>
                </div>
            )
        })}
    </div>
  )
}

