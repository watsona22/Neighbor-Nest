import { useContext, useState } from "react";
import { Context } from "../App";
import { Link } from "react-router-dom";
import { GET_ITEM } from "../utils/queries";
import { useQuery } from "@apollo/client";

export const ShopByItem = () => {
const { loading, error, data } = useQuery(GET_ITEM);
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>; 

  return (
    <div>
        {data.map((item) => {
            return (
                <div>
                    <p name={name} price={price} description={description}></p>
                </div>
            )
        })}
    </div>
  )
}

