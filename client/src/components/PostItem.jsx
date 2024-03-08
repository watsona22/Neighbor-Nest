import { useState } from "react";

function PostItem() {
  return (
    <div>
      <form action="">
        <label htmlFor="item">
          Product
          <input type="text" name="item" id="item" />
        </label>
        <label htmlFor="price">
          Price
          <input type="number" name="price" id="price" />
        </label>
      </form>
    </div>
  )

}

export default PostItem;