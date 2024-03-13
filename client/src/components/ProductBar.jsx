import Slider from "react-slick";
import placeholderImage from "../assets/placeholderImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../utils/queries";
import { useState, useEffect } from "react";

function ProductBar() {
  const { loading: itemsLoading, data: itemsData } = useQuery(GET_ITEMS);
  const [randomItem, setRandomItems] = useState([]);

  useEffect(() => {
    if (!itemsLoading && itemsData) {
      const shuffledItems = shuffleArray(itemsData.items);
      const randomSubset = shuffledItems.slice(0, 5);
      setRandomItems(randomSubset);
    }
  }, [itemsLoading, itemsData]);

  function shuffleArray(array) {
    const newArray = [...array];
    let currentIndex = newArray.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[currentIndex],
      ];
    }

    return newArray;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const anchorStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  const innerDivStyle = {
    width: 150,
    marginTop: 3,
  };

  const priceStyle = {
    fontSize: 14,
  };

  return (
    <div className="product-bar-container">
      {randomItem.length > 0 ? (
        <Slider {...settings}>
          {randomItem.map((item, index) => (
            <div key={index}>
              <a href="#!" style={anchorStyle}>
                <img src={placeholderImage} alt={`Placeholder ${index}`} />
                <div style={innerDivStyle} className="inner-div">
                  <p>{item.name}</p>
                  <p style={priceStyle}>${item.price}</p>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductBar;
